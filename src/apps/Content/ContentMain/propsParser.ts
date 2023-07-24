import { BasedClient } from '@based/client'
import { View } from '../types'

export type ParseCtx = {
  data: any
  state: any
  args: any[]
  target: { [key: string]: any }
  client: BasedClient
  setTarget: (newTarget: { [key: string]: any }, isOverlay?: boolean) => void
  setState: (newState: { [key: string]: any }) => void
  setView: (view: View) => void
  setOverlay: (view: View) => void
}

const parse$Files = async (
  s: any,
  files: (f: any, prev?: any, k?: string) => Promise<any>,
  prev?: any,
  k?: string
): Promise<any> => {
  if (typeof s === 'object' && s) {
    if (s.$files && s.$type && s.$key) {
      return await files(s, prev, k)
    } else {
      const x: any = {}
      for (const key in s) {
        const y = await parse$Files(s[key], files, x, key)
        if (y !== undefined && y !== null) {
          x[key] = y
        }
      }
      return x
    }
  }
  return s
}

export const parseFunction = (
  config: any,
  ctx: ParseCtx
): (() => Promise<any>) => {
  // add a combitnation of things

  if (config.function) {
    // TODO: also support .publish, query.get and some others! stream?
    return async (...args) => {
      let { name, payload } = parseProps(config.function, {
        ...ctx,
        args,
      })

      payload = await parse$Files(payload, async (files, k, prev) => {
        if (name === 'db:set') {
          // TODO: get rid of url
          if (files.$type === 'string' || files.$type === 'url') {
            if (files.$data.type === 'file' && files.$key === 'src') {
              await ctx.client.stream(
                'db:file-upload',
                {
                  payload: {
                    id: files.$data.id,
                  },
                  contents: files.$files[0],
                },
                (p) => {
                  console.info('progress...', p)
                }
              )
            } else {
              const { src } = await ctx.client.stream(
                'file:upload',
                {
                  contents: files.$files[0],
                },
                (p) => {
                  console.info('progress...', p)
                }
              )
              return src
            }
          } else {
            const { id } = await ctx.client.stream(
              'db:file-upload',
              {
                contents: files.$files[0],
              },
              (p) => {
                console.info('progress...', p)
              }
            )
            return id

            // TODO: todo little ref boy
          }
        }
      })

      return ctx.client.call(name, payload)
    }
  }

  if (config.state) {
    return async (...args) => {
      ctx.setState(
        parseProps(config.state, {
          ...ctx,
          args,
        })
      )
    }
  }

  if (config.view) {
    return async (...args) => {
      ctx.setView(config.view)
      if (config.target) {
        ctx.setTarget(
          parseProps(config.target, {
            ...ctx,
            args,
          })
        )
      }
    }
  }

  if (config.overlay) {
    return async (...args) => {
      ctx.setOverlay(config.overlay)
      if (config.target) {
        ctx.setTarget(
          parseProps(config.target, {
            ...ctx,
            args,
          }),
          true
        )
      }
    }
  }

  if (config.target) {
    return async (...args) => {
      ctx.setTarget(
        parseProps(config.target, {
          ...ctx,
          args,
        })
      )
    }
  }
}

const pathReader = (a: any, path: string[]): any => {
  let d = a
  for (let i = 1; i < path.length; i++) {
    const seg = path[i]
    if (d?.[seg] !== undefined) {
      d = d[seg]
    } else {
      d = undefined
      break
    }
  }
  return d
}

const parseString = (field: string, ctx: ParseCtx): any => {
  if (field[0] === '$') {
    const path = field.split('.')
    const type = path[0]
    if (type === '$data') {
      return pathReader(ctx.data, path)
    }
    if (type === '$args') {
      return pathReader(ctx.args, path)
    }
    if (type === '$state') {
      return pathReader(ctx.state, path)
    }
    if (type === '$target') {
      return pathReader(ctx.target, path)
    }
  }
  return field
}

export const parseProps = (
  obj: any,
  ctx: ParseCtx,
  excludeFields?: string[]
): any => {
  if (typeof obj !== 'object') {
    return {}
  }
  const newObj: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (excludeFields && excludeFields.includes(key)) {
      newObj[key] = obj[key]
      continue
    }
    const field = obj[key]
    if (/^on[A-Z]([a-z])+/.test(key)) {
      if (typeof field === 'object') {
        newObj[key] = parseFunction(field, ctx)
      } else {
        newObj[key] = () => console.error('Needs to be an object def', field)
      }
    } else if (typeof field === 'object') {
      newObj[key] = parseProps(field, ctx, excludeFields)

      if (key === '$filter') {
        if (Array.isArray(newObj[key])) {
          for (let i = 0; i < newObj[key].length; i++) {
            if (
              newObj[key][i].$operator === 'includes' &&
              !newObj[key][i].$value
            ) {
              newObj[key].splice(i, 1)
              break
            }
          }
        }
      }
    } else if (typeof field === 'string') {
      newObj[key] = parseString(field, ctx)
    } else {
      newObj[key] = field
    }
    if (key === '...') {
      const rest = newObj[key]
      delete newObj[key]
      Object.assign(newObj, rest)
    }
  }

  return newObj
}

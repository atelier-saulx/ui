import { Table } from '~/components/Table'
import { Text } from '~/components/Text'
import React, { useState, useEffect } from 'react'
import { alwaysIgnore } from '~/components/Schema/templates'
import { Query } from './Query'
import { useQuery as useQueryStuff } from './useQuery'
import { useContextMenu, useSchemaTypes } from '~/hooks'
import { AddIcon, MoreIcon, WarningIcon } from '~/icons'
import { Button } from '~/components/Button'
import { ContextItem } from '~/components/ContextMenu'
import { useDialog } from '~/components/Dialog'
import { useClient, useQuery } from '@based/react'
import { Callout } from '~/components/Callout'
import { useRoute } from 'kabouter'

const Menu = ({ views, currentView, deletable }) => {
  const client = useClient()
  const { prompt, confirm } = useDialog()
  return (
    <>
      <ContextItem
        onClick={async () => {
          const name = await prompt(`Enter a new name for this view`)
          if (name) {
            currentView.label = name
            await client.call('basedSetViews', views)
          }
        }}
      >
        Rename view
      </ContextItem>
      {deletable ? (
        <ContextItem
          onClick={async () => {
            const ok = await confirm(
              `Are you sure you want to delete '${currentView.label}?`
            )
            if (ok) {
              for (const i in views) {
                views[i] = views[i].filter((view) => view !== currentView)
              }
              await client.call('basedSetViews', views)
            }
          }}
        >
          Delete view
        </ContextItem>
      ) : null}
    </>
  )
}

// const CreateMenu = ({ prefix, types }) => {
//   const [, setLocation] = useLocation()
//   return (
//     <>
//       {Object.keys(types)
//         .sort()
//         .map((type) => {
//           return type === 'root' ? null : (
//             <ContextItem
//               key={type}
//               onClick={() => {
//                 setLocation(`${prefix}/create/${type}`)
//               }}
//             >
//               {type}
//             </ContextItem>
//           )
//         })}
//     </>
//   )
// }

const Header = ({ label, view, prefix }) => {
  const { setLocation } = useRoute()
  // const { types } = useSchemaTypes()
  const createBtn = (
    <Button
      large
      icon={AddIcon}
      onClick={() => {
        // console.log('lable', label, 'view', view, 'prefix', prefix)
        setLocation(`${prefix}/create/${view}`)
      }}
      //  onClick={useContextMenu(CreateMenu, { prefix, types })}
    >
      Create Item
    </Button>
  )
  if (label) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text weight={600}>{label}</Text>
        <div style={{ flexGrow: 1 }} />
        {createBtn}
      </div>
    )
  }

  // const { confirm, prompt } = useDialog()
  // const client = useClient()
  const { data: views } = useQuery('based:observe-views')
  let currentView, deletable

  const parse = () => {
    // TODO FIX the redirect!!
    for (const viewKey in views) {
      for (const v of views[viewKey]) {
        if (String(v.id) === view) {
          currentView = v
          deletable = viewKey !== 'default'
          return
        }
      }
    }
  }

  parse()

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text weight={700} size="22px" style={{ lineHeight: '32px' }}>
          {currentView?.label}
        </Text>
        <Button
          color="text"
          ghost
          icon={
            <MoreIcon
              onClick={useContextMenu(Menu, { views, currentView, deletable })}
              style={{
                cursor: 'pointer',
              }}
            />
          }
        />
      </div>

      {/* old buttons place */}

      <div style={{ flexGrow: 1 }} />
      {createBtn}
    </div>
  )
}

export const ContentMain = ({
  prefix = '',
  view = null,
  style = null,
  query: queryOverwrite = undefined,
  label = null,
}) => {
  const { loading, types } = useSchemaTypes()
  const route = useRoute()
  const query = useQueryStuff(queryOverwrite)

  const { confirm, prompt } = useDialog()
  const client = useClient()

  const [isMultiref, setIsMultiref] = useState(false)

  const { data: views } = useQuery('based:observe-views')
  let currentView

  const parse = () => {
    // TODO FIX the redirect!!
    for (const viewKey in views) {
      for (const v of views[viewKey]) {
        if (String(v.id) === view) {
          currentView = v
          //  deletable = viewKey !== 'default'
          return
        }
      }
    }
  }

  parse()

  /// THIS CHECKS IF THE FIELD IS A REFERENCE
  useEffect(() => {
    if (
      // console.log('currentView changed', currentView)
      types[currentView?.id]?.fields[query.field].type === 'references' &&
      query.field !== 'descendants'
    ) {
      setIsMultiref(true)
    } else {
      setIsMultiref(false)
    }
  }, [query.field])

  if (loading) return null

  const set = new Set()
  const indexed = []
  const other = new Set()
  const typeFilter = query?.filters?.find(
    ({ $field, $operator }) => $field === 'type' && $operator === '='
  )
  let includedTypes
  if (typeFilter?.$value) {
    if (typeFilter.$value in types) {
      includedTypes = [typeFilter.$value]
    } else {
      return null
    }
  }

  if (!includedTypes) {
    includedTypes = Object.keys(types)
  }

  const fieldTypes = {}

  includedTypes.forEach((type) => {
    const { fields = {} } = types[type] || {}

    for (const field in fields) {
      if (!alwaysIgnore.has(field)) {
        const index = fields[field].meta?.index
        fieldTypes[field] = fields[field]?.type
        if (index === undefined) {
          other.add(field)
        } else if (!(index in indexed)) {
          indexed[index] = new Set([field])
        } else {
          indexed[index].add(field)
        }
      }
    }
  })

  const addField = (field) => set.add(field)
  indexed.forEach((fields) => fields.forEach(addField))
  other.forEach(addField)

  const fields = Array.from(set) as string[]

  // onAction for table selected items ... more actions will follow
  const onAction = (items, string) => {
    if (string === 'delete') {
      // @ts-ignore
      Promise.all(items.map((v) => client.delete({ $id: v.id }))).then(() => {
        console.info('DELETE TIMES 🥨')
      })
    }
  }

  /*
  $filter: {
    $field: 'bla'
    $operator: '=',
    $value: 'blub',
    $or: {
      $field: 'bla',
      $operator: '=',
      $value: 'blub',
    }
  }
  // 1
  const a = b && c || d
  $filter: {
    $field: 'type',
    $operator: '=',
    $value: 'yvestype',
    $and: {
      $field: 'name',
      $operator: '=',
      $value: 'yves',  
    },
    $or: {
      $field: 'name',
      $operator: '=',
      $value: 'youri',
    }
  }

  // 2
  const a = b || c && d
    $filter: {
    $field: 'type',
    $operator: '=',
    $value: 'yvestype',
    $or: {
      $field: 'name',
      $operator: '=',
      $value: 'yves',
      $and: {
        $field: 'name',
        $operator: '=',
        $value: 'youri',
      }
    }
  }

  $filter: [{
    $field: 'type',
    $operator: '=',
    $value: 'yves',
    $and: {
      $field: 'name',

    }
  }, {
    $field: 'name',
    $operator: '=',
    $value: 'yves',
    $or: {
      $field: 'name',
      $operator: '=',
      $value: 'youri',
    }
  }]

  this AND (taht OR smurf)
  (this AND taht) OR smurf


  */
  // console.log('query', query, fields, types, fieldTypes, currentView)

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: '24px 32px 16px',
        }}
      >
        <Header label={label} view={view} prefix={prefix} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 1 }}>
            {queryOverwrite ? null : (
              <Query
                types={types}
                fields={fields}
                fieldTypes={fieldTypes}
                query={query}
              />
            )}
          </div>

          {/*  only display if either the query changes or the selected boxes 
             so if something in the url changes i guess  */}

          <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
            <Button
              style={{ maxHeight: 32, marginTop: 4 }}
              ghost
              onClick={async () => {
                //   const ok = await confirm(`Update '${currentView.label}'`)
                const ok = await confirm(
                  `Update '${currentView.label}'`,
                  <Callout
                    icon={<WarningIcon />}
                    color="red"
                    label=" You are about to update the default view for all users."
                    labelColor="text"
                  />
                )
                if (ok) {
                  // @ts-ignore TODO: will be replaced later with useRoute
                  currentView.query = location.search.substring(1)
                  await client.call('basedSetViews', views)
                }
              }}
            >
              Update view
            </Button>
            <Button
              style={{ maxHeight: 32, marginTop: 4 }}
              ghost
              onClick={async () => {
                console.log('location', location.search)

                const label = (await prompt(
                  'What would you like to call this view?'
                )) as string
                if (label) {
                  if (!views.custom) {
                    views.custom = []
                  }
                  const ids = new Set()
                  views.custom.forEach(({ id }) => ids.add(id))
                  views.default.forEach(({ id }) => ids.add(id))
                  let id = 0
                  while (ids.has(id)) {
                    id++
                  }
                  views.custom.push({
                    id,
                    // @ts-ignore TODO: will be replaced later with useRoute
                    query: location.substring(1),
                    label,
                  })
                  await client.call('basedSetViews', views)
                }
              }}
            >
              Create new view
            </Button>
          </div>
        </div>
      </div>

      <Table
        key={fields.length}
        fields={fields}
        target={query.target}
        onAction={(items) => onAction(items, 'delete')}
        language="en"
        isMultiref={isMultiref}
        prefix={prefix}
        view={view}
        onClick={(item, field, fieldType) => {
          if (fieldType === 'references') {
            route.setLocation(`?target=${item.id}&field=${field}&filter=%5B%5D`)
            setIsMultiref(true)
          } else {
            route.setLocation(`${prefix}/${item.id}/${field}`)
            setIsMultiref(false)
          }
        }}
        query={($offset, $limit, $field, $order) => {
          const q = {
            $list: {
              $offset,
              $limit,
              $sort: {
                $field,
                $order,
              },
              $find: {
                $traverse: query.field,
                $filter: query.filters.filter(
                  ({ $field, $operator, $value }) => {
                    if (!$field || !$operator) {
                      return false
                    }
                    if (!$value) {
                      if ($operator !== 'exists' && $operator !== 'notExists') {
                        return false
                      }
                    }

                    return true
                  }
                ),
              },
            },
          }

          fields.forEach((field: string) => {
            q[field] = true
          })

          return q
        }}
      />
    </div>
  )
}

import { BasedFunction } from '@based/functions'
import { pascalCase } from 'pascal-case'

const createIcon: BasedFunction<
  {
    id: string
    name: string
    src: string
    svg: string
    size: 16 | 20
  },
  { name: string; path: string; component: string }
> = async (based, { name, svg, size }) => {
  let componentName = pascalCase(name.replace(/^\d{2}-/, ''))

  if (size === 16) {
    componentName = 'Small' + componentName
  }

  const component = `export const Icon${componentName}: Icon = ({ color }) => {
    const c = color === undefined || color ==='inherit' ? 'currentColor' : genColor('content', color, 'primary')
    return ${svg
      .replace(/xmlns="(.*?)"/, '')
      .replace(/fill-rule="(.*?)"/, '')
      .replace(/clip-rule="(.*?)"/, '')
      .replace(/fill=".+"/g, 'fill={c}')}
    \n}`

  return {
    path: svg.match(/d="(.*?)"/)?.[1] ?? '',
    component,
    name: componentName,
  }
}

export default createIcon

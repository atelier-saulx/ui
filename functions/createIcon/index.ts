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

  const component = `export const Icon${componentName}: typeof Icon = (props) => {
    const { color } = props
    const c = color === undefined || color ==='inherit' ? 'currentColor' : genColor('content', color, 'primary')
    return <Icon {...props}>${svg
      .replace(/xmlns="(.*?)"/, '')
      .replace(/fill-rule="(.*?)"/, 'fillRule="$1"')
      .replace(/clip-rule="(.*?)"/, 'clipRule="$1"')
      .replace(/clip-path="(.*?)"/, 'clipPath="$1"')
      .replace(/fill=".+"/g, 'fill={c}')
      .replace(/stroke=".+"/g, 'stroke={c}')}
      
      </Icon>\n}`

  return {
    path: svg.match(/d="(.*?)"/)?.[1] ?? '',
    component,
    name: componentName,
  }
}

export default createIcon

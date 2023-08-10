import { BasedFunction } from '@based/functions'
import { pascalCase } from 'pascal-case'

type Icon = {
  id: string
  name: string
  src: string
  svg: string
}

const createIcon: BasedFunction<
  {
    id: string
    name: string
    src: string
    svg: string
    size: 16 | 20
  },
  string
> = async (based, { name, svg }, ctx) => {
  const componentName = 'Icon' + pascalCase(name.replace(/^\d{2}-/, ''))
  return `export const ${componentName}: Icon = ({ color }) => {
    const c = color === undefined || color ==='inherit' ? 'currentColor' : genColor(color)
    return ${svg
      .replace(/xmlns="(.*?)"/, '')
      .replace(/fill-rule="(.*?)"/, '')
      .replace(/clip-rule="(.*?)"/, '')
      .replace(/fill=".+"/, 'fill={c}')}
`
}

export default createIcon

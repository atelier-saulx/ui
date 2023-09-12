import { Avatar } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Avatar',
  properties: props.props.AvatarProps.props,
  component: Avatar,
  description: 'Simple Avatar component',
  examples: [
    {
      props: {
        color: 'raspberry',
        children: 'sd',
        size: 'large',
        squared: true,
      },
    },
    {
      name: 'Solid Color Avatar',
      description: 'Rock solid',
      props: {
        color: 'aquamarine',
        children: 'F1',
        size: 'large',
        light: true,
        imgsrc: 'https://robohash.org/G2J.png?set=set1',
      },
    },
  ],
}

export default example

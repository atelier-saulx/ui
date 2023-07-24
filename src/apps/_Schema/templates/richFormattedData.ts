import { Field } from '../types'
import { EmailIconFilled, UrlIcon, GeoMarkerIcon, FileIcon } from '~/icons'

export const richFormattedData: { [key: string]: Field } = {
  email: {
    label: 'Email',
    color: 'lightbabyblue',
    description: 'An email address',
    icon: EmailIconFilled,
    schema: {
      type: 'string',
      meta: {
        format: 'email',
      },
    },
  },
  url: {
    label: 'URL',
    color: 'lightbabyblue',
    description: 'A web address',
    icon: UrlIcon,
    schema: {
      type: 'string',
      meta: {
        format: 'url',
      },
    },
  },
  src: {
    label: 'File Source',
    color: 'lightbabyblue',
    description: 'A string value for a file',
    icon: FileIcon,
    schema: {
      type: 'string',
      meta: {
        format: 'src',
      },
    },
  },
  geo: {
    label: 'Geo',
    color: 'lightbabyblue',
    description: 'Geo coordinates',
    icon: GeoMarkerIcon,
    schema: {
      type: 'object',
      meta: {
        format: 'geo',
      },
      properties: {
        lat: { type: 'float' },
        lng: { type: 'float' },
      },
    },
  },
}

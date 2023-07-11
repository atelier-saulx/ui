import { Field } from '../types'
import { CalendarIcon, TimeIcon, UserIcon, ToggleIcon } from '~/icons'

export const plainFormattedData: { [key: string]: Field } = {
  dateTime: {
    label: 'Date-Time',
    color: 'lightteal',
    description: 'Dates and timestamp',
    icon: CalendarIcon,
    schema: { type: 'timestamp' },
  },
  timestamp: {
    label: 'Timestamp',
    color: 'lightteal',
    description: 'A digital time record',
    icon: TimeIcon,
    schema: { type: 'timestamp' },
  },
  createdBy: {
    label: 'Created by',
    color: 'lightteal',
    description: 'A record of user',
    icon: UserIcon,
    schema: { type: 'timestamp' },
  },
  boolean: {
    label: 'Boolean',
    color: 'lightteal',
    description: 'True and false',
    icon: ToggleIcon,
    schema: { type: 'boolean' },
  },
}

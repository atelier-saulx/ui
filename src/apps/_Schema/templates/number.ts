import {
  TwentyThreeIcon,
  CalculatorIcon,
  IntegerIcon,
  LoadingIcon,
} from '~/icons'
import { Field } from '../types'

export const numbers: { [key: string]: Field } = {
  number: {
    label: 'Number',
    color: 'lightsailorblue',
    description: 'Numbers you know it',
    icon: TwentyThreeIcon,
    schema: { type: 'number' },
  },
  bytes: {
    label: 'Bytes',
    color: 'lightsailorblue',
    description: 'Bytes stored as an integer',
    icon: TwentyThreeIcon,
    schema: {
      type: 'int',
      meta: {
        format: 'bytes',
      },
    },
  },
  float: {
    label: 'Float',
    color: 'lightsailorblue',
    description: 'Any number',
    icon: CalculatorIcon,
    schema: { type: 'float' },
  },
  progress: {
    label: 'Progress',
    color: 'lightsailorblue',
    description: 'Progress',
    icon: LoadingIcon,
    schema: {
      type: 'float',
      meta: {
        format: 'progress',
      },
    },
  },
  int: {
    label: 'Integer',
    color: 'lightsailorblue',
    description: 'A whole number',
    icon: IntegerIcon,
    schema: { type: 'int' },
  },
}

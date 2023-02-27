import { color } from '~'
import { styled } from 'inlines'

export const FakeCarret = styled('div', {
  width: 1,
  marginLeft: 4,
  marginRight: 4,
  marginTop: 2,
  height: 20,
  backgroundColor: color('text'),
  '@keyframes': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
  animationDuration: '1s',
  animationEffect: 'step-start',
  animationIterationCount: 'infinite',
})

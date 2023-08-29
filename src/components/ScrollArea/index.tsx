import { color, styled, Style } from '../..'

const scrollbarColor = color('border', 'default', 'strong')
const transparentAreaColor = color('background', 'default', 'surface')

type ScrollAreaProps = {
  style?: Style
}

export const scrollAreaStyle = {
  scrollbarGutter: 'stable',
  overflowY: 'overlay',
  overflowX: 'overlay',
  // minWidth: 'fit-content', // <=== this breaks it
  // firefox
  scrollbarColor: `${scrollbarColor} transparent`,
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    visibility: 'hidden',
  },
  // the rest
  '&::-webkit-scrollbar:vertical': {
    width: '8px',
  },
  '&::-webkit-scrollbar:horizontal': {
    height: '8px',
  },
  '@media (hover: hover)': {
    '&:hover': {
      // the rest
      '&::-webkit-scrollbar': {
        visibility: 'visible',
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: scrollbarColor,
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:vertical': {
        borderRight: `2px solid ${transparentAreaColor}`,
        minHeight: '32px',
      },
      '&::-webkit-scrollbar-thumb:horizontal': {
        borderBottom: `2px solid ${transparentAreaColor}`,
        minWidth: '32px',
      },
    },
  },
}

export const ScrollArea = styled('div', scrollAreaStyle)

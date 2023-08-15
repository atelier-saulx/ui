import { styled } from 'inlines'

export const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Row = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const Center = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const RowSpaced = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const RowEnd = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

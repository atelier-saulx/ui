import { useMemo } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { useIsMac } from '../../hooks/useIsMac.js'
import { Text } from '../Text/index.js'

type Char =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'

type InputKey =
  | 'Enter'
  | 'Esc'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab'
  | 'Delete'
  | Char

export type Key =
  | InputKey
  | `${ModKeys}+${InputKey}`
  | DoubleMod<'Cmd'>
  | DoubleMod<'Alt'>
  | DoubleMod<'Shift'>

type ModKeys = `Cmd` | `Alt` | `Shift`

type DoubleMod<M extends ModKeys> = `${M}+${Exclude<ModKeys, M>}+${InputKey}`

type KeyHintProps = {
  hint: Key
  color?: 'neutral' | 'inverted' | 'red' | 'white'
}

function KeyHint({ hint, color = 'neutral' }: KeyHintProps) {
  const isMac = useIsMac()

  const keys = useMemo(() => {
    return hint
      .replace('Cmd', isMac ? '⌘' : 'Ctrl')
      .replace('Shift', '⇧')
      .replace('Alt', isMac ? '⌥' : 'Alt')
      .replace('Enter', '↩')
      .replace('Delete', '⌫')
      .replace('ArrowUp', '↑')
      .replace('ArrowDown', '↓')
      .replace('ArrowLeft', '←')
      .replace('ArrowRight', '→')
      .split('+')
  }, [isMac, hint])

  return (
    <div
      style={{
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {keys.map((key) => (
        <kbd
          key={key}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: radius[4],
            height: 16,
            minWidth: 16,
            padding: '0 3px',
            ...(color === 'neutral' && {
              background: colors.neutral20Adjusted,
              color: colors.neutral100,
              boxShadow: `inset 0px -1px 0px 0px ${colors.black20}`,
            }),
            ...(color === 'inverted' && {
              background: colors.neutralInverted10,
              color: colors.neutralInverted100,
              boxShadow: `inset 0px -1px 0px 0px ${colors.neutralInverted20}`,
            }),
            ...(color === 'red' && {
              background: colors.red20,
              color: colors.red100,
              boxShadow: `inset 0px -1px 0px 0px ${colors.red60}`,
            }),
            ...(color === 'white' && {
              background: colors.white20,
              color: colors.white100,
              boxShadow: `inset 0px -1px 0px 0px ${colors.black20}`,
            }),
          }}
        >
          <Text color="inherit" variant="subtext-regular">
            {key}
          </Text>
        </kbd>
      ))}
    </div>
  )
}

export { KeyHint }
export type { KeyHintProps }

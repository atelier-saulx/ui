import { useMemo, useState } from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
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
  | '`'
  | '§'
  | ','
  | '.'
  | '/'
  | ';'
  | "'"
  | '\\'
  | '['
  | ']'
  | '-'
  | '='

type InputKey =
  | 'Enter'
  | 'Esc'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Tab'
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
  color?: 'neutral' | 'inverted' | 'red'
}

function KeyHint({ hint, color = 'neutral' }: KeyHintProps) {
  const isMac = useMemo(
    () =>
      /(macintosh|macintel|macppc|mac68k|macos)/i.test(
        window.navigator.userAgent,
      ),
    [],
  )
  const text = useMemo(() => {
    if (hint.includes('Cmd')) {
      return isMac ? hint.replace('Cmd', '⌘') : hint.replace('Cmd', 'Ctrl')
    }

    return hint
  }, [isMac, hint])

  return (
    <div
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 4px',
        height: 16,
        borderRadius: radius[4],
        ...(color === 'neutral' && {
          background: colors.neutral20,
          color: colors.neutral60,
        }),
        ...(color === 'inverted' && {
          background: colors.neutralInverted20,
          color: colors.neutral100,
        }),
        ...(color === 'red' && {
          background: colors.red10,
          color: colors.red60,
        }),
      }}
    >
      <Text color="inherit" variant="subtext-regular">
        {text}
      </Text>
    </div>
  )
}

export { KeyHint }
export type { KeyHintProps }

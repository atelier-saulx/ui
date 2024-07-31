import { useCallback, useEffect, useMemo, useRef } from 'react'
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
  onTrigger: () => void
  color?:
    | 'neutral-subtle'
    | 'neutral-fill'
    | 'inverted-subtle'
    | 'inverted-fill'
    | 'red-subtle'
    | 'red-fill'
    | 'white-subtle'
    | 'white-fill'
  type?: 'filled' | 'subtle'
}

function KeyHint({ hint, color = 'neutral-subtle', onTrigger }: KeyHintProps) {
  const triggerFnRef = useRef(onTrigger)
  const isMac = useIsMac()

  useEffect(() => {
    triggerFnRef.current = onTrigger
  })

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const eventKey = event.key.toLocaleLowerCase()
      const p = hint
        .toLocaleLowerCase()
        .split('+')
        .map((e) => (e === 'esc' ? 'escape' : e))
      const modKeys: { [key: string]: boolean } = {
        cmd: isMac ? event.metaKey : event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
      }

      if (
        (p.length === 1 && eventKey === p[0]) ||
        (p.length === 2 && modKeys[p[0]] && eventKey === p[1]) ||
        (p.length === 3 && modKeys[p[0]] && modKeys[p[1]] && eventKey === p[2])
      ) {
        event.preventDefault()
        triggerFnRef.current()
      }
    },
    [hint],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const text = useMemo(() => {
    return hint.replace('Cmd', isMac ? '⌘' : 'Ctrl')
  }, [isMac, hint])

  return (
    <div
      style={{
        flexShrink: 0,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 4px',
        height: 16,
        minWidth: 20,
        borderRadius: radius[4],
        ...(color === 'neutral-subtle' && {
          background: colors.neutral20,
          color: colors.neutral100,
        }),
        ...(color === 'inverted-subtle' && {
          background: colors.neutralInverted60,
          color: colors.neutral100,
        }),
        ...(color === 'red-subtle' && {
          background: colors.red20,
          color: colors.red100,
        }),
        ...(color === 'white-subtle' && {
          background: colors.white20,
          color: colors.white100,
        }),
        ...(color === 'neutral-fill' && {
          background: colors.neutral100,
          color: colors.neutralInverted100,
        }),
        ...(color === 'inverted-fill' && {
          background: colors.neutralInverted100,
          color: colors.neutral100,
        }),
        ...(color === 'red-fill' && {
          background: colors.red100,
          color: colors.white100,
        }),
        ...(color === 'white-fill' && {
          background: colors.white100,
          color: colors.black100,
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

import React, { FC } from 'react'
import { isTouchDevice } from '../../utils/isTouchDevice'
import { isMac } from '../../utils/isMac'

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

export type InputKey =
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

export type ModKeys = `Cmd` | `Alt` | `Shift`

type DoubleMod<M extends ModKeys> = `${M}+${Exclude<ModKeys, M>}+${InputKey}`

export const KeyBoardshortcut: FC<{ keyboardShortcut?: Key }> = ({
  keyboardShortcut,
}) => {
  if (isTouchDevice()) {
    return null
  }
  let str: string = keyboardShortcut
  if (keyboardShortcut.includes('Cmd')) {
    str = isMac() ? str.replace('Cmd', '⌘') : str.replace('Cmd', 'Ctrl')
  }
  return <> ({str})</>
}

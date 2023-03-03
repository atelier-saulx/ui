import { styled } from 'inlines'
import React from 'react'
import { Input } from '~'
import { minmax, toHex } from './utils'

const hexSuggest = (v) => v.padEnd(6, v.slice(-2) || '0')
const HexInput = ({ r, g, b, onRgbChange }) => {
  return (
    <Input
      placeholder="000000"
      type="text"
      style={{ marginLeft: 8, flexGrow: 4, flexBasis: 80, marginBottom: 8 }}
      value={`${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()}
      suggest={hexSuggest}
      transform={(v) =>
        v
          .toUpperCase()
          .replace(/[^A-F0-9]/g, '')
          .slice(0, 6)
      }
      forceSuggestion
      noInterrupt
      onChange={(v) => {
        const str = hexSuggest(v)
        const r = parseInt(str.substring(0, 2), 16)
        const g = parseInt(str.substring(2, 4), 16)
        const b = parseInt(str.substring(4, 6), 16)
        onRgbChange([r, g, b])
      }}
    />
  )
}

const NumberInput = styled((props) => <Input {...props} />, {
  marginLeft: 8,
  width: 52,
  flexShrink: 0,
  marginBottom: 8,
  flexGrow: 1,
})

const max225 = (v: number): number => (v ? Math.round(minmax(0, v, 255)) : v)
const max100 = (v: number): number => (v ? Math.round(minmax(0, v, 100)) : v)

export const Inputs = ({ rgb, alpha, onRgbChange, onAlphaChange }) => {
  let [r, g, b] = rgb

  r = Math.round(r)
  b = Math.round(b)
  g = Math.round(g)

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: -8,
        marginBottom: -8,
      }}
    >
      <HexInput r={r} g={g} b={b} onRgbChange={onRgbChange} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <NumberInput
          type="number"
          value={r}
          onChange={(r) => onRgbChange([minmax(0, r, 255), g, b])}
          transform={max225}
          placeholder="R"
        />
        <NumberInput
          type="number"
          value={g}
          onChange={(g) => onRgbChange([r, minmax(0, g, 255), b])}
          transform={max225}
          placeholder="G"
        />
        <NumberInput
          type="number"
          value={b}
          onChange={(b) => onRgbChange([r, g, minmax(0, b, 255)])}
          transform={max225}
          placeholder="B"
        />
        <NumberInput
          type="number"
          value={Math.round(alpha * 100)}
          onChange={(n) => onAlphaChange(n / 100)}
          transform={max100}
          placeholder="A"
        />
      </div>
    </div>
  )
}

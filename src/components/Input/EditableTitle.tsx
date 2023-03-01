import React, { FC, useState, useRef, useEffect, CSSProperties } from 'react'
import { Weight } from '~/types'
import { useScopedState } from '~/hooks'
import { useFlowHover } from '../Flow/useFlowHover'
import { color, EditIcon } from '~'
import { styled } from 'inlines'

type EditableTitleProps = {
  value?: string
  placeholder?: string
  identifier?: any
  onChange?: (value: string) => void
  onBlur?: (event: React.FormEvent<HTMLDivElement>) => void
  placeholderAsDefault?: boolean
  autoFocus?: boolean
  weight?: Weight
  horizontalPaddding?: number
}

export const EditableTitle: FC<EditableTitleProps> = ({
  value,
  onChange,
  onBlur,
  placeholderAsDefault,
  autoFocus,
  identifier,
  placeholder = '',
  weight = 600,
  horizontalPaddding = 9,
}) => {
  const [hover, isHover] = !onChange ? [{}, false] : useFlowHover()
  const [isEditing, setEditing] = useState(false)
  const [inputText, setInputText] = useScopedState(value, identifier, isEditing)
  const ref = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  const editingFix = () => ref.current && ref.current.blur()
  useEffect(() => {
    window.addEventListener('blur', editingFix)
    return () => {
      window.removeEventListener('blur', editingFix)
    }
  }, [])

  useEffect(() => {
    if (ref.current && autoFocus) {
      setEditing(true)
      // @ts-ignore
      ref.current.focus()
    }
  }, [autoFocus])

  const textProperties: CSSProperties = {
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '-0.015em',
    fontWeight: weight,
  }

  const showPlaceholder = !inputText || (placeholderAsDefault && !inputText)
  const showEllipsis = !isEditing && !isHover

  return (
    <div
      {...hover}
      style={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        width: 'calc(100% - 30px)',
        borderRadius: '4px',
        border: isEditing ? `1px solid ${color('border')}` : null,
        overflow: 'hidden',
      }}
    >
      <styled.div
        ref={ref}
        contentEditable={!!onChange}
        suppressContentEditableWarning
        className={[
          showPlaceholder ? 'showPlaceholder' : undefined,
          placeholderAsDefault ? 'placeholderAsDefault' : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          userSelect: !onChange ? 'none' : null,
          cursor: !onChange ? 'default' : null,
          background: !isEditing && isHover ? color('lightaccent') : null,
          paddingLeft: !isEditing ? horizontalPaddding + 1 : horizontalPaddding,
          paddingRight: !isEditing
            ? horizontalPaddding + 1
            : horizontalPaddding,
          paddingTop: !isEditing ? 1 : null,
          paddingBottom: !isEditing ? 1 : null,
          ...textProperties,
          color: color('text'),
          boxShadow: isEditing
            ? `0px 3px 8px 1px ${color('background')}`
            : null,
          overflow: isFocused ? 'visible' : 'hidden',
          textOverflow: showEllipsis ? 'ellipsis' : 'unset',
          '&.showPlaceholder::before': {
            content: '"' + placeholder + '"',
            color: color('text'),
            ...textProperties,
          },
          '&.showPlaceholder.placeholderAsDefault::before': {
            color: color('text'),
          },
          '&.showPlaceholder::focus': {
            textOverflow: 'unset',
          },
        }}
        onInput={(event) => {
          const el = event.target as HTMLElement
          el.classList.remove('showPlaceholder')
          const v = el.innerText
          if (v === '' || v === '\n') {
            el.innerText = ''
            el.classList.add('showPlaceholder')
          }
          onChange(v)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault()
            event.stopPropagation()
            ;(event.target as HTMLElement).blur()
            const el = event.target as HTMLElement
            const v = el.innerText
            setInputText(v)
            setEditing(false)
            if (typeof onBlur === 'function') onBlur(event)
          }
        }}
        onBlur={(event) => {
          const el = event.target as HTMLElement
          const v = el.innerText
          if (v === '\n') {
            el.innerText = ''
            return
          }
          setInputText(v)
          setEditing(false)
          if (typeof onBlur === 'function') onBlur(event)
          if (placeholderAsDefault) el.classList.add('placeholderAsDefault')
          setIsFocused(false)
        }}
        onFocus={(event) => {
          const el = event.target as HTMLElement
          el.classList.remove('placeholderAsDefault')
          setIsFocused(true)
        }}
        onClick={(event) => {
          event.stopPropagation()
          if (onChange && !isEditing) {
            setEditing(true)
            ;(event.target as HTMLElement).focus()
          }
        }}
      >
        {inputText || ''}
      </styled.div>
      {onChange && !isEditing && isHover ? (
        <EditIcon color="text" style={{ marginLeft: 16 }} />
      ) : null}
    </div>
  )
}

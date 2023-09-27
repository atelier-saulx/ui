import React, { useState, ReactNode, FC, useEffect } from 'react'
import {
  styled,
  Style,
  Text,
  IconChevronDown,
  IconChevronTop,
  color as genColor,
  BpTablet,
  ScrollArea,
} from '../../'

type AccordionItemProps = {
  title?: string
  active?: boolean
  children?: ReactNode | ReactNode[]
  style?: Style
  onClick?: any
  onClose?: any
}
// todo, make onclick onclose props.onclick forgot how
const AccordionItem: FC<AccordionItemProps> = ({
  title,
  active,
  children,
  style,
  onClick,
  onClose,
}) => {
  const [render, setRender] = useState(active)

  useEffect(() => {
    if (active) {
      setRender(true)
    }
    if (!active) {
      const timer = setTimeout(() => setRender(false), 300)
      clearTimeout(timer)
    }
  }, [active])

  return (
    <styled.div
      style={{
        height: 'auto',
        maxHeight: active ? '1000px' : '40px',
        transition: active ? '0.16s' : '0.16s',
        overflow: 'hidden',
        borderBottom: `1px solid ${genColor('border', 'default', 'subtle')}`,
        '&:hover': {
          borderBottom: `1px solid ${genColor(
            'inputBorder',
            'neutralHover',
            'default'
          )}`,
        },
        [BpTablet]: {
          '&:hover': null,
        },
        ...style,
      }}
    >
      <styled.div
        onClick={active ? onClose : onClick}
        style={{
          height: '20px',
          width: '100%',
          padding: '10px 8px',
          display: 'flex',
          alignItems: 'center',
          // userSelect: 'none',
          // WebkitUserSelect: 'none',
          gap: 8,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: genColor('action', 'neutral', 'subtleHover'),
          },
          [BpTablet]: {
            '&:hover': null,
          },
          '&:active': {
            backgroundColor: genColor('action', 'neutral', 'subtleActive'),
          },
        }}
      >
        <IconChevronDown
          style={{
            transform: active ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'none',
          }}
        />
        <Text selectable="none">{title ?? 'No titles???'}</Text>
      </styled.div>
      {render && (
        <ScrollArea
          style={{
            padding: '16px',
            paddingLeft: '36px',
            maxHeight: '800px',
            // '& div': {
            //   backgroundColor: 'yellow',
            // },
          }}
        >
          {children}
        </ScrollArea>
      )}
    </styled.div>
  )
}

type AccordionProps = {
  data?: Omit<AccordionItemProps, 'onClick' | 'onClose'>[]
  active?: null | Number | Array<Number>
  style?: Style
}

export const Accordion: FC<AccordionProps> = ({
  data,
  active: activeFromProps,
  style,
}) => {
  const [active, setActive] = useState(activeFromProps)
  const multi = active instanceof Array

  return (
    <styled.div
      style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}
    >
      {data?.map((v, i) => {
        return (
          <AccordionItem
            onClick={
              multi ? () => setActive([...active, i]) : () => setActive(i)
            }
            onClose={
              multi
                ? () => setActive(active.filter((v) => v !== i))
                : () => setActive(null)
            }
            active={multi ? active.includes(i) : active === i}
            key={v.title}
            title={v.title}
          >
            {v.children}
          </AccordionItem>
        )
      })}
    </styled.div>
  )
}

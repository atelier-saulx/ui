import React, { FC, ReactNode } from 'react'
import {
  Text,
  styled,
  Style,
  renderOrCreateElement,
  Checkbox,
  color as genColor,
  IconChevronRightSmall,
  useOverlay,
  Dropdown,
} from '../..'

export type DropDownItemProps = {
  caption?: string
  data?: DropDownItemProps[]
  icon?: ReactNode
  id?: string
  label: string
  type?: 'default' | 'checkbox' | 'radio' | 'action' | 'error'
  value?: string | number | boolean
}

export const DropDownItem: FC<DropDownItemProps> = ({
  caption,
  data,
  icon,
  id,
  label,
  type = 'default',
  value,
}) => {
  console.log(data, 'from item??')
  // if is range
  const openNewDropDown = useOverlay(
    Dropdown,
    { data },
    { width: '100%', position: 'right', offset: { x: -20, y: 0 } },
    undefined,
    undefined,
    { style: { scrollbarGutter: 'auto', border: 'none', boxShadow: 'none' } }
  )

  return (
    <styled.div
      style={{
        borderRadius: 8,
        cursor: 'pointer',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: genColor('action', 'system', 'hover'),
        },
      }}
      onClick={data ? openNewDropDown : null}
    >
      {type === 'default' ? (
        <>
          {icon && renderOrCreateElement(icon)}
          <Text weight="medium" style={{ marginLeft: icon ? 10 : 0 }}>
            {label}
          </Text>
        </>
      ) : type === 'checkbox' ? (
        <Checkbox label={label} value={value as boolean} />
      ) : (
        //   : type === 'radio' ? (
        //     <RadioButtons data={[{ label: label, value: value  }]} />
        //   )
        ''
      )}

      {(data || caption) && (
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <Text
            size={12}
            style={{
              color: genColor('content', 'default', 'secondary'),
            }}
          >
            {caption}
          </Text>
          {data && <IconChevronRightSmall style={{ marginLeft: 10 }} />}
        </styled.div>
      )}
    </styled.div>
  )
}

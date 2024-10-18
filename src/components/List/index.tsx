import { Fragment, useState } from 'react'
import { Field, Select } from '../../utils/common.js'
import { Menu, MenuItemProps } from '../Menu/index.js'
import { Text } from '../Text/index.js'
import { IconButton } from '../IconButton/index.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Badge } from '../Badge/index.js'
import { prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'
import { styled } from 'inlines'
import { ScrollArea } from '../ScrollArea/index.js'

type ListProps = {
  data: any[]
  fields: Field[]
  title?: string
  select?: Select
  onSelectChange?: (select?: Select) => void
  collapsible?: boolean
  onItemClick?: (item: any) => void
  itemActions?: {
    label: string
    icon?: MenuItemProps['leadIcon']
    color?: MenuItemProps['color']
    onClick?: (item: any) => void
  }[]
}

function List({
  title,
  collapsible,
  onSelectChange,
  data,
  select,
  fields,
  onItemClick,
  itemActions,
}: ListProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [forceHover, setForceHover] = useState<string>()

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {title && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 44,
            padding: '0 16px',
            gap: 8,
            border: `1px solid ${colors.neutral20Adjusted}`,
            background: colors.neutral5,
            borderTopLeftRadius: radius[16],
            borderTopRightRadius: radius[16],
            ...(collapsed && {
              borderBottomLeftRadius: radius[16],
              borderBottomRightRadius: radius[16],
            }),
          }}
        >
          {onSelectChange && (
            <CheckboxInput
              size="small"
              value={data.length && data.every((e) => select?.includes(e.id))}
              onChange={() => {
                if (!select) {
                  onSelectChange(data.map((e) => e.id))
                  return
                }

                if (data.every((e) => select.includes(e.id))) {
                  onSelectChange([])
                  return
                }

                onSelectChange(data.map((e) => e.id))
              }}
            />
          )}
          <Text variant="display-medium" color="neutral80">
            {title}
          </Text>
          {collapsible && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
            >
              <IconButton
                size="small"
                icon={collapsed ? 'chevron-left' : 'chevron-down'}
                onClick={() => {
                  setCollapsed((p) => !p)
                }}
              />
            </div>
          )}
        </div>
      )}
      {!collapsed && (
        <div
          style={{
            minHeight: 128,
            height: '100%',
            borderLeft: `1px solid ${colors.neutral20Adjusted}`,
            borderRight: `1px solid ${colors.neutral20Adjusted}`,
            borderBottom: `1px solid ${colors.neutral20Adjusted}`,
            borderBottomLeftRadius: radius[16],
            borderBottomRightRadius: radius[16],
            ...(!title && {
              borderTop: `1px solid ${colors.neutral20Adjusted}`,
              borderTopLeftRadius: radius[16],
              borderTopRightRadius: radius[16],
            }),
          }}
        >
          <ScrollArea
            style={{
              padding: 8,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {data.map((item) => (
                <styled.div
                  key={item.id}
                  onClick={() => {
                    onItemClick?.(item)
                  }}
                  data-hover={[forceHover, ...(select ?? [])].includes(item.id)}
                  style={{
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: radius[8],
                    padding: '0 8px',
                    gap: 8,
                    '&:hover, &[data-hover=true]': {
                      background: colors.neutral10Adjusted,
                    },
                  }}
                >
                  {onSelectChange && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CheckboxInput
                        size="small"
                        value={select?.includes(item.id)}
                        onChange={() => {
                          if (!select) {
                            onSelectChange([item.id])
                            return
                          }

                          if (select.includes(item.id)) {
                            onSelectChange(select.filter((e) => e !== item.id))
                            return
                          }

                          onSelectChange([...select, item.id])
                        }}
                      />
                    </div>
                  )}
                  {fields.map((field, index) => (
                    <Fragment key={field.key}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {field.type === 'image' ? (
                          <img
                            key={item[field.key]}
                            style={{ height: 24, width: 24 }}
                            src={item[field.key]}
                          />
                        ) : field.type === 'badge' ? (
                          <Badge>{[item[field.key]]}</Badge>
                        ) : field.type === 'number-bytes' ? (
                          <Text
                            singleLine
                            variant="display-medium"
                            color="neutral80"
                          >
                            {prettyNumber(item[field.key], 'number-bytes')}
                          </Text>
                        ) : field.type === 'date-time-human' ? (
                          <Text
                            singleLine
                            variant="display-medium"
                            color="neutral80"
                          >
                            {prettyDate(item[field.key], 'date-time-human')}
                          </Text>
                        ) : field.render ? (
                          field.render(item, { forceHover, setForceHover })
                        ) : (
                          <Text
                            singleLine
                            variant="display-medium"
                            color="neutral80"
                          >
                            {item[field.key]}
                          </Text>
                        )}
                      </div>
                      {index !== fields.length - 1 && (
                        <div
                          style={{
                            height: 2,
                            width: 2,
                            borderRadius: radius.full,
                            background: colors.neutral60,
                          }}
                        />
                      )}
                    </Fragment>
                  ))}
                  {
                    <Menu
                      onOpenChange={(open) => {
                        setForceHover(open ? item.id : undefined)
                      }}
                    >
                      <Menu.Trigger>
                        <div
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          style={{ display: 'flex', marginLeft: 'auto' }}
                        >
                          <IconButton icon="more-vertical" size="small" />
                        </div>
                      </Menu.Trigger>
                      <Menu.Items>
                        {itemActions.map((action) => (
                          <Menu.Item
                            key={action.label}
                            leadIcon={action.icon}
                            onClick={() => {
                              action?.onClick(item)
                            }}
                            color={action.color}
                          >
                            {action.label}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Menu>
                  }
                </styled.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export { List }
export type { ListProps }

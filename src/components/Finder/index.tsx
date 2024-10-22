import { useMemo, useState } from 'react'
import { Sort, Select, Field } from '../../utils/common.js'
import { Menu, MenuItemProps } from '../Menu/index.js'
import { IconButton } from '../IconButton/index.js'
import { AppHeader } from '../AppHeader/index.js'
import { useInfiniteQuery } from '../../hooks/useInfiniteQuery.js'
import { InternalTable, TableFieldRenderOptions } from '../Table/index.js'
import { Text } from '../Text/index.js'
import { Button } from '../Button/index.js'
import { InternalGrid } from '../Grid/index.js'
import {
  Calendar,
  CalendarVariant,
  getCalendarVisiblePeriod,
} from '../Calendar/index.js'

type FinderView = 'grid' | 'table' | 'calendar'

type FinderProps = {
  title: string
  fields: Field[]
  defaultView?: FinderView
  onItemClick?: (item: any) => void
  itemActions?: {
    label: string
    icon?: MenuItemProps['leadIcon']
    color?: MenuItemProps['color']
    onClick?: (item: any) => void
  }[]
  totalQuery: () => any
  transformQueryResult: (queryResult: any) => any
  query: (view: FinderView, offsetOrStart: number, limitOrEnd: number) => any
}

function Finder({
  title,
  fields: fieldsProp,
  defaultView = 'table',
  query,
  totalQuery,
  transformQueryResult,
  onItemClick,
  itemActions,
}: FinderProps) {
  const [view, setView] = useState(defaultView)
  const [sort, setSort] = useState<Sort>()
  const [select, setSelect] = useState<Select>()
  const [calendarDate, setCalendarDate] = useState(Date.now())
  const [calendarVariant, setCalendarVariant] =
    useState<CalendarVariant>('monthly')

  const { data, total, handleScroll, scroll, handleCalendar } =
    useInfiniteQuery({
      view,
      query,
      totalQuery,
      transformQueryResult,
    })

  // TODO when scrolling it sticks to the wrong rows on table, prob a bug it table and not here
  function renderActionButton(row: any, opts?: TableFieldRenderOptions) {
    return (
      <Menu
        onOpenChange={(open) => {
          opts?.setForceHover(open ? row.id : undefined)
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
              leadIcon={action.icon}
              onClick={() => {
                action?.onClick(row)
              }}
              color={action.color}
            >
              {action.label}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    )
  }

  const fields: Field[] = [
    ...fieldsProp,
    ...(itemActions
      ? [
          {
            key: '_item_action',
            title: () => null,
            render: renderActionButton,
          } satisfies Field,
        ]
      : []),
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
      }}
    >
      <AppHeader>
        <AppHeader.Title>{title}</AppHeader.Title>
        <AppHeader.Right>
          {view !== 'calendar' && (
            <>
              {scroll && total && (
                <Text variant="display-regular" color="neutral60">
                  {scroll.realFirst} - {scroll.realLast} of {total}
                </Text>
              )}
              {!!select?.length && (
                <Button trailIcon="chevron-down">
                  {select.length} selected
                </Button>
              )}
              <AppHeader.Separator />
              <Button variant="ghost" leadIcon="sort">
                Sort
              </Button>
            </>
          )}
          {view === 'calendar' && (
            <Calendar.Controls
              value={calendarDate}
              variant={calendarVariant}
              onChange={(value) => {
                setCalendarDate(value)
                const { start, end } = getCalendarVisiblePeriod(
                  value,
                  calendarVariant,
                )
                handleCalendar(start, end)
              }}
            />
          )}
          <AppHeader.Separator />
          <Menu>
            <Menu.Trigger>
              <IconButton icon="sheet" />
            </Menu.Trigger>
            <Menu.Items>
              <Menu.OptionCardGroup
                value={view}
                onChange={(v) => {
                  setView(v as FinderView)
                }}
                options={[
                  { label: 'Table', value: 'table', icon: 'sheet' },
                  { label: 'Grid', value: 'grid', icon: 'gallery' },
                  { label: 'Calendar', value: 'calendar', icon: 'date' },
                ]}
              />
              {view === 'calendar' && (
                <>
                  <Menu.Header>Timescale</Menu.Header>
                  <Menu.ToggleItem
                    value={calendarVariant === 'monthly'}
                    onChange={() => {
                      setCalendarVariant('monthly')
                      const { start, end } = getCalendarVisiblePeriod(
                        calendarDate,
                        calendarVariant,
                      )
                      handleCalendar(start, end)
                    }}
                  >
                    Month
                  </Menu.ToggleItem>
                  <Menu.ToggleItem
                    value={calendarVariant === '2-weekly'}
                    onChange={() => {
                      setCalendarVariant('2-weekly')
                      const { start, end } = getCalendarVisiblePeriod(
                        calendarDate,
                        calendarVariant,
                      )
                      handleCalendar(start, end)
                    }}
                  >
                    2 week
                  </Menu.ToggleItem>
                  <Menu.ToggleItem
                    value={calendarVariant === 'weekly'}
                    onChange={() => {
                      setCalendarVariant('weekly')
                      const { start, end } = getCalendarVisiblePeriod(
                        calendarDate,
                        calendarVariant,
                      )
                      handleCalendar(start, end)
                    }}
                  >
                    Week
                  </Menu.ToggleItem>
                </>
              )}
            </Menu.Items>
          </Menu>
          <Button leadIcon="add">Add</Button>
        </AppHeader.Right>
      </AppHeader>

      {view === 'table' && (
        <InternalTable
          virtualized
          fields={fields}
          data={data}
          totalCount={total}
          onScroll={handleScroll}
          onItemClick={onItemClick}
          select={select}
          onSelectChange={setSelect}
        />
      )}

      {view === 'grid' && (
        <InternalGrid
          virtualized
          fields={fields}
          data={data}
          totalCount={total}
          onScroll={handleScroll}
          onItemClick={onItemClick}
          select={select}
          onSelectChange={setSelect}
        />
      )}

      {view === 'calendar' && (
        <Calendar
          fields={fields}
          data={data}
          visiblePeriodStart={
            getCalendarVisiblePeriod(calendarDate, calendarVariant).start
          }
          variant={calendarVariant}
          onItemClick={onItemClick}
        />
      )}
    </div>
  )
}
export { Finder }
export type { FinderProps, FinderView }

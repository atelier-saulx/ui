import React, { FC, useState } from 'react'
import {
  border,
  LoadingIcon,
  Menu,
  Text,
  Badge,
  useContextState,
  AddIcon,
  Button,
  useDialog,
  RowSpaced,
  EyeIcon,
  ScreensIcon,
  MenuData,
  MoreIcon,
  ContextDivider,
  ContextItem,
  useContextMenu,
  useSchema,
} from '~'
import { useViews } from '../hooks/useViews'
import { AddViewModal } from '../ViewModals'

const CategoryMenu: FC<{}> = ({}) => {
  const { open } = useDialog()
  const [hidden, setHidden] = useContextState('hidden')
  return (
    <>
      <ContextItem
        onClick={() => {
          open(<AddViewModal />)
        }}
        icon={AddIcon}
      >
        Add item
      </ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={() => {
          setHidden(!hidden)
        }}
        icon={EyeIcon}
      >
        {hidden ? 'Hide' : 'Show'} hidden items
      </ContextItem>
    </>
  )
}

export const SystemLabel = ({ isActive = false, children }) => {
  const [hover, setHover] = useState(false)
  let thingy: boolean
  if (hover || isActive) {
    thingy = false
  } else {
    thingy = true
  }
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {children}
      <Badge ghost={thingy}>system</Badge>
    </div>
  )
}

export const ContentLeft: FC<{}> = () => {
  const [view, setView] = useContextState<string>('view')
  const [, setTarget] = useContextState<string>('target')

  const { views, loading } = useViews()
  const [hidden] = useContextState('hidden')

  const { schema, loading: loadingSchema } = useSchema()

  const openMenu = useContextMenu(CategoryMenu)

  const data: MenuData = {
    default: [],
  }

  if (!loadingSchema) {
    for (const type in schema.types) {
      if (!type) {
        console.error('Empty type in schema', type, schema)
        continue
      }

      const typeSchema = schema.types[type]

      const name = typeSchema.meta?.name || type

      // @ts-ignore
      data.default.push({
        label: name[0].toUpperCase() + name.slice(1),
        value: { id: 'type-' + type },
      })
    }
  }

  for (const view of views) {
    if (!hidden && view.hidden === true) {
      continue
    }

    if (!data[view.category]) {
      data[view.category] = []
    }
    // @ts-ignore
    data[view.category].push({
      label: view.name,
      value: view,
      // icon:
      //   // @ts-ignore TODO tmp structure
      //   view.config?.view === 'table' ? (
      //     <EyeIcon />
      //   ) : view.config?.type === 'components' ? (
      //     <ScreensIcon />
      //   ) : undefined,
    })
  }

  return loading || loadingSchema ? (
    <div
      style={{
        width: 234,
        borderRight: border(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>
        <LoadingIcon style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
        Loading content views
      </span>
    </div>
  ) : (
    <Menu
      isActive={(currentView) => {
        return currentView?.id === view
      }}
      onChange={(v) => {
        setTarget(null)
        setView(v.id)
      }}
      collapse
      style={{
        paddingTop: 24,
        minWidth: 234,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      header={
        <RowSpaced
          style={{
            marginBottom: 24,
          }}
        >
          <Text size="22px" weight="700" style={{ lineHeight: '32px' }}>
            Content
          </Text>
          <Button
            onClick={openMenu}
            style={{ marginRight: -8 }}
            ghost
            icon={<MoreIcon />}
          />
        </RowSpaced>
      }
      data={data}
    />
  )
}

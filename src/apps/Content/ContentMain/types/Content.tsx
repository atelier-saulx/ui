import React, { FC, useEffect, useRef } from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  useContextState,
  Button,
  MoreIcon,
  Input,
  SearchIcon,
  Table,
  AddIcon,
} from '~'
import { useQuery, useClient } from '@based/react'
import { parseProps } from '../propsParser'
import useLocalStorage from '@based/use-local-storage'
import { ContentConfig, View } from '../../types'

export const Content: FC<{ view: View<ContentConfig>; actions }> = ({
  view,
  actions,
}) => {
  const openContextMenu = useContextMenu<{ view }>(actions, { view })
  const [state, setState] = useLocalStorage('view-' + view, {})
  const [, setView] = useContextState<any>('view')
  const [, setOverlay] = useContextState<any>('overlay')
  const [target, setTarget] = useContextState<any>('target')
  const [, setOverlayTarget] = useContextState<any>('overlay-target')
  const isTable = view.config.view === 'table'
  const ref = useRef<ReturnType<typeof setTimeout>>()
  const typing = useRef<boolean>()

  useEffect(() => {
    return () => {
      clearTimeout(ref.current)
    }
  }, [])

  const targetDefaults = view.config?.target ?? {}
  const showFilter = view.config?.showFilter
  const client = useClient()
  const ctx = {
    data: {},
    state,
    client,
    target: { ...targetDefaults, ...target },
    args: [],
    setOverlay,
    setState,
    setView,
    setTarget: (t, isOverlay = false) => {
      if (isOverlay) {
        setOverlayTarget(t)
      } else {
        setTarget(t)
      }
    },
  }
  const payload = parseProps(view.config.function?.payload, ctx)

  const { data } = useQuery(view.config.function?.name, payload)

  console.log(data, payload)

  ctx.data = data
  const props = parseProps(view.config.props ?? {}, ctx)
  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
        minHeight: 200,
      }}
    >
      <styled.div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          minWidth: '100%',
          paddingTop: 24,
          paddingBottom: 32,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Row
          style={{
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Row>
            <Text typography="title2">{props.name ?? view.name}</Text>
            <Button
              style={{ marginLeft: 16 }}
              ghost
              onClick={openContextMenu}
              icon={MoreIcon}
            />
          </Row>

          {showFilter ? (
            <Input
              bg
              icon={<SearchIcon />}
              value={target?.filter}
              type="text"
              style={{
                width: '100%',
                maxWidth: 400,
              }}
              placeholder="Filter..."
              onChange={(v) => {
                const x = { ...target }
                if (!v) {
                  delete x.filter
                } else {
                  x.filter = v
                }
                clearTimeout(ref.current)
                typing.current = true
                ref.current = setTimeout(() => {
                  typing.current = false
                  setTarget(x)
                }, 300)
              }}
            />
          ) : null}

          {props.button ? (
            <Button ghost color="accent" icon={AddIcon} {...props.button} />
          ) : null}
        </Row>
        <styled.div
          style={{
            height: '100%',
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          {!typing.current && isTable && <Table {...props} />}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}

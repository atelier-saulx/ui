import React, { FC } from 'react'
import { useQuery, useClient } from '@based/react'
import { parseProps } from '../../propsParser'
import {
  useContextState,
  styled,
  color,
  useCopyToClipboard,
  Text,
  Button,
  CloseIcon,
  removeOverlay,
  Row,
  Select,
  Badge,
  CheckIcon,
  LoadingIcon,
  useSchema,
  ScrollArea,
  IdIcon,
} from '~'
import { ContentEditor } from './ContentEditor'
import { createTypeModal } from '../schema'

export const Modal: FC<{ overlay: string }> = ({ overlay }) => {
  const [, setView] = useContextState<any>('view')
  const [state, setState] = useContextState<any>('overlay-state', {})
  const [, setOverlay] = useContextState<any>('overlay')
  const [overlayTarget, setOverlayTarget] =
    useContextState<any>('overlay-target')
  const [, setTarget] = useContextState<any>('target')
  const client = useClient()
  const { schema, loading: schemaLoading } = useSchema()

  const isType = overlay?.startsWith('type-')

  let { data: overlayData } = useQuery(isType ? null : 'db', {
    $db: 'config',
    $id: overlay,
    $all: true,
  })

  if (isType && !schemaLoading) {
    overlayData = createTypeModal(schema, overlay.replace(/^type-/, ''))
  }

  const targetDefaults = overlayData?.config?.target ?? {}
  const ctx = {
    data: {},
    state,
    client,
    target: { ...targetDefaults, ...overlayTarget },
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
  const { data, loading } = useQuery(
    overlayData?.config?.function?.name,
    parseProps(overlayData?.config?.function?.payload ?? {}, ctx)
  )

  const [copied, copy] = useCopyToClipboard(data?.id)

  if (!overlayData) {
    return <LoadingIcon />
  }

  ctx.data = data
  const props = parseProps(overlayData?.config?.props ?? {}, ctx)

  let hasChanges = false

  for (const k in state) {
    if (state[k] !== undefined && state[k] !== null) {
      hasChanges = true
      break
    }
  }

  return (
    <styled.div
      style={{
        background: color('background'),
        display: 'flex',
        borderRadius: 12,
        width: 'calc(100% -  64px)',
        maxWidth: 1164,
        height: 'calc(100% -  64px)',
      }}
    >
      {loading ? (
        <ScrollArea style={{ flexGrow: 1, padding: 48 }}>
          <Row>
            <LoadingIcon />
            <Text style={{ marginLeft: 8 }}>Loading...</Text>
          </Row>
        </ScrollArea>
      ) : (
        <>
          <ScrollArea style={{ flexGrow: 1 }}>
            <styled.div
              style={{
                borderBottom: `1px solid ${color('border')}`,
                padding: '24px 32px',
              }}
            >
              <Text typography="subtitle500">{props.name}</Text>
            </styled.div>
            <styled.div>
              <ContentEditor
                setState={setState}
                state={state}
                data={props.data ?? {}}
                fields={props.fields ?? []}
              />
            </styled.div>
          </ScrollArea>

          <styled.div
            style={{
              maxWidth: 260,
              width: '100%',
              backgroundColor: color('background2'),
              padding: 24,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              borderLeft: `1px solid ${color('border')}`,
              position: 'relative',
            }}
          >
            <Button
              style={{
                position: 'absolute',
                height: 32,
                width: 32,
                top: 24,
                right: 32,
                borderRadius: 16,
              }}
              icon={<CloseIcon color="text2" />}
              color="border"
              onClick={() => removeOverlay()}
            />
            <styled.div
              style={{
                borderBottom: `1px solid ${color('border')}`,
                height: 54,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'end',
                paddingBottom: 8,
              }}
            >
              <Text typography="caption600">STATUS</Text>
            </styled.div>
            <Button
              disabled={!hasChanges}
              displayShortcut
              keyboardShortcut="Cmd+S"
              {...props.saveButton}
              onClick={async (e) => {
                await props.saveButton.onClick(e)
                setState(null)
              }}
            />

            {props.deleteButton ? (
              <Button
                style={{ marginTop: 24 }}
                ghost
                outline
                {...props.deleteButton}
                onClick={() => {
                  props.deleteButton.onClick()
                  removeOverlay()
                }}
              />
            ) : null}

            <Badge
              onClick={() => copy()}
              icon={copied ? <CheckIcon color="accent" /> : ''}
              style={{
                marginBottom: 6,
                marginTop: 32,
                padding: 8,
                paddingLeft: 16,
                paddingRight: 16,
                borderRadius: 32,
              }}
            >
              <Row>
                <IdIcon
                  color="accent"
                  style={{
                    marginRight: 8,
                  }}
                />
                <Text>{data?.id}</Text>
              </Row>
            </Badge>
            {copied && (
              <Text
                color="text2"
                style={{ marginTop: 12, marginLeft: 16 }}
                typography="caption500"
              >
                copied to clipboard
              </Text>
            )}
            <styled.div
              style={{
                borderBottom: `1px solid ${color('border')}`,
                height: 54,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'end',
                paddingBottom: 8,
              }}
            >
              <Text typography="caption600">TRANSLATION</Text>
            </styled.div>
            <Select
              options={['English (en)', 'Dutch (nl)']}
              placeholder="Select a language"
            />
          </styled.div>
        </>
      )}
    </styled.div>
  )
}

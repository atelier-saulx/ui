import { useClient, useQuery } from '@based/react'
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { Badge } from '~/components/Badge'
import { Button } from '~/components/Button'
import { RightSidebar } from '~/components/RightSidebar'
import { ScrollArea } from '~/components/ScrollArea'
import { Text } from '~/components/Text'
import { useSchema, useCopyToClipboard } from '~/hooks'
import { CloseIcon, ArrowRightIcon, CheckIcon } from '~/icons'
import { border, color } from '~/utils'
import { ContentEditor } from '../ContentEditor'
import { useDescriptor } from '../hooks/useDescriptor'
import { prettyDate } from '@based/pretty-date'
import { Select } from '~/components/Select'
import useLocalStorage from '@based/use-local-storage'
import languageNames from 'countries-list/dist/minimal/languages.en.min.json'
import { Dialog, useDialog } from '~/components/Dialog'
import { deepMerge } from '@saulx/utils'
import { styled } from 'inlines'
import useGlobalState from '@based/use-global-state'
import { useRoute } from 'kabouter'

const Topbar = ({ id, type }) => {
  const { location, setLocation } = useRoute()
  const { type: schemaType, loading } = useDescriptor(id)

  return (
    <div
      style={{
        display: 'flex',
        padding: '0 24px',
        height: 64,
        borderBottom: border(1),
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      {location.split('.').length > 1 ? (
        <ArrowRightIcon
          onClick={() => {
            const newLocation = location.split('.').slice(0, -1).join('.')
            setLocation(newLocation)
          }}
          style={{ cursor: 'pointer', transform: 'scaleX(-1)' }}
        />
      ) : null}
      <Text style={{ marginLeft: 16 }} weight={600} size={16}>
        {id
          ? loading
            ? null
            : `Edit ${schemaType}${
                location.includes('.') ? '.' + location.split('.').pop() : ''
              }`
          : `Create new ${type}`}
      </Text>
    </div>
  )
}

const SideHeader: FC<{ title: string; children?: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: border(1),
        marginBottom: 12,
        paddingBottom: 8,
      }}
    >
      <Text weight={600} size={12}>
        {title.toUpperCase()}
      </Text>
      {children}
    </div>
  )
}

const LastSaved = ({ id }) => {
  const {
    data: { updatedAt },
  } = useQuery('db', {
    $id: id,
    updatedAt: true,
  })

  const prettyTime = prettyDate(updatedAt, 'date-time-human')

  return (
    <Text
      color="text2"
      size="13px"
      style={{
        marginTop: 12,
        marginBottom: 24,
      }}
    >
      Last saved {prettyTime === 'Now' ? 'just now' : prettyTime}
    </Text>
  )
}

const Translation = ({ language, setLanguage }) => {
  const { schema, loading } = useSchema()

  return loading ? null : (
    <Select
      style={{ backgroundColor: color('background2') }}
      value={
        schema.languages.includes(language) ? language : schema.languages[0]
      }
      options={schema.languages.map((iso) => {
        return {
          value: iso,
          label: `${languageNames[iso]} (${iso})`,
        }
      })}
      onChange={(val) => {
        setLanguage(val)
      }}
    />
  )
}

const parseBasedSetPayload = (payload) => {
  for (const i in payload) {
    const val = payload[i]
    if (val === null || val === '') {
      payload[i] = { $delete: true }
    } else if (typeof val === 'object') {
      parseBasedSetPayload(val)
    }
  }
}
let dialog = false

const ContentModalInner = ({ prefix, id, field }) => {
  const client = useClient()
  const { setLocation } = useRoute()
  const [disabled, setDisabled] = useState(true)
  const ref = useRef({})
  const published = useRef(false)
  const { current: changes } = ref
  const [language, setLanguage] = useLocalStorage('bui_lang')
  const { open } = useDialog()
  const type = id ? null : field
  const [inputGood, setInputGood] = useGlobalState('input')

  const [copied, copy] = useCopyToClipboard(id)
  useEffect(() => {
    // event.preventDefault()
    async function handleKeyDown(e) {
      if (
        e.keyCode === 13 &&
        !e.shiftKey &&
        document.activeElement.className !==
          'npm__react-simple-code-editor__textarea' &&
        inputGood
      ) {
        const blabla = async () => {
          parseBasedSetPayload(changes)
          await client.call('db:set', {
            $id: id?.split('.')[0] || undefined,
            type,
            ...changes,
          })
          published.current = true
          ref.current = {}
          setDisabled(true)
        }
        blabla()
        dialog = false
      }
      if (e.keyCode === 27 && dialog === false) {
        dialog = true
        await onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    // window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // window.removeEventListener('keyup', handleKeyUp)
    }
  })
  const dialogTime = () => (dialog = false)

  const onClose = async () => {
    const changedFields = Object.keys(ref.current).length
    // make so if dialog open enter doesnt publish
    if (changedFields) {
      open(
        <Dialog
          label={`You have ${changedFields} unpublished change${
            changedFields === 1 ? '' : 's'
          }`}
        >
          Are you sure you want to exit?
          <Dialog.Buttons>
            <Dialog.Cancel
              onCancel={() => {
                setTimeout(dialogTime, 10)
                const dialogTimeOut = setTimeout(dialogTime, 5000)
                clearTimeout(dialogTimeOut)
              }}
            />
            <Dialog.Confirm
              onConfirm={() => {
                dialog = false
                setLocation(prefix)
              }}
            >
              Discard changes (Enter)
            </Dialog.Confirm>
          </Dialog.Buttons>
        </Dialog>
      )
    } else {
      setTimeout(dialogTime, 10)
      const dialogTimeOut = setTimeout(dialogTime, 5000)
      clearTimeout(dialogTimeOut)
      setLocation(prefix)
    }
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          opacity: 0.6,
          width: 300,
          flexGrow: 1,
        }}
      />
      <styled.div
        style={{
          width: 1200,
          margin: 24,
          borderRadius: 12,
          backgroundColor: color('background'),
          boxShadow: '0px 8px 20px rgba(15, 16, 19, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          '@keyframes': {
            '0%': { transform: 'translateX(60px)', opacity: 0 },
            '100%': { transform: 'translateX(0px)', opacity: 1 },
          },
          animationDuration: '0.15s',
          animationEffect: 'ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Topbar id={id} type={type} />
        <div
          style={{
            display: 'flex',
            height: 'calc(100% - 64px)',
          }}
        >
          <ScrollArea style={{ flexGrow: 1 }}>
            <ContentEditor
              inputGood={() => setInputGood(true)}
              id={id}
              type={type}
              language={language}
              style={{ padding: '48px 76px' }}
              autoFocus={id ? field : null}
              prefix={prefix}
              onChange={(data) => {
                // console.log('data')
                setDisabled(false)

                if (
                  typeof data === 'object' &&
                  !Array.isArray(data[Object.keys(data)[0]])
                ) {
                  // console.warn('doing deep merge!', changes, data)
                  deepMerge(changes, data)
                } else {
                  //    console.log('array ', data, changes)
                  // als array of set is
                  Object.assign(changes, data)
                }
              }}
            />
          </ScrollArea>
          <RightSidebar
            style={{
              minWidth: 260,
              borderBottomRightRadius: 12,
              borderTopRightRadius: 12,
              marginTop: -64,
            }}
          >
            <styled.div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                height: 32,
                width: 32,
                marginLeft: 'auto',
                borderRadius: 16,
                backgroundColor: color('lighttext'),
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: color('lighttext:hover'),
                  },
                },
              }}
              onClick={onClose}
            >
              <CloseIcon size={14} />
            </styled.div>
            <SideHeader title="Status" />
            <Button
              large
              disabled={disabled}
              textAlign="center"
              style={{ width: '100%' }}
              onClick={async () => {
                parseBasedSetPayload(changes)
                await client.call('db:set', {
                  $id: id?.split('.')[0] || undefined,
                  type,
                  ...changes,
                })
                published.current = true
                ref.current = {}
                setDisabled(true)
              }}
            >
              {published.current
                ? disabled
                  ? 'Published'
                  : 'Publish changes'
                : 'Publish'}
            </Button>
            <div style={{ minHeight: 18 }}>
              {id ? (
                <>
                  <LastSaved id={id} />
                  <SideHeader title="ID" />
                  <div style={{ display: 'flex' }}>
                    <Badge style={{ marginBottom: 24 }} onClick={copy}>
                      {id}
                    </Badge>
                    {copied && (
                      <div
                        style={{ display: 'flex', marginLeft: 6, marginTop: 4 }}
                      >
                        <CheckIcon color="green" />
                        <Text size={12}>Copied!!</Text>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
            <SideHeader title="Translation" />
            <Translation language={language} setLanguage={setLanguage} />
          </RightSidebar>
        </div>
      </styled.div>
    </div>
  )
}

export const ContentModal = (props) => {
  if (!props.id) {
    return null
  }

  if (props.id === 'create') {
    return (
      <ContentModalInner
        {...props}
        id={null}
        childFields={props.childFields}
        objectName={props.objectName}
      />
    )
  }

  return <ContentModalInner {...props} />
}

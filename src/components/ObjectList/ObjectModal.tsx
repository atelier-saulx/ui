import React, { FC } from 'react'
import { border, color } from '~/utils'
import { CloseIcon, Text, ScrollArea, Button, Input } from '~'
import { RightSidebar } from '../RightSidebar'
import { ContentEditor } from '../Content/ContentEditor'
// import { useDescriptor } from '../hooks/useDescriptor'

const Topbar = ({ label, id, type, onClose }) => {
  // const { descriptor, type: schemaType, loading } = useDescriptor(id)
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
      <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
      <Text style={{ marginLeft: 24 }} weight={600}>
        Edit {label}
      </Text>
    </div>
  )
}

const SideHeader: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: border(1),
        marginBottom: 12,
        paddingBottom: 8,
      }}
    >
      <Text>{title}</Text>
      {children}
    </div>
  )
}

export const ObjectListModal = ({ label, props, schema, setShowModal }) => {
  console.log('props from objectlistmodal', props)

  const objectId = props.id
  const objectKeys = Object.keys(schema.properties)

  console.log('----> keys', Object.keys(schema.properties))
  console.log('---> values', Object.values(schema.properties))

  const onClose = async () => {
    console.log('close it')
    setShowModal(false)
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
      }}
    >
      <div
        onClick={onClose}
        style={{
          opacity: 0.6,
          width: 300,
          flexGrow: 1,
          backgroundColor: color('background2'),
        }}
      />
      <div
        style={{
          width: 1200,
          backgroundColor: color('background'),
          boxShadow: '0px 8px 20px rgba(15, 16, 19, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          // TODO temp zIndex fixie
          zIndex: 1,
        }}
      >
        {/* @ts-ignore */}
        <Topbar
          //  id={id}
          //  type={type}
          label={label}
          onClose={onClose}
        />
        <div
          style={{
            display: 'flex',
            height: 'calc(100% - 64px)',
          }}
        >
          <ScrollArea style={{ flexGrow: 1 }}>
            <div style={{ padding: '48px 76px' }}>
              <Text space>
                Content Editor weer maar dan voor de fields in dit object, die
                mapt trough - ContentField - Component
              </Text>

              {objectKeys.map((objectKey, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: 4,
                    border: `1px solid ${color('border')}`,
                    padding: '8px 12px',
                    marginBottom: 8,
                  }}
                >
                  {objectKey} - {schema.properties[objectKey].type}
                  ----Contentfield hiere??\
                </div>
              ))}
            </div>
            <ContentEditor
              // object id ??
              id={objectId}
              type={null}
              language={'en'}
              style={{ padding: '48px 76px' }}
              //   autoFocus={ObjectId ? field : null}
              onChange={(data) => {
                setDisabled(false)
                Object.assign(changes, data)
              }}
            />
          </ScrollArea>
          <RightSidebar style={{ width: 260 }}>
            <SideHeader title="Status" />
            <Button textAlign="center" style={{ width: '100%' }}>
              Publish button
            </Button>
          </RightSidebar>
        </div>
      </div>
    </div>
  )
}

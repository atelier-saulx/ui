import { Sidebar } from '~/components/Sidebar'
import React, { useState } from 'react'
import {
  AddIcon,
  AttachmentIcon,
  EditIcon,
  LayersIcon,
  SettingsIcon,
} from '~/icons'
import { Schema } from '~/components/Schema'
import { Text } from '~/components/Text'
import { Content } from '~/components/Content'
import { useRoute } from 'kabouter'
import { border, color } from '~/utils'
import { Menu } from '~/components/Menu'
import { Button } from '~/components/Button'
import { useClient } from '@based/react'
import { Dialog, useDialog } from '~/components/Dialog'
import { Select } from '~/components/Select'
import { Label } from '~/components/Label'
import languageNames from 'countries-list/dist/minimal/languages.en.min.json'
import { SchemaTopbar } from '~/components/Schema/SchemaTopbar'
import { useSchema } from '~'

const AddLocaleModal = ({ languages = [] }) => {
  const [selected, setSelected] = useState<string>()
  const client = useClient()

  return (
    <Dialog label="Create locale">
      <Dialog.Body>
        <div>
          <Label label="Locale" space={4} />
          <Select
            filterable
            options={Object.keys(languageNames)
              .sort((a, b) => {
                return languageNames[a] < languageNames[b] ? -1 : 1
              })
              .map((iso) => {
                return { value: iso, label: languageNames[iso] }
              })}
            placeholder="Select a locale"
            onChange={(value: string) => {
              setSelected(value)
            }}
          />
        </div>
      </Dialog.Body>
      <Dialog.Buttons>
        <Dialog.Cancel />
        <Dialog.Confirm
          disabled={!selected}
          onConfirm={() => {
            languages.push(selected)
            return client.call('db:set-schema', {
              schema: {
                languages,
              },
            })
          }}
        >
          Create
        </Dialog.Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}

const Settings = ({ prefix, style }) => {
  const {
    schema: { languages = [] },
  } = useSchema()

  const { open } = useDialog()
  return (
    <div style={{ display: 'flex', ...style }}>
      <Menu
        prefix={prefix}
        data={{
          'Project settings': {
            General: '/general',
            Locales: '/locales',
          },
        }}
      />
      <div style={{ flexGrow: 1, padding: 24 }}>
        <div
          style={{
            display: 'flex',
            padding: '4px 0px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text size="20px" weight={700}>
            Locales
          </Text>
          <Button
            large
            icon={AddIcon}
            onClick={() => {
              open(<AddLocaleModal languages={languages} />)
            }}
          >
            Add locale
          </Button>
        </div>
        <div
          style={{
            marginTop: 32,
            border: border(1),
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: color('background2'),
              height: 48,
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
            }}
          >
            <Text color="text2">Display Name</Text>
          </div>
          {languages.map((lang) => {
            return (
              <div
                key={lang}
                style={{
                  borderTop: border(1),
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 24px',
                }}
              >
                {languageNames[lang]} ({lang})
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const components = {
  content: Content,
  // files: '',
  schema: Schema,
  settings: Settings,
}

const Project = ({ style }) => {
  const [location] = useLocation()

  const [, section] = location.split('/')
  const prefix = `/${section}`
  const Component = components[section] || (() => null)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <SchemaTopbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          expandable
          data={[
            {
              subTitle: 'Database',
            },
            {
              icon: LayersIcon,
              label: 'Schema',
              href: '/schema',
            },
            {
              icon: EditIcon,
              label: 'Content',
              href: '/content',
            },
            {
              icon: AttachmentIcon,
              label: 'Files',
              //  href: '/files',
              href: '/content/file?story=based-app&filter=%5B%7B"%24field"%3A"type"%2C"%24operator"%3A"%3D"%2C"%24value"%3A"file"%7D%5D&target=root&field=descendants&type=file',
            },
            {
              subTitle: 'General',
            },
            {
              icon: SettingsIcon,
              label: 'Settings',
              href: '/settings',
            },
          ]}
        />
        <Component prefix={prefix} style={{ flexGrow: 1 }} />
      </div>
    </div>
  )
}

export const BasedApp = () => {
  return (
    <Project
      // id="enBEFnEK"
      style={{
        width: '100%',
        height: '100%',
        minHeight: 'calc(100vh - 128px)',
        position: 'relative',
        outline: border(1),
        overflow: 'hidden',
      }}
    />
  )
}

import React, { useEffect, useState } from 'react'
import { FormErrors } from './index.js'
import { Button } from '../Button/index.js'
import { Form } from './Form.js'
import { Badge } from '../Badge/index.js'
import { Sidebar } from '../Sidebar/index.js'
import { AppHeader } from '../AppHeader/index.js'
import { colors } from '../../utils/colors.js'
import { ScrollArea } from '../ScrollArea/index.js'
import { useToast } from '../Toast/index.js'

export default {
  title: 'Form',
  component: () => {},
  parameters: {
    layout: 'fullscreen',
  },
}

export const Component = () => {
  return (
    <Form
      fields={{
        text: { type: 'text', label: 'Text', description: 'this is a desc' },
        textarea: { type: 'textarea', label: 'Textarea' },
        number: { type: 'number', label: 'Number' },
        simpleSelect: {
          type: 'select',
          label: 'Simple select',
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ],
        },
        fancySelect: {
          type: 'select',
          label: 'Fancy select',
          options: [
            {
              value: 'live',
              label: (
                <Badge color="green-subtle" leadIcon="settings">
                  Live
                </Badge>
              ),
              labelFilterText: 'Live',
            },
            {
              value: 'scheduled',
              label: (
                <Badge color="blue-subtle" leadIcon="date">
                  Scheduled
                </Badge>
              ),
              labelFilterText: 'Scheduled',
            },
          ],
        },
        switch: { type: 'switch', label: 'Switch' },
        checkbox: { type: 'checkbox', label: 'Checkbox' },
        date: { type: 'datetime', label: 'Date', variant: 'date' },
        datetime: { type: 'datetime', label: 'DateTime', variant: 'date-time' },
      }}
      validate={(values) => {
        const errors: FormErrors = {}

        if (!values['text']) {
          errors['text'] = 'text is required'
        }

        if (!values['checkbox']) {
          errors['checkbox'] = 'checkbox is required'
        }

        if (!values['datetime']) {
          errors['datetime'] = 'datetime is required'
        } else if ((values['datetime'] as number) < Date.now()) {
          errors['datetime'] = 'datetime must be in the future'
        }

        return errors
      }}
      onSubmit={console.log}
    >
      {({
        submitForm,
        resetForm,
        validateForm,
        isSubmitting,
        isValidating,
        isDirty,
      }) => (
        <>
          <Form.Fields horizontal />
          <div
            style={{
              display: 'flex',
              gap: 16,
              paddingTop: 16,
            }}
          >
            <Button disabled={isSubmitting} onClick={resetForm} variant="ghost">
              Reset
            </Button>
            <Button
              disabled={isSubmitting}
              loading={isValidating}
              onClick={validateForm}
              variant="border"
            >
              Validate
            </Button>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                disabled={isSubmitting || !isDirty}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  )
}

export const FullScreenGroups = () => {
  const toast = useToast()

  return (
    <Form
      groups={[
        {
          label: 'General',
          description: 'Tile, type and platforms',
          icon: 'error',
          fields: ['title', 'type', 'platform', 'price'],
        },
        {
          label: 'Winners and prizes',
          description: 'Number of winners, prize category',
          icon: 'layers',
          fields: ['foo', 'foo2', 'bar', 'bar2'],
        },
        {
          label: 'Legal',
          icon: 'page',
          description: 'Terms & conditions, privacy policy',
          fields: ['terms', 'privacy'],
        },
      ]}
      fields={(values) => ({
        title: {
          type: 'text',
          label: 'Title',
          description: 'Used internally and publicly',
        },
        type: {
          type: 'select',
          label: 'Type',
          options: [
            { label: 'Cashcall', value: 'cashcall' },
            { label: 'SMS', value: 'sms' },
          ],
          note:
            values.type === 'sms'
              ? {
                  title: 'What are SMS games?',
                  description: 'Lorem ipsum',
                }
              : {
                  title: 'What are cashcall games?',
                  description:
                    'In cashcall games the participant calls or texts a phone number. Based on a set of rules they have the chance to win awards.',
                },
        },
        platform: {
          type: 'select',
          label: 'Platform',
          options: [
            { label: 'Bild', value: 'bild' },
            { label: 'Bild+', value: 'bildplus' },
          ],
        },
        price: {
          type: 'number',
          label: 'Price (EUR)',
        },
        foo: {
          type: 'text',
          label: 'Foo',
        },
        foo2: {
          type: 'textarea',
          label: 'Foo 2',
        },
        bar: {
          type: 'textarea',
          label: 'Bar',
        },
        bar2: {
          type: 'number',
          label: 'Bar 2',
        },
        terms: {
          type: 'textarea',
          label: 'Terms & Conditions',
        },
        privacy: {
          type: 'textarea',
          label: 'Privacy policy',
        },
      })}
      validate={(values) => {
        const errors: FormErrors = {}

        if (!values.title) {
          errors.title = 'A title is required'
        }

        return errors
      }}
      onSubmitError={() => {
        toast("Couldn't save changes", {
          icon: 'error',
          description: 'Make sure all fields are valid before proceeding',
        })
      }}
      onSubmit={() => {}}
    >
      {({ submitForm }) => (
        <div style={{ display: 'flex' }}>
          <div style={{ height: '100svh' }}>
            <Sidebar value="games" onChange={console.log}>
              <Sidebar.Header>
                <svg fill="none" viewBox="0 0 80 80" width="40" height="40">
                  <path
                    d="m60.822 26.3984-19.0829 19.0829h-19.0829l19.0829-19.0829z"
                    fill="#4b41ff"
                  ></path>
                  <path
                    d="m65.3125 45.481-19.0829 19.0828h-23.5734l19.0829-19.0828z"
                    fill="#ff1f85"
                  ></path>
                  <path
                    d="m41.7391 8.4375-19.0829 19.0829v17.9606l19.0829-19.0829z"
                    fill="#008cff"
                  ></path>
                </svg>
              </Sidebar.Header>
              <Sidebar.Items>
                <Sidebar.Group title="Content management">
                  <Sidebar.Item value="games" icon="columns">
                    Games
                  </Sidebar.Item>
                </Sidebar.Group>
              </Sidebar.Items>
            </Sidebar>
          </div>
          <div
            style={{
              width: '100%',
              height: '100svh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <AppHeader>
              <AppHeader.Title>Create Game</AppHeader.Title>
              <AppHeader.Right>
                <Button onClick={submitForm}>Save changes</Button>
              </AppHeader.Right>
            </AppHeader>
            <div
              style={{
                display: 'flex',
                height: `calc(100vh - 68px)`,
              }}
            >
              <ScrollArea
                style={{
                  background: colors.neutral5,
                }}
              >
                <div
                  style={{
                    padding: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 32,
                    maxWidth: 600,
                    width: '100%',
                    height: '100%',
                    margin: '0 auto',
                  }}
                >
                  <Form.Fields fullScreen />
                </div>
              </ScrollArea>
              <Form.Sidebar />
            </div>
          </div>
        </div>
      )}
    </Form>
  )
}

export const Async = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    setInterval(() => {
      setData((p) => ({
        ...p,
        async: crypto.randomUUID(),
        rich: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${crypto.randomUUID()}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
      }))
    }, 1000)
  }, [])

  return (
    <Form
      initialValues={data}
      fields={{
        normal: { type: 'text', label: 'Normal' },
        async: { type: 'text', label: 'AsyncDynamicValue' },
        rich: { type: 'richtext', label: 'Test' },
      }}
      validate={async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('foo')
          }, 1000)
        })

        return {}
      }}
      onSubmit={async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('foo')
          }, 2000)
        })
      }}
    >
      {({
        submitForm,
        resetForm,
        validateForm,
        isSubmitting,
        isValidating,
        isDirty,
      }) => (
        <>
          <Form.Fields />
          <div
            style={{
              display: 'flex',
              gap: 16,
              paddingTop: 16,
            }}
          >
            <Button disabled={isSubmitting} onClick={resetForm} variant="ghost">
              Reset
            </Button>
            <Button
              disabled={isSubmitting}
              loading={isValidating}
              onClick={validateForm}
              variant="border"
            >
              Validate
            </Button>
            <div style={{ marginLeft: 'auto' }}>
              <Button
                disabled={isSubmitting || !isDirty}
                loading={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  )
}

import React, { FC } from 'react'
import { styled, Input, Badge, Toggle } from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { FileUploadContentEditor } from './FileUploadContentEditor'
import { BOTTOMSPACE } from './constants'

export const ContentEditor: FC<{
  data: { [key: string]: any }
  state: { [key: string]: any }
  fields: { [key: string]: any }
  // fields: {
  //   key: string
  //   meta?: string
  //   name?: string
  //   type: string
  //   mimeType?
  // }[]
  setState: (state: { [key: string]: any }) => void
}> = ({ data, fields, setState, state }) => {
  console.log('data??', data, fields, state)

  console.log('THE FIELDS??', fields)

  return (
    <styled.div style={{ maxWidth: 742, margin: '48px auto' }}>
      {fields?.map((item, i) => (
        <ContentRenderer
          state={state}
          setState={setState}
          data={data}
          item={item}
          itemValue={data[item.key]}
          key={i}
        />
      ))}
    </styled.div>
  )
}

const ContentRenderer: FC<{
  item: { [key: string]: any }
  //   title?: string
  //   type: string
  //   meta?: any
  //   key: string
  //   mimeTypeKey?: string
  //   description?: string
  // }
  itemValue: any
  data: any
  state: { [key: string]: any }
  setState: (state: { [key: string]: any }) => void
}> = ({ item, itemValue, setState, state, data }) => {
  // const { type, meta, key, mimeTypeKey } = item
  // const name = item.title ?? key

  const onChange = (v: any) => {
    setState({ ...state, [key]: v })
  }

  if (item.type === 'boolean') {
    return (
      <Toggle
        label={item.title}
        description={item.description}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        onChange={onChange}
        indent
      />
    )
  }

  if (item.type === 'digest') {
    return (
      <Input
        label={item.title}
        type="digest"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (item.type === 'email') {
    return (
      <Input
        label={item.title}
        type="email"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (item.meta?.type === 'file') {
    return (
      <FileUploadContentEditor
        data={data}
        item={item}
        name={item.title}
        state={state}
        onChange={onChange}
      />
    )
  }

  if (item.type === 'id') {
    return <Badge>{itemValue}</Badge>
  }

  if (item.type === 'json') {
    return (
      <Input
        label={item.title}
        type="json"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (item.meta?.format === 'markdown') {
    return (
      <Input
        label={item.title}
        type="markdown"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (item.type === 'number') {
    return (
      <Input
        label={item.title}
        type="number"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (item.type === 'string' || item.type === 'text') {
    return (
      <Input
        label={item.title}
        description={item.description}
        type="text"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (item.type === 'url') {
    return (
      <Input
        label={item.title}
        type="url"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (item.type === 'type') {
    return (
      <InputWrapper
        label={item.title}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        value=""
      >
        <Badge>{itemValue}</Badge>
      </InputWrapper>
    )
  }

  if (item.type === 'timestamp') {
    return (
      <Input
        label={item.title}
        type="date"
        time
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        descriptionBottom={new Date(itemValue).toString()}
        indent
      />
    )
  }

  if (item.type === 'reference') {
    return (
      <Input
        label={item.title}
        type="text"
        placeholder="Referenced ID"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE, width: 150 }}
        indent
      />
    )
  }

  return (
    <styled.div style={{ marginBottom: 12 }}>
      {name + ' : ' + item.type}
    </styled.div>
  )
}

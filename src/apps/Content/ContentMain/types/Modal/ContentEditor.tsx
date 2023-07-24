import React, { FC } from 'react'
import { styled, Input, Badge, Toggle } from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { FileUploadContentEditor } from './FileUploadContentEditor'
import { BOTTOMSPACE } from './constants'

export const ContentEditor: FC<{
  data: { [key: string]: any }
  state: { [key: string]: any }
  fields: {
    key: string
    meta?: string
    name?: string
    type: string
    mimeType?
  }[]
  setState: (state: { [key: string]: any }) => void
}> = ({ data, fields, setState, state }) => {
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
  item: {
    name?: string
    type: string
    meta?: any
    key: string
    mimeTypeKey?: string
  }
  itemValue: any
  data: any
  state: { [key: string]: any }
  setState: (state: { [key: string]: any }) => void
}> = ({ item, itemValue, setState, state, data }) => {
  const { type, meta, key, mimeTypeKey } = item
  const name = item.name ?? key

  const onChange = (v: any) => {
    setState({ ...state, [key]: v })
  }

  if (type === 'boolean') {
    return (
      <Toggle
        description={meta?.description}
        label={name}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        onChange={onChange}
        indent
      />
    )
  }

  if (type === 'digest') {
    return (
      <Input
        label={name}
        type="digest"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'email') {
    return (
      <Input
        label={name}
        type="email"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (meta?.type === 'file' || mimeTypeKey) {
    return (
      <FileUploadContentEditor
        data={data}
        item={item}
        name={name}
        state={state}
        onChange={onChange}
      />
    )
  }

  if (type === 'id') {
    return <Badge>{itemValue}</Badge>
  }

  if (type === 'json') {
    return (
      <Input
        label={name}
        type="json"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (meta?.format === 'markdown') {
    return (
      <Input
        label={name}
        type="markdown"
        value={itemValue}
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'number') {
    return (
      <Input
        label={name}
        type="number"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'string' || type === 'text') {
    return (
      <Input
        label={name}
        type="text"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'url') {
    return (
      <Input
        label={name}
        type="url"
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'type') {
    return (
      <InputWrapper
        label={name}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        value=""
      >
        <Badge>{itemValue}</Badge>
      </InputWrapper>
    )
  }

  if (type === 'timestamp') {
    return (
      <Input
        label={name}
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

  if (type === 'reference') {
    return (
      <Input
        label={name}
        type="text"
        placeholder={'Referenced ID'}
        onChange={onChange}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE, width: 150 }}
        indent
      />
    )
  }

  return (
    <styled.div style={{ marginBottom: 12 }}>{name + ' : ' + type}</styled.div>
  )
}

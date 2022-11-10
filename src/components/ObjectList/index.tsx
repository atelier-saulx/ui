import React, { CSSProperties, useState } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, EditIcon } from '~'
import { Space } from '~/types'
import { ObjectListModal } from './ObjectModal'

type ObjectListProps = {
  label?: string
  space?: Space
  description?: string
  descriptionBottom?: string
  style?: CSSProperties
  indent?: boolean
  schema?: any
}

export const ObjectList = ({
  label,
  description,
  descriptionBottom,
  space,
  indent,
  style,
  schema,
  ...props
}: ObjectListProps) => {
  const [showModal, setShowModal] = useState(false)

  console.log('SCHMA', schema)

  const openObjectHandler = () => {
    setShowModal(true)
  }

  return (
    <>
      <InputWrapper
        indent={indent}
        style={style}
        descriptionBottom={descriptionBottom}
        space={space}
      >
        <Label
          label={label}
          description={description}
          style={{ marginBottom: 12 }}
        />

        <Button icon={EditIcon} ghost onClick={openObjectHandler}>
          Edit object
        </Button>
      </InputWrapper>
      {showModal && (
        <ObjectListModal
          label={label}
          props={props}
          schema={schema}
          setShowModal={setShowModal}
        />
      )}
    </>
  )
}

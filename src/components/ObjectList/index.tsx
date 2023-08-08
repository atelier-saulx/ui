import React, { CSSProperties, useState } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, EditIcon, Badge } from '~'

type ObjectListProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  style?: CSSProperties
  indent?: boolean
  objectProperties?: any
  onClick?: () => void
}

export const ObjectList = ({
  label,
  description,
  descriptionBottom,
  indent,
  style,
  objectProperties,
  onClick,
}: /// ...props
ObjectListProps) => {
  // console.log(objectProperties, 'NANI>>')

  const [insideObjectFields] = useState(objectProperties)

  return (
    <>
      <InputWrapper
        indent={indent}
        style={style}
        descriptionBottom={descriptionBottom}
        hideClearButton
      >
        <Label
          label={label}
          description={description}
          style={{ marginBottom: 12 }}
        />

        {/* <InputWrapper
          indent={indent}
          style={{ marginBottom: 12 }}
          hideClearButton
        >
          {/* some small indication of what is in the object let say one level deep per object 
          may need to set limit after certain amount ?? TODO */}
        {/* {Object.keys(insideObjectFields).map((objectKey, idx) => (
            <div key={idx} style={{ display: 'flex', marginBottom: 4 }}>
              {objectKey}
              <Badge style={{ marginLeft: 8 }} boxed ghost outline>
                {insideObjectFields[objectKey].type}
              </Badge>
            </div>
          ))} 
        </InputWrapper> */}

        <Button icon={EditIcon} ghost onClick={onClick} color="accent">
          Edit object
        </Button>
      </InputWrapper>
    </>
  )
}

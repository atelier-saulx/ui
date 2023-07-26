import React, { useEffect, useState } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { EditIcon, AddIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { Badge } from '~/components/Badge'
import { useDialog } from '~/components/Dialog'
import { addSingleRecordItem } from './AddSingleRecordItem'
import { Style, color } from '~'

type RecordListProps = {
  label?: string
  description?: string
  recordType?: any
  value?: {}
  onClick?: () => void
  onChange?: (value: any) => void
  style?: Style
  indent?: boolean
}

export const RecordList = ({
  label,
  description,
  recordType,
  value,
  onClick,
  onChange,
  style,
  indent,
}: // ...props
RecordListProps) => {
  const { open } = useDialog()
  const [tempObj, setTempObj] = useState({})

  const itemType = recordType

  useEffect(() => {
    setTempObj(value)
  }, [value])

  const addItemHandler = async () => {
    addSingleRecordItem(tempObj, setTempObj, itemType, onChange, open)
  }

  return (
    <InputWrapper
      style={{ ...style }}
      descriptionBottom={description}
      indent={indent}
      hideClearButton
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <Text weight={500} size={14}>
          {label}
        </Text>
        <Badge style={{ marginLeft: 8 }}>{itemType}</Badge>
      </div>
      <InputWrapper indent style={{ marginBottom: 12 }} hideClearButton>
        {tempObj &&
          Object.keys(tempObj).map((ObjKey, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                marginBottom: 8,
                paddingBottom: 8,
                borderRadius: 4,
                borderBottom: `1px solid ${color('border')}`,
              }}
            >
              <Text weight={600} style={{ width: 134 }}>
                {ObjKey}:{' '}
              </Text>
              <Text style={{ marginLeft: 6 }}>
                {itemType === 'digest'
                  ? tempObj[ObjKey].toString().substring(0, 6) + '...'
                  : tempObj[ObjKey]}
              </Text>
            </div>
          ))}
      </InputWrapper>

      <div style={{ display: 'flex', gap: 16 }}>
        <Button ghost icon={AddIcon} onClick={addItemHandler}>
          Add {itemType}
        </Button>

        {value && (
          <Button ghost icon={EditIcon} onClick={onClick}>
            Edit Record
          </Button>
        )}
      </div>
    </InputWrapper>
  )
}

import React, { FC, Fragment, useState } from 'react'
import {
  useDialog,
  Text,
  removeOverlay,
  Label,
  Thumbnail,
  Grid,
  Input,
  SearchIcon,
  Row,
  color,
} from '~'
import { color as colorFn } from '~/utils'
import { styled } from 'inlines'
import { FieldModal } from '../FieldModal'
import { groups, FieldTemplates, templates } from '../templates'

const Section = styled('div', {
  marginTop: 20,
  display: 'flex',
  marginLeft: 14,
  flexWrap: 'wrap',
  marginBottom: 10,
})

const Template = ({ template, type, field }) => {
  const { label, description, icon, color } = templates[template]
  const { open } = useDialog()

  return (
    <Row
      onClick={() => {
        removeOverlay()
        open(<FieldModal type={type} template={template} path={field} />)
      }}
      style={{
        borderRadius: 8,
        cursor: 'pointer',
        marginBottom: 3,
        marginLeft: 6,
        marginRight: 6,
        userSelect: 'none',
        width: 284,
        padding: '8px 16px',
        '@media (hover: hover)': {
          '&:hover': {
            background: colorFn('border'),
          },
        },
      }}
    >
      <Thumbnail
        outline
        size={32}
        icon={icon}
        color={color}
        style={{
          marginRight: 16,
        }}
      />
      <Label label={label} description={description} />
    </Row>
  )
}

export const SelectFieldTypeModal: FC<{
  type: string
  field?: string[]
}> = ({ type, field = [] }) => {
  const [filteredItems, setFilteredItems] = useState<string[]>(null)

  const searchFilterHandler = (value: string) => {
    if (value === '') {
      setFilteredItems(null)
      return
    }
    const filteredArr = []
    for (const header in groups) {
      if (header === 'System') {
        continue
      }
      for (const template in groups[header]) {
        if (template.toLowerCase().includes(value.toLowerCase())) {
          filteredArr.push(template)
        }
      }
    }
    setFilteredItems(filteredArr)
  }

  return (
    <div>
      <Input
        type="text"
        icon={<SearchIcon />}
        placeholder="Search and discover"
        onChange={searchFilterHandler}
        ghost
        style={{
          backgroundColor: color('background2'),
          boxShadow: '0px',
          outline: 'none',
          height: 40,
          alignItems: 'center',
          borderRadius: 8,
          paddingTop: '6px',
          paddingBottom: '6px',
          marginLeft: 24,
          marginRight: 24,
          marginTop: 20,
          marginBottom: 0,
        }}
      />
      <Section>
        <Grid
          style={{
            marginBottom: 20,
            padding: 0,
            marginLeft: 0,
          }}
          gap={5}
          itemWidth={234}
        >
          {filteredItems
            ? filteredItems.map((template: FieldTemplates) => {
                // put template
                return (
                  <Template
                    key={template}
                    type={type}
                    field={field}
                    template={template}
                  />
                )
              })
            : Object.keys(groups)
                .filter((t) => t !== 'System')
                .map((header) => {
                  return (
                    <Fragment key={header}>
                      <Text
                        color="text2"
                        style={{
                          paddingLeft: 20,
                          marginTop: 12,
                          marginBottom: 12,
                        }}
                      >
                        {header}
                      </Text>
                      {Object.keys(groups[header]).map(
                        (template: FieldTemplates) => {
                          // put template
                          return (
                            <Template
                              key={template}
                              type={type}
                              field={field}
                              template={template}
                            />
                          )
                        }
                      )}
                    </Fragment>
                  )
                })}
        </Grid>
      </Section>
    </div>
  )
}

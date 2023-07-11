import React from 'react'
import { styled } from 'inlines'
import { color } from '~/utils'
import { Button } from '~/components/Button'
import { Avatar } from '~/components/Avatar'
import { BasedIcon, Text, Input, SearchIcon, Thumbnail, Row } from '~'
import { useClient } from '@based/react'

const StyledSchemaTopbar = styled('div', {
  height: 64,
  minHeight: 64,
  paddingLeft: 14,
  paddingRight: 14,
  backgroundColor: color('background'),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${color('border')}`,
})

export const SchemaTopbar = () => {
  const client = useClient()
  const { opts = {} } = client

  return (
    <StyledSchemaTopbar>
      <Row style={{ gap: 12 }}>
        <Thumbnail
          size={40}
          label={opts.project}
          style={{
            borderRadius: 12,
            boxShadow: '0px 2px 8px rgba(15, 16, 19, 0.06)',
          }}
        />
        <div>
          <Text
            color="text"
            weight={600}
            size="16px"
            style={{ lineHeight: '20px' }}
          >
            {opts.project}
          </Text>
          <Text color="accent" weight={600} size="14px">
            {opts.env}
          </Text>
        </div>
      </Row>
      <styled.div style={{ maxWidth: 492, width: '100%' }}>
        <Input
          type="text"
          placeholder="Search & navigate"
          ghost
          icon={SearchIcon}
          style={{
            backgroundColor: color('background2'),
            boxShadow: '0px',
            outline: 'none',
            height: 40,
            alignItems: 'center',
            borderRadius: 8,
            paddingTop: '8px',
            paddingBottom: '6px',
          }}
        />
      </styled.div>
      <Row style={{ gap: 16 }}>
        <Button ghost color="text2">
          Changelog
        </Button>
        <Button
          color="lightaction"
          outline
          style={{
            '@media (hover: hover)': {
              '&:hover': {
                backgroundColor: color('lightaction:hover'),
                boxShadow: '0px 2px 4px rgba(156, 156, 156, 0.08)',
              },
            },
          }}
        >
          Documentation
        </Button>
        <Avatar icon={BasedIcon} />
      </Row>
    </StyledSchemaTopbar>
  )
}

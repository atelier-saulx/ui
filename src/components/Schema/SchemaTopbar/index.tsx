import React from 'react'
import { styled } from 'inlines'
import { color } from '~/utils'
import { Button } from '~/components/Button'
import { Avatar } from '~/components/Avatar'
import { BasedIcon, Text, Input, SearchIcon, Thumbnail } from '~'
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
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
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
      </div>
      <div style={{ maxWidth: 492, width: '100%' }}>
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
            paddingBottom: '6px',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
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
      </div>
    </StyledSchemaTopbar>
  )
}

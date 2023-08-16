import React, { ReactNode, FC } from 'react'
import { styled } from 'inlines'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'

import * as types from '../types'

type PreviewerProps = {
  component?: ReactNode
  // types prop
  propsName?: string
}

export const Previewer: FC<PreviewerProps> = ({ component, propsName }) => {
  console.log('Previewer -->', component)
  console.log('propsname -->', propsName)

  console.log('--> name ', component.type.name)

  return (
    <styled.div style={{ padding: 20, border: '1px solid green' }}>
      {renderOrCreateElement(component, { size: 18, color: 'brand' })}
    </styled.div>
  )
}

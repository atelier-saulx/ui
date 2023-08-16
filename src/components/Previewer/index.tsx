import React, { ReactNode, FC, useState, useEffect } from 'react'
import { styled } from 'inlines'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'

import * as typeprops from '../props.json'

type PreviewerProps = {
  component?: ReactNode
  // types prop
  propsName?: string
}

export const Previewer: FC<PreviewerProps> = ({ component, propsName }) => {
  const [propState, setPropState] = useState({})

  console.log('Previewer -->', component)
  console.log('propsname -->', typeprops.props[propsName])

  const componentProps = typeprops.props[propsName].props

  console.log('componentProps ', componentProps)

  useEffect(() => {
    const newObj = {}

    let ObjPropKeys = Object.keys(componentProps)

    ObjPropKeys.map((item, idx) =>
      component.props[item]
        ? (newObj[item] = component.props[item])
        : (newObj[item] = null)
    )

    console.log('🛍', ObjPropKeys)
    console.log('🧧', newObj)

    setPropState(newObj)
  }, [])

  // TODO set the props in a state
  // generate controls based of the props --> with right values/ options

  return (
    <styled.div style={{ padding: 20, border: '1px solid green' }}>
      {renderOrCreateElement(component, { propState })}
    </styled.div>
  )
}

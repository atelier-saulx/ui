import React, { ReactNode, FC, useState, useEffect } from 'react'
import { styled } from 'inlines'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'

import * as typeprops from '../props.json'
import { Controls } from './Controls'

type PreviewerProps = {
  component?: ReactNode
  // types prop
  propsName?: string
}

export const Previewer: FC<PreviewerProps> = ({ component, propsName }) => {
  const [propState, setPropState] = useState({})
  const [renderCounter, setRenderCounter] = useState(1)

  // console.log('Previewer -->', component)
  // console.log('propsname -->', typeprops.props[propsName])

  const componentProps = typeprops.props[propsName].props

  // console.log('componentProps ', componentProps)

  useEffect(() => {
    const newObj = {}

    let ObjPropKeys = Object.keys(componentProps)

    ObjPropKeys.map((item, idx) =>
      component.props[item]
        ? (propState[item] = component.props[item])
        : (propState[item] = null)
    )

    // console.log('🛍', ObjPropKeys)
    // console.log('🧧', newObj)

    setPropState((newObj) => ({ ...newObj }))
  }, [])

  useEffect(() => {
    setRenderCounter(renderCounter + 1)
    // console.log('🧛🏻', renderCounter)
  }, [propState])

  // console.log('why?? propstate ', propState)
  // TODO set the props in a state
  // probably make Controls component
  // generate controls based of the props --> with right values/ options

  // filter out null from propState before passing it in renderElement
  const removeNullUndefined = (obj) =>
    Object.entries(obj).reduce(
      (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
      {}
    )

  let filteredNullPropState = removeNullUndefined(propState)
  // console.log('🥷🏻', filteredNullPropState)

  return (
    <styled.div style={{ padding: 20, border: '1px solid green' }}>
      <styled.div style={{ display: 'flex' }}>
        <styled.div
          style={{
            backgroundColor: '#f5f5f5',
            padding: 64,
            minWidth: 240,
            textAlign: 'center',
          }}
        >
          {renderCounter &&
            renderOrCreateElement(component, filteredNullPropState)}
        </styled.div>

        <Controls
          componentProps={componentProps}
          propState={propState}
          setPropState={setPropState}
        />
      </styled.div>
    </styled.div>
  )
}

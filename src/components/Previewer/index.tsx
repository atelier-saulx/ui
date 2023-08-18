import React, { ReactNode, FC, useState, useEffect } from 'react'
import { styled } from 'inlines'
import { renderOrCreateElement } from '../../../src/utils/renderOrCreateElement'
import { Code } from '../Code'

import * as typeprops from '../props.json'
import { Controls } from './Controls'

type PreviewerProps = {
  component?: ReactNode
  // types prop
  propsName?: string
}

export const Previewer: FC<PreviewerProps> = ({ component, propsName }) => {
  const [propState, setPropState] = useState(component.props)
  const [codeString, setCodeString] = useState('')
  const [renderCounter, setRenderCounter] = useState(1)

  const componentProps = typeprops.props[propsName].props

  console.log('Previewer -->', component)
  console.log('propsname -->', typeprops.props[propsName])

  console.log('componentProps ', componentProps)

  useEffect(() => {
    setRenderCounter(renderCounter + 1)
  }, [propState])

  const makeReactCode = (obj, propsName) => {
    let finalString = ''
    let children = ''

    //get component name from propsName
    let tempStrIndex = propsName.indexOf('Props')
    let compName = propsName.substring(0, tempStrIndex)

    console.log('🦄 -->', compName)
    // from this obj make react valid code preview
    finalString += `<${compName}`

    for (const key in obj) {
      console.log(key, '=', obj[key])
      if (key === 'children') {
        children += `\n  ${obj[key]} \n`
      } else if (typeof obj[key] === 'string') {
        finalString += ` ${key}="${obj[key]}"`
      } else if (typeof obj[key] === 'number') {
        finalString += ` ${key}={${obj[key]}}`
      } else if (typeof obj[key] === 'boolean') {
        finalString += ` ${key}`
      }
    }

    finalString += children ? `>${children}</${compName}>` : `/>`

    console.log('final countdownie -->', finalString)

    return finalString
  }

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
          {renderCounter && renderOrCreateElement(component, propState)}
        </styled.div>

        <Controls
          componentProps={componentProps}
          propState={propState}
          setPropState={setPropState}
        />

        <styled.div style={{ backgroundColor: '#f5f5f5' }}>
          <Code value={makeReactCode(propState, propsName)} />
        </styled.div>
      </styled.div>
    </styled.div>
  )
}

import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Input } from '../../../Input'
import { styled } from 'inlines'
import { Row } from '../../../Styled'
import { color } from '../../../../varsUtilities'

const WhiteSpaceComp = (data) => {
  const [space, setSpace] = useState(data.value.space)
  const [spaceFormat, setSpaceFormat] = useState(data.value.spaceFormat)

  console.log(data, 'from WhiteSpaceComp ??')
  console.log(`${space} ${spaceFormat}`)

  return (
    <>
      <styled.div
        style={{
          width: '100%',
          background: color('action', 'neutral', 'subtleHover'),
          height: `${space}${spaceFormat}`,
          borderTop: `1px dashed ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
          borderBottom: `1px dashed ${color(
            'inputBorder',
            'neutralNormal',
            'default'
          )}`,
        }}
      />

      <Row style={{ gap: 16, marginBottom: 12, marginTop: 12, maxWidth: 242 }}>
        <Input
          label="Add Space"
          type="number"
          value={space}
          onChange={(v) => {
            setSpace(v)
          }}
          placeholder={'enter your desired space distance...'}
        />
        <Input
          type="select"
          label="Format"
          value={spaceFormat}
          onChange={(v) => setSpaceFormat(v)}
          options={[
            { label: 'px', value: 'px' },
            { label: '%', value: '%' },
            { label: 'rem', value: 'rem' },
            { label: 'vh', value: 'vh' },
          ]}
        />
      </Row>
    </>
  )
}

export default class WhiteSpace extends React.Component {
  static get toolbox() {
    return {
      title: 'Space',
      icon: `<svg width="16" height="16" viewBox="-2 -2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.75C1 1.33579 1.33579 1 1.75 1H18.25C18.6642 1 19 1.33579 19 1.75C19 2.16421 18.6642 2.5 18.25 2.5H1.75C1.33579 2.5 1 2.16421 1 1.75ZM10 6.75C10.4142 6.75 10.75 7.08579 10.75 7.5V9.25H12.5C12.9142 9.25 13.25 9.58579 13.25 10C13.25 10.4142 12.9142 10.75 12.5 10.75H10.75V12.5C10.75 12.9142 10.4142 13.25 10 13.25C9.58579 13.25 9.25 12.9142 9.25 12.5V10.75H7.5C7.08579 10.75 6.75 10.4142 6.75 10C6.75 9.58579 7.08579 9.25 7.5 9.25H9.25V7.5C9.25 7.08579 9.58579 6.75 10 6.75ZM1.75 8C2.16422 8 2.5 8.33579 2.5 8.75L2.5 11.25C2.5 11.6642 2.16422 12 1.75 12C1.33579 12 1 11.6642 1 11.25L1 8.75C1 8.33579 1.33579 8 1.75 8ZM18.25 8C18.6642 8 19 8.33579 19 8.75V11.25C19 11.6642 18.6642 12 18.25 12C17.8358 12 17.5 11.6642 17.5 11.25V8.75C17.5 8.33579 17.8358 8 18.25 8ZM1.75 14C2.16422 14 2.5 14.3358 2.5 14.75V16.65C2.5 16.9424 2.50059 17.1166 2.51114 17.2457C2.51757 17.3245 2.52607 17.3577 2.52883 17.3665C2.55234 17.4112 2.58882 17.4477 2.63346 17.4712C2.64234 17.4739 2.67546 17.4824 2.75428 17.4889C2.88341 17.4994 3.0576 17.5 3.35 17.5H5.25C5.66422 17.5 6 17.8358 6 18.25C6 18.6642 5.66422 19 5.25 19H3.32377C3.06629 19 2.82981 19 2.63213 18.9839C2.419 18.9665 2.18583 18.9266 1.95552 18.8093C1.62624 18.6415 1.35852 18.3738 1.19074 18.0445C1.07339 17.8142 1.03353 17.581 1.01612 17.3679C0.999966 17.1702 0.999983 16.9337 1 16.6762L1 14.75C1 14.3358 1.33579 14 1.75 14ZM2.63088 17.4703C2.63091 17.4703 2.63142 17.4704 2.63236 17.4708L2.63088 17.4703ZM2.52973 17.3691C2.52972 17.3692 2.52953 17.3687 2.52918 17.3676L2.52973 17.3691ZM18.25 14C18.6642 14 19 14.3358 19 14.75V16.6762C19 16.9337 19 17.1702 18.9839 17.3679C18.9665 17.581 18.9266 17.8142 18.8093 18.0445C18.6415 18.3738 18.3738 18.6415 18.0445 18.8093C17.8142 18.9266 17.581 18.9665 17.3679 18.9839C17.1702 19 16.9337 19 16.6762 19H14.75C14.3358 19 14 18.6642 14 18.25C14 17.8358 14.3358 17.5 14.75 17.5H16.65C16.9424 17.5 17.1166 17.4994 17.2457 17.4889C17.3245 17.4824 17.3577 17.4739 17.3665 17.4712C17.4112 17.4477 17.4477 17.4112 17.4712 17.3665C17.4739 17.3577 17.4824 17.3245 17.4889 17.2457C17.4994 17.1166 17.5 16.9424 17.5 16.65V14.75C17.5 14.3358 17.8358 14 18.25 14ZM17.3691 17.4703C17.3692 17.4703 17.3687 17.4705 17.3676 17.4708L17.3691 17.4703ZM8 18.25C8 17.8358 8.33579 17.5 8.75 17.5H11.25C11.6642 17.5 12 17.8358 12 18.25C12 18.6642 11.6642 19 11.25 19H8.75C8.33579 19 8 18.6642 8 18.25Z" fill="#1B242C"/>
      </svg>
      `,
    }
  }

  constructor({ data }, props) {
    super(props)
    this.data = {
      space: data.space || 0,
      spaceFormat: data.spaceFormat || 'px',
    }
  }

  render() {
    const container = document.createElement('div')

    createRoot(container).render(<WhiteSpaceComp value={this.data} />)

    return container
  }

  //check if savedata is not empty
  validate(savedData) {
    if (!savedData) {
      return false
    }
    return true
  }

  save(blockContent) {
    // space
    let inputFieldValue = blockContent.querySelector('input').value
    // space format

    return {
      space: inputFieldValue,
    }
  }
}

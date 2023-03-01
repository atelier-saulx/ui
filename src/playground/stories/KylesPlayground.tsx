import React from 'react'
// import React, { useState } from 'react'
// import { Text } from '~/components/Text'
// import { ColorPicker } from '~/components/ColorPicker'
// import { Button } from '~/components/Button'
// import { DateTimePicker } from '~/components/DateTimePicker'
// import { BarGraph } from '~/components/BarGraph'
// import { PieGraph } from '~/components/PieGraph'
// import { Code } from '~/components/Code'
// import { Page } from '~/components/Page'
// import { Tab, Tabs } from '~/components/Tabs'
// import { Separator } from '~/components/Separator'
// import { Drawer } from '~/components/Drawer'
import { Input } from '~/components/Input'
// import { ProgressBar } from '~/components/ProgressBar'
// import { Dialog } from '~/components/Dialog'
import { AudioIcon } from '~/icons/AudioIcon'
export const KylesPlayground = () => {
  // const [color, setColor] = useState('rgba(255,0,0,1)')
  // const [drawer, setDrawer] = useState(false)
  // const colorsOnly = color
  //   .substring(
  //     color.indexOf('(') + 1,

  //     color.lastIndexOf(')')
  //   )
  //   .split(/,\s*/)
  // // String.prototype.split() returns an Array,
  // // here we assign those Array-elements to the
  // // various colour-, or opacity-, variables:

  // const red = parseInt(colorsOnly[0])
  // const green = parseInt(colorsOnly[1])
  // const blue = parseInt(colorsOnly[2])
  // // const opacity = parseInt(colorsOnly[3])
  // const handleChange = (e) => {
  //   setColor(e)
  // }
  let width, height
  // const src = 'www.google.com'
  const paramsStart = ['h=' + undefined, 'w=' + undefined]
  const params = ['h=' + height, 'w=' + width]
  const newParams = []
  for (let i = 0; i < params.length; i++) {
    if (params[i] !== paramsStart[i]) {
      newParams.push(params[i])
    }
  }
  console.log(newParams)
  // join() with & inbetween
  return (
    <div>
      <Input
        type="text"
        multiline
        indent
        onChange={(e) => console.log(e)}
        icon={<AudioIcon />}
        label="asdfasdf"
      />
      {/* <Dialog label="Image Options">
        <Text color="text2" space>
          ImgX parameters
        </Text>
        <Text color="text2" wrap space>
          This is your organization’s name within Based. For example, you can
          use the name of your company or department.
        </Text>
        <Input type="text" disabled value={src + newParams.join('&')} />
        <Input type="number"></Input>
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm />
        </Dialog.Buttons>
      </Dialog> */}
    </div>
  )
}
//  not everything in the bar chart be set to 100% based on highest value,
// if there is only 1 value per set u still have to put it in an object or the color will just be default
// if you move the color picker too fast it gives a weird value

/* <Button onClick={() => setDrawer(true)}>asdasd</Button>
  <Drawer
    label="Label"
    isRendered={drawer}
    closeFunc={() => setDrawer(false)}
    sidebar
    // style={{ backgroundColor: 'red' }}
    fullscreen
  >
    <Tabs activeTab={0} sameHeight>
      <Tab label="Colors">
        <Page>
          <Text capitalize style={{ color: color }}>
            Anime girls
          </Text>
          <ProgressBar progress={0} />
          <Input type="password" onChange={(v) => console.info(v)} />
          <ColorPicker onChange={handleChange} />
          <Separator />
          <BarGraph
            scale={255}
            data={[
              { label: 'red', value: { red }, color: '#FF0000' },
              { label: 'green', value: { green }, color: '#00FF00' },
              { label: 'blue', value: { blue }, color: '#0000FF' },
            ]}
          />
          <PieGraph
            data={[
              { label: 'red', value: { red }, color: '#FF0000' },
              { label: 'green', value: { green }, color: '#00FF00' },
              { label: 'blue', value: { blue }, color: '#0000FF' },
            ]}
          />
        </Page>
      </Tab>
      <Tab label="Other stuff">
        <Page>
          <Button ghost>Get Anime Girls</Button>
          <Code value="console.log('hello world')" />
          <Page>asd;lfkjasdlfkjasdlkf</Page>
          <DateTimePicker
            label="Date Range"
            dateRange
            descriptionBottom="Onchange (e) returns value in milliseconds"
            onChange={(e3) => console.log(e3)}
            indent
            space="32px"
            style={{
              marginBottom: 420,
            }}
            onClose={() => console.log('Closed dateRange picker ??')}
          />
        </Page>
      </Tab>
    </Tabs>
  </Drawer> */

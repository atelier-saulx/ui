import React from 'react'
import { Accordion, Text } from '../../src'
import props from '../props.json'
import { ComponentDef } from '../types'

const example: ComponentDef = {
  name: 'Accordion',
  properties: props.props.AccordionProps.props,
  component: Accordion,
  description: 'Accordions to annoy ppl with on the street',
  examples: [
    {
      props: { active: 1 },
      customRenderer: (props) => {
        return (
          <Accordion
            active={props.active}
            style={{ width: 374 }}
            data={[
              { title: 'Accordion 1', children: 'thingy one' },
              { title: 'Accordion 2', children: 'thingy two' },
              { title: 'Accordion 3', children: 'thingy three' },
            ]}
          />
        )
      },
    },
    {
      props: {},
      customRenderer: () => {
        return (
          <Accordion
            style={{ width: 374 }}
            active={[0, 2]}
            data={[
              {
                title: 'Accordion 1',
                children:
                  'this is a looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong word',
              },
              { title: 'Accordion 2', children: 'thingy two' },
              { title: 'Accordion 3', children: 'thingy three' },
            ]}
          />
        )
      },
    },
  ],
}

export default example

import { useContext, useEffect, useState } from 'react'
import { FormContext } from './Form.js'
import { Sidebar } from '../Sidebar/index.js'

type FormSidebarProps = {}

// TODO add customizable description and icon
// TODO scroll into view when clicking on an item
// TODO auto updating active based on scroll position
function FormSidebar(props: FormSidebarProps) {
  const [active, setActive] = useState<string>()
  const ctx = useContext(FormContext)

  if (!ctx) {
    throw new Error('missing form context')
  }

  const { groups } = ctx

  useEffect(() => {
    if (!active) {
      setActive(groups[0].label)
    }
  }, [groups])

  return (
    <Sidebar side="right" value={active} onChange={setActive}>
      <Sidebar.Items>
        <Sidebar.Group title="Sections">
          {groups.map((group) => (
            <Sidebar.Item
              key={group.label}
              value={group.label}
              icon={group.icon}
              description={group.description}
            >
              {group.label}
            </Sidebar.Item>
          ))}
        </Sidebar.Group>
      </Sidebar.Items>
    </Sidebar>
  )
}

export { FormSidebar }
export type { FormSidebarProps }

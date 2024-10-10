import { useContext, useEffect, useRef, useState } from 'react'
import { FormContext } from './Form.js'
import { Sidebar } from '../Sidebar/index.js'

type FormSidebarProps = {}

function FormSidebar(props: FormSidebarProps) {
  const [active, setActive] = useState<string>()
  const ctx = useContext(FormContext)

  if (!ctx) {
    throw new Error('missing form context')
  }

  const { groups } = ctx

  useEffect(() => {
    const ratios: { [key: string]: number } = {}

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios[entry.target.id.split('_').pop()] = entry.intersectionRatio
        }

        const max = Math.max(...Object.values(ratios))
        const maxKey = Object.entries(ratios).findLast(
          ([, value]) => value === max,
        )[0]
        setActive(maxKey)
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      },
    )

    for (const group of groups) {
      const element = document.getElementById(
        `_form_field_group_${group.label}`,
      )

      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Sidebar
      side="right"
      value={active}
      onChange={(value) => {
        document.getElementById(`_form_field_group_${value}`)?.scrollIntoView()
      }}
    >
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

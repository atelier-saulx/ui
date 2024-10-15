import React from 'react'
import { CalendarViewItem } from './CalendarViewItem.js'

export default {
  title: 'CalendarViewItem',
  component: CalendarViewItem,
}

export const Default = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(4, auto)',
      }}
    >
      {([undefined, 'start', 'middle', 'end'] as const).map((position) =>
        (['neutral', 'green', 'blue', 'orange', 'red'] as const).map((color) =>
          ([false, true] as const).map((repeating) =>
            ([undefined, 'Description'] as const).map((description) => (
              <CalendarViewItem
                repeating={repeating}
                position={position}
                color={color}
                description={description}
                title="Title"
                onClick={() => {}}
              />
            )),
          ),
        ),
      )}
    </div>
  ),
}

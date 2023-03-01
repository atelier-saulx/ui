import React from 'react'
import {
  Button,
  ContextItem,
  ContextDivider,
  ScheduleIcon,
  MoreIcon,
  Dialog,
  useContextMenu,
  useDialog,
  color,
  DeleteIcon,
  DuplicateIcon,
} from '~'

export const ContextMenus = () => {
  return (
    <div>
      <Button
        style={{ marginBottom: 24 }}
        onClick={useContextMenu(DoubleOverlayMenu, { flap: 1 })}
      >
        Menu (double overlays)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'center' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: center)
      </Button>

      {/* make nice with it */}
      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'left' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: left)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'right' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: right)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { position: 'top' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (position: top)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { position: 'left' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (position: left)
      </Button>

      <Button
        onClick={useContextMenu(SimpleMenu, {}, { position: 'right' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (position: right)
      </Button>

      <Button
        onClick={useContextMenu(
          SimpleMenu,
          {},
          {
            position: 'left',
            variant: 'over',
            style: {
              border: `3px solid ${color('accent')}`,
              borderRadius: 0,
            },
          }
        )}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (variant: over / position: left) css override
      </Button>

      <Button
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { variant: 'over', placement: 'left' }
        )}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (variant: over / placement: left)
      </Button>

      <Button
        style={{
          marginBottom: 24,
        }}
        onClick={useContextMenu(LargeMenu)}
      >
        Menu (large menu)
      </Button>
      <Button
        space
        onClick={useContextMenu(DoubleOverlayMenu, { props: { flap: 1 } })}
      >
        Menu (double overlays)
      </Button>

      <Button onClick={useContextMenu(TestMenu, { props: { flap: 1 } })}>
        Test
      </Button>
    </div>
  )
}

const DoubleOverlayMenu = () => {
  return (
    <>
      <ContextItem onClick={() => {}}>Keep it 💯!!</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem onClick={() => {}}>Keep it 💯</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { position: 'right', offset: { x: -20, y: 10 } }
        )}
      >
        Keep it 💯
      </ContextItem>
      <ContextItem
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { position: 'left', offset: { x: 20, y: 10 } }
        )}
      >
        yes + offset
      </ContextItem>
      <ContextItem
        iconRight={ScheduleIcon}
        onClick={useContextMenu(LargeMenu, {}, { position: 'left' })}
      >
        Click me!
      </ContextItem>
    </>
  )
}

const SimpleMenu = () => {
  const dialog = useDialog()
  return (
    <>
      <ContextItem
        onClick={() => {
          dialog.open(<DialogWithMenu />)
          // dialog.prompt('hello')
        }}
      >
        Open dialog
      </ContextItem>
      <ContextItem inset>Do something else</ContextItem>
      <ContextItem
        onClick={() => {
          alert('close it')
        }}
        icon={ScheduleIcon}
        // right icon only show on hover
        // rightOnHover
        iconRight={() => {
          return (
            <MoreIcon
              onClick={() => {
                alert('snapje')
              }}
            />
          )
        }}
      >
        Flap
      </ContextItem>
    </>
  )
}

const LargeMenu = () => {
  const a = []
  for (let i = 0; i < 100; i++) {
    a.push(i)
  }
  return (
    <>
      {a.map((v, i) => {
        return (
          <ContextItem inset key={i}>
            {i} Do something
          </ContextItem>
        )
      })}
    </>
  )
}

const DialogWithMenu = () => {
  return (
    <Dialog>
      <Button
        onClick={useContextMenu(SimpleMenu, {}, { placement: 'center' })}
        style={{
          marginBottom: 24,
        }}
      >
        Menu (placement: center)
      </Button>
    </Dialog>
  )
}

const TestMenu = () => {
  return (
    <>
      <ContextItem onClick={() => {}} icon={DuplicateIcon}>
        Duplicate
      </ContextItem>
      <ContextItem onClick={() => {}} icon={DeleteIcon}>
        Delete
      </ContextItem>
    </>
  )
}

import React from 'react'
import { EditionSidebar } from '../../EditionSidebar'
import { EditorTopBar } from '../../EditorTopBar'
import { useRoute } from 'kabouter'
import { General } from './General'
import { Sharing } from './Sharing'
import { Page, Spacer } from '~'
import { SettingsSubmenu } from './SettingsSubmenu'

export const ShowSettings = () => {
  const [location] = useLocation()

  const pathArray = location.split('/')

  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: 48,
        height: '100vh',
        width: '100%',
      }}
    >
      <EditionSidebar />
      <EditorTopBar />

      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Page>
          <SettingsSubmenu />
          <Spacer space />

          {location === 'show-settings/general' ||
            (location === '/show-settings' && <General />)}

          {location === '/sharing' && <Sharing />}
        </Page>
      </div>
    </div>
  )
}

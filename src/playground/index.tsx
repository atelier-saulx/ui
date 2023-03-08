import { render } from 'react-dom'
import React, { FC, useState } from 'react'
import {
  Provider,
  Button,
  Page,
  Menu,
  Input,
  SearchIcon,
  LargeLogo,
  DarkModeIcon,
  LightModeIcon,
  ExternalLinkIcon,
  color,
} from '../'
import { BasedClient } from '@based/client'
import * as stories from './stories'
import { toPascalCase } from './utils'
import { useDarkMode } from '~/hooks/useDarkMode'
import useLocalStorage from '@based/use-local-storage'

import { useRoute } from 'kabouter'

export const client = new BasedClient({
  project: 'YOUZI',
  url: 'ws://localhost:8297',
})

const Stories: FC = () => {
  const q = useRoute().query

  console.info('???', q)

  const story = q.story

  if (story) {
    const name = toPascalCase(story)
    const component = stories[name]
    if (!component) {
      return <div>empty</div>
    }
    return React.createElement(component)
  }
  return <>Overview</>
}

const menuItems = {
  Based: {
    App: '?story=based-app',
  },
  Advanced: {
    Auth: '?story=auth',
    ContentEditor: '?story=content-editor',
    ContentEditorYouzi: '?story=content-editor-youzi',
  },
  Schema: {
    Schema: '?story=schema',
    SchemaModals: '?story=schema-modals',
    QueryBar: '?story=QuerySearchBar',
    QueryFilters: '?story=QueryFilterBar',
    QueryBuilder: '?story=QueryBuilders',
  },
  Input: {
    Buttons: '?story=buttons',
    Checkboxes: '?story=checkboxes',
    ColorPicker: '?story=color-picker',
    DateTimePicker: '?story=DateTime',
    FileUpload: '?story=upload',
    Forms: '?story=forms',
    Geo: '?story=geo',
    InputFields: '?story=input-fields',
    Radiobuttons: '?story=radiobutton',
    // ReferenceInput: '?story=reference-inputs',
    Selects: '?story=selects',
    Sliders: '?story=sliders',
    Toggle: '?story=toggles',
    ToggleGroups: '?story=ToggleGroups',
  },
  Display: {
    Avatars: '?story=avatars',
    Badges: '?story=badges',
    Cards: '?story=cards',
    Icons: '?story=icons',
    Label: '?story=labels',
    Steps: '?story=step',
    Thumbnails: '?story=thumbnails',
    Separator: '?story=separators',
    Spacer: '?story=Spacers',
  },
  Feedback: {
    Callouts: '?story=callouts',
    Dialogs: '?story=dialogs',
    Toasts: '?story=toasts',
  },
  Code: {
    Code: '?story=code',
  },
  Layout: {
    Accordions: '?story=accordions',
    Container: '?story=Containers',
    Flow: '?story=FlowSequences',
    Grids: '?story=grids',
    ExpandableList: '?story=ExpandableLists',
    // InfiniteList: '?story=InfiniteLists',
    // Lists: '?story=lists',
    // this list is being used for the little table menu now
    //  VirtualizedList: '?story=VirtualizedLists',
    MasonryGrid: '?story=masonryGrid',
    Page: '?story=pages',
    Tables: '?story=tables',
    Tabs: '?story=tabsView',
  },
  Navigation: {
    Breadcrumbs: '?story=breadcrumb',
    SideMenu: '?story=SideMenu',
    Sidebar: '?story=SideBar',
    Topbar: '?story=topbars',
  },
  Overlays: {
    ContextMenus: '?story=context-menus',
  },
  Themes: {
    Theming: '?story=theming',
    Typography: '?story=typography',
  },
  Text: {
    Text: '?story=text',
  },
  Insights: {
    BarGraphs: '?story=BarGraphs',
    LineGraph: '?story=lineGraph',
    PieGraph: '?story=PieGraphs',
    ResultCards: '?story=ResultCards',
    // ScatterResults: '?story=ScatterResults',
  },
  Hooks: {
    useRoute: '?story=Router',
    useContextMenu: '?story=UseContextMenu',
    useCopyToClipboard: '?story=CopyHookExample',
    useDarkMode: '?story=DarkModeHook',
    useDialog: '?story=DialogHookExample',
    useLocation: '?story=LocationHook',
    useToolTips: '?story=tooltips',
  },
  Handbook: {
    Props: '?story=props',
  },
  Examples: {
    Inbox: '?story=inbox',
    // ProfileSettings: '?story=profile-settings',
    // ProjectSettings: '?story=project-settings',
    // Tally: '?story=tally-screens',
    Kyles: '?story=KylesPlayground',
    ProgressBar: '?story=ProgressIndicators',
    Drawer: '?story=Drawers',
  },
}

const App = () => {
  const [fullscreen, setFullscreen] = useState(false)
  const [darkMode, setDarkMode] = useDarkMode()
  const [filteredObj, setFilteredObj] = useState<Object>(menuItems)

  if (fullscreen) {
    return <Stories />
  }

  const searchFilterHandler = (value: string) => {
    if (value === '') {
      setFilteredObj(menuItems)
      return
    }

    const filteredArr = []
    for (const key in menuItems) {
      for (const subKey in menuItems[key]) {
        if (subKey.toLowerCase().includes(value.toLowerCase())) {
          filteredArr.push([subKey, menuItems[key][subKey]])
        }
      }
    }
    // nu van array weer object maken
    const filteredObjTest = Object.fromEntries(filteredArr)

    setFilteredObj({ Results: filteredObjTest })
  }

  return (
    <div style={{ flexGrow: 1, display: 'flex', height: '100%' }}>
      <Menu
        collapse
        style={{
          paddingLeft: 32,
          // minWidth: 300,
          paddingRight: 32,
        }}
        header={
          <>
            <LargeLogo style={{ marginBottom: 24, marginTop: -12 }} />
            <div
              style={{
                display: 'flex',
              }}
            >
              <Button
                color="text"
                space="12px"
                ghost
                style={{
                  marginLeft: -8,
                }}
                icon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={() => setDarkMode(!darkMode)}
              />
              <Button
                color="text"
                space="12px"
                ghost
                icon={ExternalLinkIcon}
                onClick={() => setFullscreen(!fullscreen)}
              />
            </div>
            <div style={{ marginLeft: -8, marginRight: -8, marginBottom: 20 }}>
              <Input
                icon={<SearchIcon />}
                placeholder="Search"
                space
                onChange={(e) => searchFilterHandler(e)}
                ghost
                style={{
                  backgroundColor: color('background2'),
                  boxShadow: '0px',
                  outline: 'none',
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 8,
                  paddingTop: '8px',
                }}
              />
            </div>
          </>
        }
        prefix="/hello"
        data={filteredObj}
      />
      <Page style={{ padding: 32 }}>
        <Stories />
      </Page>
    </div>
  )
}

const Wrapper = () => {
  const [themes] = useLocalStorage('themes')
  return (
    <Provider fill client={client} themes={themes || {}}>
      <App />
    </Provider>
  )
}
render(<Wrapper />, document.body)

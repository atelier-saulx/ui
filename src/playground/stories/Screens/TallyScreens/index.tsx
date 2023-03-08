import React from 'react'
import { useRoute } from 'kabouter'
import { Shows } from './Shows/Shows'
import { Users } from './Settings/Users'
import { WorkspaceSettings } from './Settings/WorkspaceSettings'
import { Organisations } from './Settings/Organisations'
import { UserRoles } from './Settings/UserRoles'
import { Show } from './Show/Show'
import { Content } from './Edition/Editor/Content/Content'
import { Design } from './Edition/Editor/Design/Design'
import { ShowSettings } from './Edition/Editor/Settings/ShowSettings'

export const TallyScreens = () => {
  const [location] = useLocation()

  const pathArray = location.split('/')

  console.log(pathArray)

  // Single shows overview
  if (pathArray[1] === 'shows' && pathArray[2] === '1') {
    // '/shows/:id'
    // pass data props??
    return <Show />
  }

  // Shows
  if (!pathArray[1] || pathArray[1] === 'shows') {
    return <Shows />
  }

  // Editions / Editor
  if (location === '/content') {
    return <Content />
  }
  if (location === '/design') {
    return <Design />
  }

  console.info(location)

  if (location.startsWith('/show-settings')) {
    return <ShowSettings />
  }

  // Workspace Settings
  if (location === '/settings') {
    return <WorkspaceSettings />
  }
  if (location === '/users') {
    return <Users />
  }
  if (location === '/organisations') {
    return <Organisations />
  }
  if (location === '/user-roles') {
    return <UserRoles />
  }

  return null
}

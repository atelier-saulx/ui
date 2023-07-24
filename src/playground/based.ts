import based, { BasedClient } from '@based/client'

export const cluster = 'production'

export const project = 'demo'
export const org = 'powerful-corp'
export const env = 'production'

export const client = new BasedClient({
  project,
  org,
  env,
  name: '@based/env-admin-hub',
  cluster,
})

global.basedClient = client

client.on('connect', () => {
  console.info('connected')
})

export const adminClient = based({
  org: 'saulx',
  project: 'based-cloud',
  env: 'platform',
  name: '@based/admin-hub',
  cluster,
})

adminClient.on('connect', () => {
  console.info('admin hub connected')
})

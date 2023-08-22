import { BasedFunctionConfig } from '@based/functions'

const config: BasedFunctionConfig = {
  type: 'app',
  name: 'app',
  public: true,
  main: './app.tsx',
  path: '/',
  favicon: './favicon.ico',
}
export default config

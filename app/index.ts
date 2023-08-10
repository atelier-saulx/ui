import { BasedAppFunction } from '@based/functions'

// Functions of type 'app' are specialized to
// bundle and serve frontend applications
const app: BasedAppFunction = async (_based, { css, js, favicon }, _ctx) => {
  return /* HTML */ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
        <meta name="title" content="based-ui" />
        <title>based-ui</title>
        <link rel="icon" type="image/x-icon" href="${favicon.url}" />
        <style>
          ${await css.text}
        </style>
      </head>
      <body style="margin: 0;background:black;">
        <div id="root"></div>
        <script>
          ${await js.text}
        </script>
      </body>
    </html>`
}
export default app

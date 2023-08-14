import { BasedAppFunction } from '@based/functions'
import { color } from '../src/'
// import '../src/assets/fonts.css'
// TODO remove font from inside here

const app: BasedAppFunction = async (_based, { css, js, favicon }, _ctx) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
        <meta name="title" content="based-ui" />
        <title>Based-ui playground</title>
        <link rel="icon" type="image/x-icon" href="${favicon.url}" />
        <style>
          ${await css.text}

          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

          html{
            font-family: 'Inter', sans-serif;
          }

        </style>
      </head>
      <body style="margin: 0;background:${'#fbfbff'};">
        <div id="root"></div>
        <script>
          ${await js.text}
        </script>
      </body>
    </html>`
}

export default app

export default async (_based, { css, js, favicon }) => {
  return /* HTML */ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Based UI</title>
        <link rel="icon" href="${favicon.url}" />
        <style>
          ${await css.text}
        </style>
      </head>
      <body>
        <script>
          ${await js.text}
        </script>
      </body>
    </html>`
}

import { BasedFunction } from '@based/functions'

type Icon = {
  id: string
  name: string
  src: string
  svg: string
  boundVariables: any
  path: string
  size: 16 | 20
}

type Icons = { size20: Icon[]; size16: Icon[] }

const importFigma: BasedFunction<
  {
    file?: string
  },
  Icons
> = async (based, payload, ctx) => {
  const figma = await based.query('based:secret', 'figma').get()

  const r = await fetch(
    'https://api.figma.com/v1/files/Mt9QoOjhJAmZIgAXstBzOT?ids=14:10432,25:27268',
    {
      headers: {
        'X-FIGMA-TOKEN': figma,
      },
    }
  )

  const json = await r.json()

  const icons: Icons = {
    size20: [],
    size16: [],
  }

  for (const frame of json.document.children.find((v) => v.name === 'Icons')
    .children) {
    const key = frame.id === '14:10432' ? 'size20' : 'size16'

    const ids = frame.children
      .reduce((acc, icon) => {
        return acc + ',' + icon.id
      }, '')
      .slice(1)

    const svgs = await fetch(
      `https://api.figma.com/v1/images/Mt9QoOjhJAmZIgAXstBzOT?ids=${ids}&format=svg`,
      {
        headers: {
          'X-FIGMA-TOKEN': figma,
        },
      }
    ).then((r) => r.json())

    for (const icon of frame.children) {
      if (
        icon.children &&
        icon.children[0] &&
        icon.children[0].boundVariables
      ) {
        icons[key].push({
          name: icon.name,
          id: icon.id,
          src: svgs.images[icon.id],
          svg: '',
          boundVariables: icon.children[0].boundVariables,
          path: '',
          size: key === 'size16' ? 16 : 20,
        })
      } else {
        console.error('Illigal icon', icon)
      }
    }
  }

  const readFileFromS3 = async (icon: Icon): Promise<void> => {
    icon.svg = await fetch(icon.src).then(async (t) => t.text())
    Object.assign(icon, await based.call('create-icon', icon))
  }

  const q: Promise<void>[] = []
  for (const key in icons) {
    for (const icon of icons[key]) {
      q.push(readFileFromS3(icon))
    }
  }

  await Promise.all(q)

  return icons
}

export default importFigma

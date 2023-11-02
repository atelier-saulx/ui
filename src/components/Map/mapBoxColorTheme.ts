import { color } from '../../varsUtilities'
import '../../colors.css'

export const makeTheme = () => {
  const convertToRGB = (varstring) => {
    let substring = varstring.substring(4).slice(0, -1)
    let rgba = getComputedStyle(document.documentElement).getPropertyValue(
      substring
    )
    return rgba
  }

  let landColor = convertToRGB(color('action', 'system', 'hover'))
  let landColorTwo = convertToRGB(color('background', 'inverted', 'muted'))
  let waterColor = convertToRGB(color('background', 'default', 'strong'))
  let borderColor = convertToRGB(color('action', 'primary', 'subtleSelected'))
  let textColor = convertToRGB(color('content', 'default', 'primary'))
  let textBorder = convertToRGB(color('content', 'inverted'))

  console.log(landColor, 'LandColor')

  const mapBoxColorTheme = {
    version: 8,
    name: 'based_2',
    metadata: {
      'mapbox:type': 'default',
      'mapbox:origin': 'monochrome-dark-v1',
      'mapbox:sdk-support': { android: '9.3.0', ios: '5.10.0', js: '2.0.0' },
      'mapbox:autocomposite': true,
      'mapbox:groups': {
        'Land, water, & sky, land': {
          name: 'Land, water, & sky, land',
          collapsed: false,
        },
        'Land, water, & sky, water': {
          name: 'Land, water, & sky, water',
          collapsed: false,
        },
        'Land, water, & sky, built': {
          name: 'Land, water, & sky, built',
          collapsed: false,
        },
        'Administrative boundaries, admin': {
          name: 'Administrative boundaries, admin',
          collapsed: false,
        },
        'Place labels, place-labels': {
          name: 'Place labels, place-labels',
          collapsed: false,
        },
      },
    },
    center: [12.65303056247103, 48.347192716767154],
    zoom: 4.59653953422342,
    bearing: 0,
    pitch: 0,
    sources: {
      composite: {
        url: 'mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2',
        type: 'vector',
      },
    },
    sprite:
      'mapbox://sprites/nfrade/ckkzrytvp3vtn17lizbcps9ge/b2vipplney3kmltdqm6hc8lwb',
    glyphs: 'mapbox://fonts/nfrade/{fontstack}/{range}.pbf',
    layers: [
      {
        id: 'land',
        type: 'background',
        layout: {},
        paint: { 'background-color': landColor },
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, land',
        },
      },
      {
        id: 'landcover',
        type: 'fill',
        source: 'composite',
        'source-layer': 'landcover',
        maxzoom: 7,
        layout: {},
        paint: {
          'fill-color': landColor,
          'fill-opacity': [
            'interpolate',
            ['exponential', 1.5],
            ['zoom'],
            2,
            0.3,
            7,
            0,
          ],
          'fill-antialias': false,
        },
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, land',
        },
      },
      {
        minzoom: 5,
        layout: {},
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, land',
        },
        filter: ['==', ['get', 'class'], 'national_park'],
        type: 'fill',
        source: 'composite',
        id: 'national-park',
        paint: {
          'fill-color': 'hsl(0, 4%, 88%)',
          'fill-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            0,
            6,
            0.5,
            10,
            0.5,
          ],
        },
        'source-layer': 'landuse_overlay',
      },
      {
        minzoom: 5,
        layout: {},
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, land',
        },
        filter: [
          'match',
          ['get', 'class'],
          ['park', 'airport', 'glacier', 'pitch', 'sand', 'facility'],
          true,
          false,
        ],
        type: 'fill',
        source: 'composite',
        id: 'landuse',
        paint: {
          'fill-color': [
            'match',
            ['get', 'class'],
            'glacier',
            landColor,
            landColor,
          ],
          'fill-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            5,
            0,
            6,
            ['match', ['get', 'class'], 'glacier', 0.5, 1],
          ],
        },
        'source-layer': 'landuse',
      },
      {
        id: 'waterway-shadow',
        type: 'line',
        source: 'composite',
        'source-layer': 'waterway',
        minzoom: 8,
        layout: {
          'line-cap': ['step', ['zoom'], 'butt', 11, 'round'],
          'line-join': 'round',
        },
        paint: {
          'line-color': waterColor,
          'line-width': [
            'interpolate',
            ['exponential', 1.3],
            ['zoom'],
            9,
            ['match', ['get', 'class'], ['canal', 'river'], 0.1, 0],
            20,
            ['match', ['get', 'class'], ['canal', 'river'], 8, 3],
          ],
          'line-translate': [
            'interpolate',
            ['exponential', 1.2],
            ['zoom'],
            7,
            ['literal', [0, 0]],
            16,
            ['literal', [-1, -1]],
          ],
          'line-translate-anchor': 'viewport',
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0, 8.5, 1],
        },
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, water',
        },
      },
      {
        id: 'water-shadow',
        type: 'fill',
        source: 'composite',
        'source-layer': 'water',
        layout: {},
        paint: {
          'fill-color': waterColor,
          'fill-translate': [
            'interpolate',
            ['exponential', 1.2],
            ['zoom'],
            7,
            ['literal', [0, 0]],
            16,
            ['literal', [-1, -1]],
          ],
          'fill-translate-anchor': 'viewport',
        },
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, water',
        },
      },
      {
        id: 'waterway',
        type: 'line',
        source: 'composite',
        'source-layer': 'waterway',
        minzoom: 8,
        layout: {
          'line-cap': ['step', ['zoom'], 'butt', 11, 'round'],
          'line-join': 'round',
        },
        paint: {
          'line-color': waterColor,
          'line-width': [
            'interpolate',
            ['exponential', 1.3],
            ['zoom'],
            9,
            ['match', ['get', 'class'], ['canal', 'river'], 0.1, 0],
            20,
            ['match', ['get', 'class'], ['canal', 'river'], 8, 3],
          ],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0, 8.5, 1],
        },
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, water',
        },
      },
      {
        id: 'water',
        type: 'fill',
        source: 'composite',
        'source-layer': 'water',
        layout: {},
        paint: { 'fill-color': waterColor },
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, water',
        },
      },
      {
        minzoom: 13,
        layout: {},
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, built',
        },
        filter: [
          'all',
          ['==', ['geometry-type'], 'Polygon'],
          ['==', ['get', 'class'], 'land'],
        ],
        type: 'fill',
        source: 'composite',
        id: 'land-structure-polygon',
        paint: { 'fill-color': landColorTwo },
        'source-layer': 'structure',
      },
      {
        minzoom: 13,
        layout: { 'line-cap': 'round' },
        metadata: {
          'mapbox:featureComponent': 'land-and-water',
          'mapbox:group': 'Land, water, & sky, built',
        },
        filter: [
          'all',
          ['==', ['geometry-type'], 'LineString'],
          ['==', ['get', 'class'], 'land'],
        ],
        type: 'line',
        source: 'composite',
        id: 'land-structure-line',
        paint: {
          'line-width': [
            'interpolate',
            ['exponential', 1.99],
            ['zoom'],
            14,
            0.75,
            20,
            40,
          ],
          'line-color': textBorder,
        },
        'source-layer': 'structure',
      },
      {
        minzoom: 1,
        layout: {},
        metadata: {
          'mapbox:featureComponent': 'admin-boundaries',
          'mapbox:group': 'Administrative boundaries, admin',
        },
        filter: [
          'all',
          ['match', ['get', 'disputed'], 'true', false, true],
          ['==', ['get', 'admin_level'], 0],
          ['==', ['get', 'maritime'], 'false'],
          ['match', ['get', 'worldview'], ['all', 'US'], true, false],
        ],
        type: 'line',
        source: 'composite',
        id: 'admin-0-boundary-bg',
        paint: {
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 3.5, 10, 8],
          'line-color': textBorder,
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 3, 0, 4, 0.8],
          'line-blur': ['interpolate', ['linear'], ['zoom'], 3, 0, 10, 2],
        },
        'source-layer': 'admin',
      },
      {
        minzoom: 1,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        metadata: {
          'mapbox:featureComponent': 'admin-boundaries',
          'mapbox:group': 'Administrative boundaries, admin',
        },
        filter: [
          'all',
          ['==', ['get', 'admin_level'], 0],
          ['==', ['get', 'disputed'], 'false'],
          ['==', ['get', 'maritime'], 'false'],
          ['match', ['get', 'worldview'], ['all', 'US'], true, false],
        ],
        type: 'line',
        source: 'composite',
        id: 'admin-0-boundary',
        paint: {
          'line-color': borderColor,
          'line-width': ['interpolate', ['linear'], ['zoom'], 5, 2, 6, 3],
          'line-dasharray': [10, 0],
        },
        'source-layer': 'admin',
      },
      {
        minzoom: 1,
        layout: {
          'icon-image': '',
          'text-field': ['coalesce', ['get', 'name_en'], ['get', 'name']],
          'text-line-height': 1.1,
          'text-max-width': 6,
          'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
          'text-offset': ['literal', [0, 0]],
          'text-justify': [
            'step',
            ['zoom'],
            [
              'match',
              ['get', 'text_anchor'],
              ['left', 'bottom-left', 'top-left'],
              'left',
              ['right', 'bottom-right', 'top-right'],
              'right',
              'center',
            ],
            7,
            'center',
          ],
          'text-size': [
            'interpolate',
            ['cubic-bezier', 0.2, 0, 0.7, 1],
            ['zoom'],
            1,
            ['step', ['get', 'symbolrank'], 11, 4, 9, 5, 8],
            9,
            ['step', ['get', 'symbolrank'], 22, 4, 19, 5, 17],
          ],
        },
        metadata: {
          'mapbox:featureComponent': 'place-labels',
          'mapbox:group': 'Place labels, place-labels',
        },
        maxzoom: 10,
        filter: [
          'match',
          ['get', 'class'],
          'country',
          ['match', ['get', 'worldview'], ['all', 'US'], true, false],
          'disputed_country',
          [
            'all',
            ['==', ['get', 'disputed'], 'true'],
            ['match', ['get', 'worldview'], ['all', 'US'], true, false],
          ],
          false,
        ],
        type: 'symbol',
        source: 'composite',
        id: 'country-label',
        paint: {
          'icon-opacity': [
            'step',
            ['zoom'],
            ['case', ['has', 'text_anchor'], 1, 0],
            7,
            0,
          ],
          'text-color': textColor,
          'text-halo-color': textBorder,
          'text-halo-width': 1.25,
        },
        'source-layer': 'place_label',
      },
    ],
    created: '2021-02-10T18:36:59.477Z',
    modified: '2021-02-10T18:50:24.097Z',
    id: 'ckkzrytvp3vtn17lizbcps9ge',
    owner: 'nfrade',
    visibility: 'private',
    protected: false,
    draft: false,
  }

  return mapBoxColorTheme
}

import React, { useState } from 'react'
import props from '../props.json'
import { ComponentDef } from '../types'
import { Map as CompMap } from '../../src'
import { styled } from '../../src'

export const euCities = [
  {
    name: 'Istanbul',
    country: 'Turkey',
    latitude: '41.013611',
    longitude: '28.955',
  },
  {
    name: 'Moscow',
    country: 'Russia',
    latitude: '55.75',
    longitude: '37.616667',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    latitude: '51.507222',
    longitude: '0.1275',
  },
  {
    name: 'Saint Petersburg',
    country: 'Russia',
    latitude: '59.95',
    longitude: '30.3',
  },
  {
    name: 'Berlin',
    country: 'Germany',
    latitude: '52.516667',
    longitude: '13.383333',
  },
  {
    name: 'Madrid',
    country: 'Spain',
    latitude: '40.383333',
    longitude: '3.716667',
  },
  {
    name: 'Kiev',
    country: 'Ukraine',
    latitude: '50.45',
    longitude: '30.523333',
  },
  {
    name: 'Rome',
    country: 'Italy',
    latitude: '41.9',
    longitude: '12.5',
  },
  {
    name: 'Paris',
    country: 'France',
    latitude: '48.8567',
    longitude: '2.3508',
  },
  {
    name: 'Bucharest',
    country: 'Romania',
    latitude: '44.4325',
    longitude: '26.103889',
  },
  {
    name: 'Minsk',
    country: 'Belarus',
    latitude: '53.9',
    longitude: '27.566667',
  },
  {
    name: 'Vienna',
    country: 'Austria',
    latitude: '48.2',
    longitude: '16.366667',
  },
  {
    name: 'Hamburg',
    country: 'Germany',
    latitude: '53.565278',
    longitude: '10.001389',
  },
  {
    name: 'Budapest',
    country: 'Hungary',
    latitude: '47.4925',
    longitude: '19.051389',
  },
  {
    name: 'Warsaw',
    country: 'Poland',
    latitude: '52.233333',
    longitude: '21.016667',
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    latitude: '41.383333',
    longitude: '2.183333',
  },
  {
    name: 'Munich',
    country: 'Germany',
    latitude: '48.133333',
    longitude: '11.566667',
  },
  {
    name: 'Kharkiv',
    country: 'Ukraine',
    latitude: '50.004444',
    longitude: '36.231389',
  },
  {
    name: 'Milan',
    country: 'Italy',
    latitude: '45.466667',
    longitude: '9.183333',
  },
  {
    name: 'Prague',
    country: 'Czech Republic',
    latitude: '50.083333',
    longitude: '14.416667',
  },
  {
    name: 'Nizhny Novgorod',
    country: 'Russia',
    latitude: '56.326944',
    longitude: '44.0075',
  },
  {
    name: 'Sofia',
    country: 'Bulgaria',
    latitude: '42.7',
    longitude: '23.33',
  },
  {
    name: 'Kazan',
    country: 'Russia',
    latitude: '55.790278',
    longitude: '49.134722',
  },
  {
    name: 'Brussels',
    country: 'Belgium',
    latitude: '50.85',
    longitude: '4.35',
  },
  {
    name: 'Samara',
    country: 'Russia',
    latitude: '53.202778',
    longitude: '50.140833',
  },
  {
    name: 'Belgrade',
    country: 'Serbia',
    latitude: '44.816667',
    longitude: '20.466667',
  },
  {
    name: 'Rostov-on-Don',
    country: 'Russia',
    latitude: '47.233333',
    longitude: '39.7',
  },
  {
    name: 'Birmingham',
    country: 'United Kingdom',
    latitude: '52.483056',
    longitude: '1.893611',
  },
  {
    name: 'Ufa',
    country: 'Russia',
    latitude: '54.75',
    longitude: '55.966667',
  },
  {
    name: 'Cologne',
    country: 'Germany',
    latitude: '50.936389',
    longitude: '6.952778',
  },
  {
    name: 'Perm',
    country: 'Russia',
    latitude: '58',
    longitude: '56.316667',
  },
  {
    name: 'Voronezh',
    country: 'Russia',
    latitude: '51.671667',
    longitude: '39.210556',
  },
  {
    name: 'Volgograd',
    country: 'Russia',
    latitude: '48.7',
    longitude: '44.516667',
  },
  {
    name: 'Odessa',
    country: 'Ukraine',
    latitude: '46.466667',
    longitude: '30.733333',
  },
  {
    name: 'Naples',
    country: 'Italy',
    latitude: '40.833333',
    longitude: '14.25',
  },
  {
    name: 'Dnipropetrovsk',
    country: 'Ukraine',
    latitude: '48.45',
    longitude: '34.983333',
  },
]

export const createMapTestData = (
  data: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: 'FeatureCollection',
    features: [],
  }
): any => {
  if (Array.isArray(data.features)) {
    for (let i = 0; i < 10; i++) {
      const city = euCities[Math.floor(Math.random() * euCities.length)]
      const existingFeature = data.features.find(
        // @ts-ignore
        (f): any => f.properties.name === city.name
      )
      const value = Math.ceil(Math.random() * 25)
      if (existingFeature) {
        // @ts-ignore
        existingFeature.properties.value += value
      } else {
        data.features.push({
          id: data.features.length + 1,
          type: 'Feature',
          properties: {
            value,
            name: city.name,
          },
          geometry: {
            type: 'Point',
            coordinates: [Number(city.longitude), Number(city.latitude), 0.0],
          },
        })
      }
    }
    return data
  }
}

let mapData = createMapTestData()

const example: ComponentDef = {
  name: 'Map',
  properties: {
    data: { type: ' GeoJSON.FeatureCollection<GeoJSON.Geometry>' },
    height: {
      optional: true,
      type: 'number',
    },
    style: {
      optional: true,
      type: 'Style',
    },
  },
  description: 'Map ',
  component: CompMap,
  examples: [
    {
      props: {
        height: 300,
        data: mapData,
      },
      customRenderer: (props) => {
        console.log(props.data)

        return (
          <styled.div
            style={{
              height: 300,
              width: 676,
              position: 'relative',
              display: 'block',
            }}
          >
            <CompMap data={props.data} height={props.height} />
          </styled.div>
        )
      },
    },
  ],
}

export default example

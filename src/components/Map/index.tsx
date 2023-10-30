import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import './popup.css'
import mapboxgl from 'mapbox-gl'
import {
  initMap,
  updateCircleRadius,
  addValues,
  addCountries,
  fitToData,
} from './mapActions'
import { color } from '../../varsUtilities'
import { styled, Style } from 'inlines'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoibmZyYWRlIiwiYSI6ImNra3h0cDhtNjA0NWYyb21zcnBhN21ra28ifQ.m5mqJjuX7iK9Z8JvNNcnfg'

type MapProps = {
  data: GeoJSON.FeatureCollection<GeoJSON.Geometry> | {}[]
  height?: number
  style?: Style
}

export const Map: FC<MapProps> = forwardRef(({ data, height, style }, ref) => {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map>(null)
  const hoverVoteId = useRef(null)

  useImperativeHandle(ref, () => ({
    fitToData: () => {
      if (!map.current) return
      fitToData({ data, map: map.current })
    },
  }))

  useEffect(() => {
    const m = initMap({
      mapContainer,
      onLoad: () => {
        addValues({ data, map: m, hoverVoteId })
        addCountries({ map: m })
        updateCircleRadius({ data, map: m })
        map.current = m
      },
      onZoom: () => {
        updateCircleRadius({ data, map: m })
      },
    })
    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map.current) {
      updateCircleRadius({ data, map: map.current })
      ;(map.current.getSource('values') as mapboxgl.GeoJSONSource).setData(data)
    }
  }, [map, data])

  return (
    <styled.div
      ref={mapContainer}
      style={{
        height: height ? `${height}px` : 'auto',
        position: 'relative',
        '& .mapboxgl-popup': {
          marginTop: `-${height - 90}px`,
        },
        ...style,
      }}
    />
  )
})

import React from "react"
import { printNameAndDate } from "./Utils"
import { getTrackDataJson, TrackRecord } from "./TrackData"
// import { trackDataJson } from "./TrackData"

let MapContainer: any
let TileLayer: any
let Popup: any
let Marker: any
let Icon: any
let markerIconPng: any

//This is a workaround for a leaflet issue 
//https://github.com/PaulLeCam/react-leaflet/issues/45#issuecomment-257712370
export class LeafletMap extends React.Component {
  componentDidMount(){
    //Only runs on Client, not on server render
    const leaflet = require('react-leaflet')
    MapContainer = leaflet.MapContainer
    TileLayer = leaflet.TileLayer
    Popup = leaflet.Popup
    Marker = leaflet.Marker
    Icon = require('leaflet').Icon
    markerIconPng = require('leaflet/dist/images/marker-icon.png')
    
    this.forceUpdate()


// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
// import {Icon} from 'leaflet'
  }

  render () {
    return (
      (MapContainer)
      ? (
        <MapContainer
          center={[39.8282, -98.5796]}
          zoom={4}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {renderMarkers()}
        </MapContainer>
      )
      : (null)
    )
   }
}

function renderMarkers() {
  const markers: any = []
  const configs: any[] = [] //don't know what order we'll have, we'll put these into the markers after
  const trackDataJson = getTrackDataJson()
  trackDataJson.forEach((trackInfo: TrackRecord, trackNum: number) => {
    // const trackInfo: TrackRecord = trackDataJson.tracks[trackNum]

    if (trackInfo.ParentTrack) {
      //This is a configuration
      //Don't make it's own marker, add it as a configuration later on
      configs.push({
        name: trackInfo.Track,
        parent: trackInfo.ParentTrack,
        date: trackInfo.Date,
        recap: trackInfo.Recap,
      })
    }
    else {
      markers.push({
        name: trackInfo.Track,
        date: trackInfo.Date,
        lat: trackInfo.Latitude,
        long: trackInfo.Longitude,
        recap: trackInfo.Recap,
        configs: []
      })
    }
  })

  configs.forEach((config) => {
    const m = markers.find((marker: any) => marker.name === config.parent)
    if (m) {
      m.configs.push(config)
    }
  })

  return markers
    .filter((marker: any) => marker.lat !== undefined && marker.long !== undefined)
    .map((marker: any) => {
      return <Marker 
        position={[marker.lat, marker.long]}
        icon={new Icon({iconUrl: markerIconPng as any, iconSize: [25, 41], iconAnchor: [12, 41]})}
        key={`${marker.name}${marker.lat}${marker.long}`}
      >
        <Popup>
          {printNameAndDate(marker.name, marker.date)}
          {
            marker.recap !== undefined &&
            <>{" "}(<a href={marker.recap} target="_blank">Recap</a>)</>
          }
          {
            marker.configs.length > 0 &&
            <>
              <br/>Additional Configurations:
              <>
                {
                marker.configs.map((config: any) => {
                  return <>
                    <br/>&nbsp;&nbsp;{printNameAndDate(config.name, config.date)}
                    {
                      config.recap !== undefined &&
                      <>{" "}(<a href={config.recap} target="_blank">Recap</a>)</>
                    }
                  </>
                })
                }
              </>
            </>
          }
        </Popup>
      </Marker>
    })
}

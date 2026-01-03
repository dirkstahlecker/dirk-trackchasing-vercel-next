import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { trackDataJson } from './TrackData';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import { printNameAndDate } from './Utils';

export function RacesTab() {
  return <div>
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

    <br/>
    {renderStats()}
  </div>
}

function renderStats() {
  const x = trackDataJson;
  let totalTracks: number = Object.keys(trackDataJson).length;
  
  const statesSet = new Set<string>()
  for (const trackNum in trackDataJson) {
    const trackInfo = trackDataJson[trackNum]
    statesSet.add(trackInfo.State)
  }
  //remove provinces
  statesSet.delete("QC")
  statesSet.delete("NL")
  statesSet.delete("PE")
  statesSet.delete("NS")
  statesSet.delete("NB")
  statesSet.delete("ON")
  statesSet.delete("MB")
  statesSet.delete("SK")
  statesSet.delete("AB")
  statesSet.delete("BC")
  statesSet.delete("YT")
  statesSet.delete("NT")
  statesSet.delete("NU")
  let totalStates: number = statesSet.size;

  return <>
    <div>Total Tracks: {totalTracks}</div>
    <div>Total States: {totalStates}</div>
  </>
}

function renderMarkers() {
  const markers: any = []
  const configs = [] //don't know what order we'll have, we'll put these into the markers after
  for (const trackNum in trackDataJson) {
    const trackInfo = trackDataJson[trackNum]

    if (trackInfo["Parent Track"]) {
      //This is a configuration
      //Don't make it's own marker, add it as a configuration later on
      configs.push({
        name: trackInfo.Track,
        parent: trackInfo["Parent Track"],
        date: trackInfo.Date,
        recap: trackInfo.Recap,
      })
      continue
    }

    markers.push({
      name: trackInfo.Track,
      date: trackInfo.Date,
      lat: trackInfo.Latitude,
      long: trackInfo.Longitude,
      recap: trackInfo.Recap,
      configs: []
    })
  }

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


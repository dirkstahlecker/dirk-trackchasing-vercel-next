import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { trackDataJson } from './TrackData';

export function RecapsTab() {
  const recapsToPrint = []
  for (const trackNum in trackDataJson) {
    const trackInfo = trackDataJson[trackNum]
    if (trackInfo.Recap) {
      recapsToPrint.push({
        name: trackInfo.Track,
        date: trackInfo.Date,
        recap: trackInfo.Recap
      })
    }
    trackInfo.configs?.forEach((config: any) => {
      if (config.Recap) {
        recapsToPrint.push({
          name: config.Track,
          date: config.Date,
          recap: config.Recap
        })
      }
    })
  }

  return <>
    <div>
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
  </div>

    <br/>
    <br/>
    <h3>Race Recaps</h3>
    <br/>
    {recapsToPrint.map((recapObj) => <>
      <a href={recapObj.recap}>{printNameAndDate(recapObj.name, recapObj.date)}</a>
      <br/>
    </>)}
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
      // const recapInfo = recapInfoJson[marker.name]
      return <Marker position={[marker.lat, marker.long]}>
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

function printNameAndDate(nameIn: string, dateIn: string) {
  function printDate(input: any) {
    if (input === undefined) {
      return undefined
    }
    const d = new Date(input);
    return (d.getUTCMonth() + 1) + '-' +
          d.getUTCDate() + '-' +
          d.getUTCFullYear();
  }
 
  const date = printDate(dateIn)
  const name = nameIn

  if (date === undefined) {
    return nameIn
  }
  return `${date}: ${name}`
}

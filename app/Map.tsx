import React from "react"
import { makeKey, printNameAndDate } from "./Utils"
import { getTrackDataJson, TrackRecord } from "./TrackData"

let MapContainer: any
let TileLayer: any
let Popup: any
let Marker: any
let Icon: any
let markerIconPng: any
let customMarker: any
let customIcon: any

//This is a workaround for a leaflet issue 
//https://github.com/PaulLeCam/react-leaflet/issues/45#issuecomment-257712370
export class LeafletMap extends React.Component {
  componentDidMount() {
    //Only runs on Client, not on server render
    const leaflet = require('react-leaflet')
    MapContainer = leaflet.MapContainer
    TileLayer = leaflet.TileLayer
    Popup = leaflet.Popup
    Marker = leaflet.Marker
    Icon = require('leaflet').Icon
    markerIconPng = require('leaflet/dist/images/marker-icon.png')
    // customMarker = () => import('../public/marker_blue.png')

    // const customIcon = new leaflet.Icon({
    //     iconUrl: require('../public/marker_blue.png'),
    //     // iconRetinaUrl: require('../img/marker-pin-person.svg'),
    //     iconAnchor: null,
    //     popupAnchor: null,
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null,
    //     // iconSize: new leaflet.Point(60, 75),
    //     // className: 'leaflet-div-icon'
    // });
    
    this.forceUpdate()
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
    if (trackInfo.ParentTrack) {
      //This is a configuration
      //Don't make it's own marker, add it as a configuration later on
      configs.push({
        name: trackInfo.Track,
        parent: trackInfo.ParentTrack,
        date: trackInfo.Date,
        recap: trackInfo.Recap,
        type: trackInfo.Type
      })
    }
    else {
      markers.push({
        name: trackInfo.Track,
        date: trackInfo.Date,
        lat: trackInfo.Latitude,
        long: trackInfo.Longitude,
        recap: trackInfo.Recap,
        configs: [],
        type: trackInfo.Type
      })
    }
  })

  configs.forEach((config) => {
    const m = markers.find((marker: any) => marker.name === config.parent)
    if (m) {
      m.configs.push(config)
    }
  })

  const iconOval = new Icon({iconUrl: `/marker_blue.png`, iconSize: [25, 41], iconAnchor: [12, 41], className: "marker-blue"});
  const iconRoadCourse = new Icon({iconUrl: `/marker_blue.png`, iconSize: [25, 41], iconAnchor: [12, 41], className: "marker-red"});
  const iconF8 = new Icon({iconUrl: `/marker_blue.png`, iconSize: [25, 41], iconAnchor: [12, 41], className: "marker-green"});
  const iconUnknown = new Icon({iconUrl: `/marker_blue.png`, iconSize: [25, 41], iconAnchor: [12, 41], className: "marker-unknown"});

  return markers
    .filter((marker: any) => marker.lat !== undefined && marker.long !== undefined)
    .map((marker: any) => {
      let icon;
      switch (marker.type) {
        case "Oval":
          icon = iconOval;
          break;
        case "Road Course":
          icon = iconRoadCourse;
          break;
        case "Figure 8":
        case "Figure-8":
          icon = iconF8;
          break;
        default:
          // throw new Error("Invalid track type")
          icon = iconUnknown;
          break;
      }

      return <Marker 
        position={[marker.lat, marker.long]}
        icon={icon}
        key={`${marker.name}${marker.lat}${marker.long}`}
      >
        <Popup>
          {printNameAndDate(marker.name, marker.date)}
          {
            marker.recap !== undefined &&
            marker.recap !== "" &&
            <>{" "}(<a href={marker.recap} target="_blank">Recap</a>)</>
          }
          {
            marker.configs.length > 0 &&
            <>
              <br/>Additional Configurations:
              <>
                {
                marker.configs.map((config: any) => {
                  return <React.Fragment key={`${config.name}${config.date}`}>
                    <br/>&nbsp;&nbsp;{printNameAndDate(config.name, config.date)}
                    {
                      config.recap !== undefined &&
                      config.recap !== "" &&
                      <>{" "}(<a href={config.recap} target="_blank">Recap</a>)</>
                    }
                  </React.Fragment>
                })
                }
              </>
            </>
          }
        </Popup>
      </Marker>
    })
}

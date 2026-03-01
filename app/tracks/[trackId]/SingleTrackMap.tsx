import React from "react"

let MapContainer: any
let TileLayer: any
let Popup: any
let Marker: any
let Icon: any
let markerIconPng: any

export interface SingleTrackMapProps {
  lat: number;
  long: number;
}

//This is a workaround for a leaflet issue 
//https://github.com/PaulLeCam/react-leaflet/issues/45#issuecomment-257712370
export class SingleTrackMap extends React.Component<SingleTrackMapProps> {
  componentDidMount() {
    //Only runs on Client, not on server render
    const leaflet = require('react-leaflet')
    MapContainer = leaflet.MapContainer
    TileLayer = leaflet.TileLayer
    Popup = leaflet.Popup
    Marker = leaflet.Marker
    Icon = require('leaflet').Icon
    markerIconPng = require('leaflet/dist/images/marker-icon.png')

    this.forceUpdate()
  }

  render () {
    return (
      (MapContainer)
      ? (
        <MapContainer
          center={[this.props.lat, this.props.long]}
          zoom={4}
          style={{ height: '250px', width: '60%' }}
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
  const iconOval = new Icon({iconUrl: `/marker_blue.png`, iconSize: [25, 41], iconAnchor: [12, 41], className: "marker-blue"});

  return <Marker 
    position={[0, 0]}
    icon={iconOval}
  >
    <Popup>
      TEST  
    </Popup>
  </Marker>
}

'use client'

import { trackDataJson } from "./TrackData"

export function TracksTab() {
  const tracksArray: object[] = []
  // for (const trackNum in trackDataJson) {
  //   const trackInfo = trackDataJson[trackNum]
  //   tracksArray.push(trackInfo)
  // }
  
  return <>
    <h3>Tracks</h3>
    
    {/* {tracksArray.map((track: object) => {
      return <>
        {track.Name}
      </>
    })} */}
  </>
}

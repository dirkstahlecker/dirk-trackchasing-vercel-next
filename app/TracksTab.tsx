'use client'

import React from "react"
import { getTrackDataJson, TrackRecord } from "./TrackData"
import { makeKey } from "./Utils"

// import { trackDataJson } from "./TrackData"

export function TracksTab() {
  const tracksArray: {trackInfo: TrackRecord, trackNum: number}[] = []
  getTrackDataJson().forEach((trackInfo: TrackRecord, trackNum: number) => {
    tracksArray.push({trackInfo, trackNum})
  })

  return <>
    <h3>Tracks</h3>
    
    {tracksArray.map((track: {trackInfo: TrackRecord, trackNum: number}) => {
      return <React.Fragment key={makeKey(track.trackInfo)}>
        {track.trackNum}: {track.trackInfo.Track}
        <br/>
      </React.Fragment>
    })}
  </>
}

'use client'

import "./Tracks.css"
import React from "react"
import { getTrackDataJson, TrackRecord } from "./TrackData"
import { makeKey, printDate } from "./Utils"

export function TracksTab() {
  const tracksArray: {trackInfo: TrackRecord, trackNum: number}[] = []
  getTrackDataJson().forEach((trackInfo: TrackRecord, trackNum: number) => {
    tracksArray.push({trackInfo, trackNum})
  })

  return <>
    <h3>Tracks</h3>

    <div className="tracks-container">
      <div style={{textAlign: "left"}}>
          {tracksArray.map((track: {trackInfo: TrackRecord, trackNum: number}) => {
            return <div className="tracks-row" key={makeKey(track.trackInfo)}>
              <div className="tracks-column">{track.trackNum}</div>
              <div className="tracks-column">{printDate(track.trackInfo.Date)}</div>
              <div className="tracks-column">{track.trackInfo.Track}</div>
              <div className="tracks-column">
                {
                  track.trackInfo.Recap &&
                  <a target="_blank" href={track.trackInfo.Recap}>Recap</a>
                }
              </div>
            </div>
          })}
      </div>
    </div>
  </>
}

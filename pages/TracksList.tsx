'use client'

import { TrackRecord } from "../app/TrackData"
import { makeKey, printDate } from "../app/Utils"

export interface TracksListProps {
  tracksArray: {trackInfo: TrackRecord, trackNum: number}[]
}

export default function TracksList(props: TracksListProps) {
  return (
      <div className="tracks-container">
      <div style={{textAlign: "left"}}>
          {props.tracksArray.map((track: {trackInfo: TrackRecord, trackNum: number}) => {
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
  )
}

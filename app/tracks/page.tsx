'use client'

import "./Tracks.css"
import { getTrackDataJson, TrackRecord } from "../TrackData"
import { useState } from "react"
import TracksList from "./TracksList"

export default function TracksTab() {
  const tracksArray: {trackInfo: TrackRecord, trackNum: number}[] = []
  getTrackDataJson().forEach((trackInfo: TrackRecord, trackNum: number) => {
    tracksArray.push({trackInfo, trackNum})
  })

  const [mode, setMode] = useState<"LIST" | "SINGLE">("LIST");

  return <>
    {
      mode === "LIST" &&
      <TracksList tracksArray={tracksArray}/>
    }
    {/* {
      mode === "SINGLE" &&
      <SingleTrack trackId={tracksArray[0].trackInfo}/>
    } */}
  </>
}

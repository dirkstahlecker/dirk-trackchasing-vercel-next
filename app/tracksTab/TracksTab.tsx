'use client'

import "./Tracks.css"
import { getTrackDataJson, TrackRecord } from "../TrackData"
import { TracksList } from "./TracksList"
import { useState } from "react"
import { TrackPage } from "./TrackPage"

export function TracksTab() {
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
    {
      mode === "SINGLE" &&
      <TrackPage track={tracksArray[0].trackInfo}/>
    }
  </>
}

'use client'

import React from "react"
import { FlipsData, TrackVideo } from "./FlipData"

//flip videos are on TrackchaserDirk youtube account

export default function FlipsTab() {
  return FlipsData.map((value: TrackVideo) => {
    return <React.Fragment key={value.url + value.num}>
      <a href={value.url} target="_blank">{value.num}: {value.track}</a>
      <br/>
    </React.Fragment>
  })
}
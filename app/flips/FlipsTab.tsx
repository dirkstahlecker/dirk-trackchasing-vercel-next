'use client'

import { FlipsData, TrackVideo } from "./FlipData"

//flip videos are on TrackchaserDirk youtube account

export default function FlipsTab() {
  return FlipsData.map((value: TrackVideo) => {
    return <>
      <a href={value.url}>{value.num}: {value.track}</a>
      <br/>
    </>
  })
}
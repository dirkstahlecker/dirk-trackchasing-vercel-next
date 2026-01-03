'use client'

import { LeafletMap } from './Map';
import { getTrackDataJson, TrackRecord } from './TrackData';

export function RacesTab() {
  return <div>
    <LeafletMap/>
    <br/>
    {renderStats()}
  </div>
}

function renderStats() {
  const trackDataJson = getTrackDataJson();
  let totalTracks: number = trackDataJson.size
  
  const statesSet = new Set<string>()
  trackDataJson.forEach((trackInfo: TrackRecord, trackNum: number) => {
    statesSet.add(trackInfo.State)
  })
  //remove provinces
  statesSet.delete("QC")
  statesSet.delete("NL")
  statesSet.delete("PE")
  statesSet.delete("NS")
  statesSet.delete("NB")
  statesSet.delete("ON")
  statesSet.delete("MB")
  statesSet.delete("SK")
  statesSet.delete("AB")
  statesSet.delete("BC")
  statesSet.delete("YT")
  statesSet.delete("NT")
  statesSet.delete("NU")
  let totalStates: number = statesSet.size;

  return <>
    <div>Total Tracks: {totalTracks}</div>
    <div>Total States: {totalStates}</div>
  </>
}

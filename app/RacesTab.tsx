'use client'

import { LeafletMap } from './Map';
import { trackDataJson } from './TrackData';
import { printNameAndDate } from './Utils';

export function RacesTab() {
  return <div>
    <LeafletMap/>
    <br/>
    {renderStats()}
  </div>
}

function renderStats() {
  const x = trackDataJson;
  let totalTracks: number = Object.keys(trackDataJson).length;
  
  const statesSet = new Set<string>()
  for (const trackNum in trackDataJson) {
    const trackInfo = trackDataJson[trackNum]
    statesSet.add(trackInfo.State)
  }
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

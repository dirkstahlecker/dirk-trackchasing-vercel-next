'use client'

import { JSX } from 'react';
import { LeafletMap } from './Map';
import { getTrackDataJson, TrackRecord } from './TrackData';
import { getLastTrack, printNameAndDate } from './Utils';

export function RacesTab() {
  return <div>
    <LeafletMap/>
    <br/>
    Latest New Track:
    <br/>
    {renderLastTrackSection()}
    <br/>
    <br/>
    {renderStats()}
  </div>
}

function renderLastTrackSection(): JSX.Element {
  const lastTrack = getLastTrack()
  return <>
    {printNameAndDate(lastTrack.Track, lastTrack.Date)}
  </>
}

function renderStats() {
  const trackDataJson = getTrackDataJson();
  let totalTracks: number = trackDataJson.size

  let tracksThisYear: number = 0;
  const beginningOfYear = new Date(new Date().getFullYear(), 0, 1);
  trackDataJson.forEach((trackRecord: TrackRecord) => {
    if (new Date(trackRecord.Date) > beginningOfYear) {
      tracksThisYear++
    }
  })
  
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
    <br/>
    <div>Tracks This Year: {tracksThisYear}</div>
  </>
}

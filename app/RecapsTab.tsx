'use client'

import 'leaflet/dist/leaflet.css';
import { printNameAndDate } from './Utils';
import React from 'react';
import { getTrackDataJson, TrackRecord } from './TrackData';

export function RecapsTab() {
  const recapsToPrint: any[] = []
  getTrackDataJson().forEach((trackInfo: TrackRecord, trackNum: number) => {
    if (trackInfo.Recap) {
      recapsToPrint.push({
        name: trackInfo.Track,
        date: trackInfo.Date,
        recap: trackInfo.Recap
      })
    }
    // TODO: ????
    // trackInfo.configs?.forEach((config: any) => {
    //   if (config.Recap) {
    //     recapsToPrint.push({
    //       name: config.Track,
    //       date: config.Date,
    //       recap: config.Recap
    //     })
    //   }
    // })
  })

  return <>
    <h3>Race Recaps</h3>

    {/* <iframe 
      src="https://docs.google.com/document/d/e/2PACX-1vR_VhrF3BPEnGpFblk2zEBEGirLN4BaOSdeYuOOouZKMDw6mC_7lYb6rC9e3khcYsTSg5AKK-SFTotM/pub?embedded=true"
      style={{width: "800px", height: "500px"}}
    /> */}

    {recapsToPrint.map((recapObj) => <React.Fragment key={recapObj.name}>
      <a href={recapObj.recap} target="_blank">{printNameAndDate(recapObj.name, recapObj.date)}</a>
      <br/>
    </React.Fragment>)}
  </>
}

'use client'

import { LeafletMap } from "../Map";
import { TrackRecord } from "../TrackData";
import { printDate, trackIdToTrackRecord } from "../Utils";
import { SingleTrackMap } from "./[trackId]/SingleTrackMap";

export interface SingleTrackProps {
  trackId: string | undefined;
}

export function SingleTrack(props: SingleTrackProps) {
  const track: TrackRecord | null = trackIdToTrackRecord(props.trackId);
  if (track == null) {
    return <>Cannot locate track</>
  }

  console.log("CLICK ON SINGLETRACK " + track.Track)

  const lengthString: string | null = track.Length !== "" ? track.Length + " Mile " : "";

  return <div>
    <h3>Track #{track.Number}: {track.Track}</h3>

    {lengthString}{track.Surface} {track.Type} | {track.City}, {track.State} 
    <br/>
    First Visit: {printDate(track.Date)}

    {/* <SingleTrackMap lat={0} long={9}/> */}

    <br/>
    <br/>
    {
      track.Recap &&
      //832 is apparently the width of the doc, can't make it larger
      <iframe src={track.Recap} style={{width: "832px", height: "80vh"}}/>
    }
  </div>
}

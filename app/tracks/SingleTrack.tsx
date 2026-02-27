'use client'

import { TrackRecord } from "../TrackData";
import { printDate, trackIdToTrackRecord } from "../Utils";

export interface SingleTrackProps {
  trackId: string | undefined;
}

export function SingleTrack(props: SingleTrackProps) {
  const track: TrackRecord | null = trackIdToTrackRecord(props.trackId);
  if (track == null) {
    return <>Cannot locate track</>
  }

  const lengthString: string | null = track.Length !== "" ? track.Length + " Mile " : "";
  const surfaceString = track.Surface;

  return <div>
    <h3>{track.Track}</h3>
    First Visit: {printDate(track.Date)}
    <br/>
    Track # {track.Number} | {track.City}, {track.State} | {lengthString}{track.Surface} {track.Type}

    <br/>
    <br/>
    {
      track.Recap &&
      //832 is apparently the width of the doc, can't make it larger
      <iframe src={track.Recap} style={{width: "832px", height: "500px"}}/>
    }
  </div>
}

'use client'

import { FlipsData, TrackVideo } from "../flips/FlipData";
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

  const lengthString: string | null = track.Length !== "" ? track.Length + " Mile " : "";

  return <div>
    <h3>Track #{track.Number}: {track.Track}</h3>

    {lengthString}{track.Surface} {track.Type} | {track.City}, {track.State} 
    <br/>
    First Visit: {printDate(track.Date)}

    <br/>
    <br/>
    Flips:
    <>
    {
      FlipsData.map((flip: TrackVideo) => {
        if (flip.track === track.Track)
        {
          return <>
            <br/>
            <a href={flip.url}>
              {flip.num}
              &nbsp;
              {
                flip.notes?.map((note: string, index: number, array: string[]) => 
                  <>{`(${note})${index < array.length - 1 ? ", " : ""}`}</>)
              }
            </a>
          </>
        }
      })
    }
    </>

    <br/>
    <br/>
    {
      track.Recap &&
      //832 is apparently the width of the doc, can't make it larger
      <iframe src={track.Recap} style={{width: "832px", height: "80vh"}}/>
    }
  </div>
}

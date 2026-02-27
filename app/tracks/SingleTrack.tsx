'use client'

import { TrackRecord } from "../TrackData";
import { trackIdToTrackRecord } from "../Utils";

export interface SingleTrackProps {
  trackId: string | undefined;
}

export function SingleTrack(props: SingleTrackProps) {
  const track: TrackRecord | null = trackIdToTrackRecord(props.trackId);
  if (track == null) {
    return <>Cannot locate track</>
  }
  return <div>
    <div>{track.Track}</div>
  </div>
}

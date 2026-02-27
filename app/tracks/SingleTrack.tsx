'use client'

import { TrackRecord } from "../TrackData";

export interface TrackPageProps {
  track: TrackRecord;
}

export function TrackPage(props: TrackPageProps) {
  const track: TrackRecord = props.track;
  return <div>
    <div>{track.Track}</div>
  </div>
}

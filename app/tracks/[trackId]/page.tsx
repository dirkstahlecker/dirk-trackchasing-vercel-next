'use client'

import { useParams } from 'next/navigation'
import { SingleTrack } from '../SingleTrack'

export default function () {
  const params = useParams()

  const trackId = params ? params.trackId as string : undefined;
  return <SingleTrack trackId={trackId}/>
}

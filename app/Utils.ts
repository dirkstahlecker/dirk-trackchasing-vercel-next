'use client'

import { getTrackDataJson, TrackRecord } from "./TrackData";

export function printNameAndDate(nameIn: string, dateIn: string) {
  const date = printDate(dateIn)
  const name = nameIn

  if (date === undefined) {
    return nameIn
  }
  return `${date}: ${name}`
}

export function printDate(input: any) {
  if (input === undefined || input === "") {
    return ""
  }
  const d = new Date(input);
  return (d.getUTCMonth() + 1) + '/' +
        d.getUTCDate() + '/' +
        d.getUTCFullYear();
}

export function makeKey(trackRecord: TrackRecord): string {
  return `${trackRecord.Track}${trackRecord.Latitude}${trackRecord.Longitude}`
}

export function getLastTrack(): TrackRecord {
  const trackData = getTrackDataJson();
  const ret = trackData.get(trackData.size)
  if (ret === undefined)
  {
    throw new Error("Cannot get last track")
  }
  return ret;
}
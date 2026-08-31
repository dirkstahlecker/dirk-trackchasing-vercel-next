'use client'

import React from "react"
import { FlipsData, TrackVideo } from "./FlipData"

// flip videos are on TrackchaserDirk YouTube account
export default function FlipsTab() {
  return (
    <div>
      <table style={{ margin: "0 auto", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Num</th>
            <th>Track</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {FlipsData.map((value: TrackVideo) => (
            <tr key={value.url + value.num}>
              <td>{value.num}</td>
              <td>
                <a href={value.url} target="_blank" rel="noopener noreferrer">
                  {value.track}
                </a>
              </td>
              <td>{value.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
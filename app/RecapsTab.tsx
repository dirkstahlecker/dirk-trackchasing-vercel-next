import 'leaflet/dist/leaflet.css';
import { trackDataJson } from './TrackData';
import { printNameAndDate } from './Utils';

export function RecapsTab() {
  const recapsToPrint = []
  for (const trackNum in trackDataJson) {
    const trackInfo = trackDataJson[trackNum]
    if (trackInfo.Recap) {
      recapsToPrint.push({
        name: trackInfo.Track,
        date: trackInfo.Date,
        recap: trackInfo.Recap
      })
    }
    trackInfo.configs?.forEach((config: any) => {
      if (config.Recap) {
        recapsToPrint.push({
          name: config.Track,
          date: config.Date,
          recap: config.Recap
        })
      }
    })
  }

  return <>
    <h3>Race Recaps</h3>
    
    {recapsToPrint.map((recapObj) => <>
      <a href={recapObj.recap}>{printNameAndDate(recapObj.name, recapObj.date)}</a>
      <br/>
    </>)}
  </>
}

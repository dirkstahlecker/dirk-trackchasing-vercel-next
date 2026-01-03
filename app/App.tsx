import "./App.css";
import L from 'leaflet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// function makeMapMarkersWork() {
//   // delete L.Icon.Default.prototype._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//   });
// }

function App() {
  // makeMapMarkersWork()

  return (
    <div className="App box">
      <h1>Dirk Trackchasing</h1>

      <p>Visit my official Trackchasers page&nbsp;
        <a href="http://www.roamingtheraceways.com/overall_individual.php?cid=303" 
          target="_blank"
          className="external-link"
        >
          here
        </a>
      </p>
      <br/>

      <Tabs>
        <TabList>
          <Tab>Race Recaps</Tab>
          <Tab>Flips</Tab>
        </TabList>

        <TabPanel>Recaps</TabPanel>
        <TabPanel>Flips</TabPanel>
      </Tabs>
    </div>
  );
}

export default App;

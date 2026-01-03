'use client'

import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RecapsTab } from "./RecapsTab";
import { FlipsTab } from "./FlipsTab";
import { RacesTab } from "./RacesTab";
import { TracksTab } from "./TracksTab";

export default function App() {
  return (<>
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
          <Tab>Races</Tab>
          <Tab>Tracks</Tab>
          <Tab>Recaps</Tab>
          <Tab>Flips</Tab>
        </TabList>

        <TabPanel><RacesTab/></TabPanel>
        <TabPanel><TracksTab/></TabPanel>
        <TabPanel><RecapsTab/></TabPanel>
        <TabPanel><FlipsTab/></TabPanel>
      </Tabs>

    <div className="footer">
      &copy; Dirk Stahlecker <a href="mailto:TrackchaserDirk@gmail.com">TrackchaserDirk@gmail.com</a>
    </div>
    </div>
  </>);
}

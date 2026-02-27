'use client'

import 'leaflet/dist/leaflet.css'
import "./Header.css";
import 'react-tabs/style/react-tabs.css';
import { ReactNode } from "react";
import Link from "next/link";

export interface AppProps {
  children?: ReactNode;
}

export default function Header(props: AppProps) {
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
      
      {/* <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Tracks</Tab>
          <Tab>Recaps</Tab>
          <Tab>Flips</Tab>
        </TabList>

        <TabPanel><RacesTab/></TabPanel>
        <TabPanel><TracksTab/></TabPanel>
        <TabPanel><RecapsTab/></TabPanel>
        <TabPanel><FlipsTab/></TabPanel>
      </Tabs> */}

      <Link href="/races">Races</Link>
      &nbsp;
      <Link href="/tracks">Tracks</Link>
      &nbsp;
      <Link href="/recaps">Recaps</Link>
      &nbsp;
      <Link href="/flips">Flips</Link>
      <hr/>

      {props.children}

      <div className="footer">
        &copy; Dirk Stahlecker <a href="mailto:TrackchaserDirk@gmail.com">TrackchaserDirk@gmail.com</a>
      </div>
    </div>
  </>);
}

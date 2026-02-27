'use client'

import 'leaflet/dist/leaflet.css'
import "./Header.css";
import 'react-tabs/style/react-tabs.css';
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export interface AppProps {
  children?: ReactNode;
}

enum CurrentTab {RACES = "/races", TRACKS = "/tracks", RECAPS = "/recaps", FLIPS = "/flips"}

export default function Header(props: AppProps) {
  const currentPath = usePathname();

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

      <Link className={`tab ${currentPath === CurrentTab.RACES.valueOf() ? "active" : ""}`} href="/races">Races</Link>
      &nbsp;
      <Link className={`tab ${currentPath === CurrentTab.TRACKS.valueOf() ? "active" : ""}`} href="/tracks">Tracks</Link>
      &nbsp;
      <Link className={`tab ${currentPath === CurrentTab.RECAPS.valueOf() ? "active" : ""}`} href="/recaps">Recaps</Link>
      &nbsp;
      <Link className={`tab ${currentPath === CurrentTab.FLIPS.valueOf() ? "active" : ""}`} href="/flips">Flips</Link>
      <hr/>

      {props.children}

      <div className="footer">
        &copy; Dirk Stahlecker <a href="mailto:TrackchaserDirk@gmail.com">TrackchaserDirk@gmail.com</a>
      </div>
    </div>
  </>);
}

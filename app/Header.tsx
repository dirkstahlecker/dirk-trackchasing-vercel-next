'use client'

import "./Header.css";
import 'react-tabs/style/react-tabs.css';
import { ReactNode } from "react";

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
      <hr/>

      {props.children}

      <div className="footer">
        &copy; Dirk Stahlecker <a href="mailto:TrackchaserDirk@gmail.com">TrackchaserDirk@gmail.com</a>
      </div>
    </div>
  </>);
}

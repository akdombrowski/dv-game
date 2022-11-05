/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import MotionContainer from "./MotionContainer";

const NUMBER_OF_DAVINCIS: number = 1;
const DV_IMG_WIDTH_VW: number = 10;

const generateDVs = (): number[] => {
  const dvs: number[] = [];
  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    const duration = Math.random() * 3 + 2;
    dvs.push(duration);
  }
  return dvs;
};

const whichRandomHasTheLink = Math.floor(Math.random() * NUMBER_OF_DAVINCIS);

const rndPositionFromLeftEdgeNumber = () =>
  Math.random() * 100 - DV_IMG_WIDTH_VW;
const rndPositionFromLeftEdge = () =>
  rndPositionFromLeftEdgeNumber().toString() + "%";

const colWidth = (numOfDVs: number) => {
  Math.floor((100 - DV_IMG_WIDTH_VW) / numOfDVs);
};

const mappingDVs = (dvContainers: number[]) => {
  return (
    <div className="dv-col" style={{ left: rndPositionFromLeftEdge() }}>
      {dvContainers.map((dur, i) => {
        let shouldAdvance = false;
        if (whichRandomHasTheLink === i) {
          shouldAdvance = true;
        } else {
          shouldAdvance = false;
        }

        const props: {
          advance: boolean;
          yInit: string;
          yFinal: string;
          idNumber: number;
          duration: number;
        } = {
          yInit: "25vh",
          yFinal: "50vh",
          advance: shouldAdvance,
          idNumber: i,
          duration: dur,
        };

        // TODO: Work on CSS for what MotionContainer is returning. Start at the highest level object and get that to fit in the width of the dv-col div. Then move to the size of the button.
        return MotionContainer(props);
      })}
    </div>
  );
};

function App() {
  const [isAdvanceDV, setIsAdvanceDV] = useState(false);

  const dvContainers = generateDVs();

  return (
    <div className="content muscle-container">
      <div className="flex-child dvs-holder">{mappingDVs(dvContainers)}</div>
    </div>
  );
}

export default App;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";

const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
const DV_IMG_WIDTH: number = 10;
const DV_IMG_WIDTH_VW: string = DV_IMG_WIDTH.toString() + "vw";

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
  Math.max(0, Math.floor(Math.random() * 100 - DV_IMG_WIDTH));
const rndPositionFromLeftEdge = () =>
  rndPositionFromLeftEdgeNumber().toString() + "%";

const mappingDVs = (dvContainers: number[]) => {
  return (
    <div
      className="dv-col"
      style={{
        left: rndPositionFromLeftEdge(),
        maxWidth: DV_IMG_WIDTH_VW,
        minWidth: DV_IMG_WIDTH_VW,
      }}
    >
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
  const dvContainers = generateDVs();

  const advanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();
    const advFlowInput: HTMLElement | null =
      document.getElementById("advance-flow-input");
    const advFlowBtn: HTMLElement | null =
      document.getElementById("advance-flow-btn");
    if (advFlowInput as HTMLInputElement) {
      const advance = advFlowInput as HTMLInputElement;
      advance.value = "captcha dv";
    }
    advFlowBtn?.click();
  };

  return (
    <div className="content muscle-container">
      <div className="flex-child muscle-container dvs-holder">
        <form id="captcha-dv-form" onSubmit={advanceFlow}>
          {mappingDVs(dvContainers)}
        </form>
        {/* need to show this error as a popup or something */}
        <p
          className="text-danger mdi mdi-alert-circle"
          data-id="feedback"
          data-skcomponent="skerror"
        ></p>
      </div>
    </div>
  );
}

export default App;

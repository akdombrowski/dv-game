/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent, useEffect, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";

const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
const DV_IMG_WIDTH: number = 10;
const DV_IMG_WIDTH_VW: string = DV_IMG_WIDTH.toString() + "vw";
const CHALLENGES = document.getElementById("ids");
const DV_COL_POSITIONS = new Set();

/**
 * It generates an array of random numbers between 2 and 5 for the duration of img moving through its range
 * @returns An array of numbers.
 */
const generateDVs = (): number[] => {
  const dvs: number[] = [];

  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    const duration = Math.random() * 3 + 2;
    dvs.push(duration);
  }

  return dvs;
};

// calculates a random number to place the col contanining an img
// min value is 0 to keep from going off screen to the left
// max value is 99 since I'm converting this to a percentage
const rndPositionFromLeftForImg = () => {
  return Math.max(0, Math.floor(Math.random() * 99 - DV_IMG_WIDTH));
};

/**
 * It generates a random number between 0 and the window width (technically 99%
 * of window width), and if that number is already in the set, it generates a
 * new number until it finds one that isn't in the set to avoid overlapping
 * but limited to 100 iterations
 * @returns A random number between 0 and the window width minus the width of the
 * image.
 */
const rndPosFromLeftEdgeNumber = () => {
  const iterationsToFindLeftPos = 100;
  let rndLeft = rndPositionFromLeftForImg();

  // keep iterations to 100 just to avoid infinite loop. at that point we'll probably have to overlap. if i really want, I can take the total window width and divide it by the dv img width to get when the whole window width should be filled up. but overlapping could make that tricky since I'm only checking for exact position was already used
  for (let i = 0; i < iterationsToFindLeftPos; i++) {
    // if we already have this position try again, else break out and use that
    // value
    if (DV_COL_POSITIONS.has(rndLeft)) {
      rndLeft = rndPositionFromLeftForImg();
    } else {
      break;
    }
  }

  // save value to avoid overlap
  DV_COL_POSITIONS.add(rndLeft);

  return rndLeft;
};

// convert rnd number to percentage
const rndPosPercFromLeftEdge = () =>
  rndPosFromLeftEdgeNumber().toString() + "%";

const getChlls = () => {
  const chs = CHALLENGES?.firstChild;
  let chsStr;
  let chsArr;
  let chlls;
  if (chs) {
    chsStr = chs.textContent;
    chsStr = chsStr?.slice(1, -1) as string;
    chlls = JSON.parse(chsStr);
  }

  return chlls;
};

const mappingDVs = (dvContainers: number[]) => {
  const chlls = getChlls();
  return (
    <>
      {dvContainers.map((dur, i) => {
        let percPosFromLeft = rndPosPercFromLeftEdge();
        const chll = chlls[i];

        const props: {
          yInit: string;
          yFinal: string;
          idNumber: number;
          duration: number;
          challenge: string;
        } = {
          yInit: "25vh",
          yFinal: "50vh",
          idNumber: i,
          duration: dur,
          challenge: chll,
        };

        return (
          <div
            id={"imgCol" + i}
            key={"imgCol" + i}
            className="dv-col"
            style={{
              left: percPosFromLeft,
              maxWidth: DV_IMG_WIDTH_VW,
              minWidth: DV_IMG_WIDTH_VW,
            }}
          >
            {MotionContainer(props)};
          </div>
        );
      })}
    </>
  );
};

function App() {
  const dvContainers = generateDVs();

  const advanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();
    const submitE = e.nativeEvent as SubmitEvent;
    const advFlowInput: HTMLElement | null =
      document.getElementById("advance-flow-input");
    const advFlowBtn: HTMLElement | null =
      document.getElementById("advance-flow-btn");

    console.log("advFlowInput");
    console.log(advFlowInput);

    if (advFlowInput as HTMLInputElement) {
      const advance = advFlowInput as HTMLInputElement;
      const inputEl = submitE.submitter as HTMLInputElement;
      const chll = inputEl.value;

      advance.value = chll;
    }

    advFlowBtn?.click();
  };

  return (
    <div className="content muscle-container">
      <div className="flex-child muscle-container dvs-holder">
        <form id="captcha-dv-form" onSubmit={advanceFlow}>
          {mappingDVs(dvContainers)}
        </form>
        {/* need to show the following error as a popup or something */}
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

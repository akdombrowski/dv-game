/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";
import * as imgs from "./Imgs";

const bgImg = imgs.bgImg;

type img0s = {
  [key: string]: string;
};
type image0Type = keyof img0s;
const img0 = imgs.img0;
const img00 = imgs.img00;
const img000 = imgs.img000;
const img0000 = imgs.img0000;
const img00000 = imgs.img00000;
const img000000 = imgs.img000000;
const img0000000 = imgs.img0000000;
const img00000000 = imgs.img00000000;
const img0s = {
  img0: img0,
  img00: img00,
  img000: img000,
  img0000: img0000,
  img00000: img00000,
  img000000: img000000,
  img0000000: img0000000,
  img00000000: img00000000,
};

type img1s = {
  [key: string]: string;
};
type image1Type = keyof img1s;
const img1 = imgs.img1;
const img11 = imgs.img11;
const img111 = imgs.img111;
const img1111 = imgs.img1111;
const img11111 = imgs.img11111;
const img111111 = imgs.img111111;
const img1111111 = imgs.img1111111;
const img11111111 = imgs.img11111111;
const img1s = {
  img1: img1,
  img11: img11,
  img111: img111,
  img1111: img1111,
  img11111: img11111,
  img111111: img111111,
  img1111111: img1111111,
  img11111111: img11111111,
};

type img2s = {
  [key: string]: string;
};
type image2Type = keyof img2s;
const img2 = imgs.img2;
const img22 = imgs.img22;
const img222 = imgs.img222;
const img2222 = imgs.img2222;
const img22222 = imgs.img22222;
const img222222 = imgs.img222222;
const img2222222 = imgs.img2222222;
const img22222222 = imgs.img22222222;
const img2s = {
  img2: img2,
  img22: img22,
  img222: img222,
  img2222: img2222,
  img22222: img22222,
  img222222: img222222,
  img2222222: img2222222,
  img22222222: img22222222,
};

const images: { [key: string]: string } = { ...img0s, ...img1s, ...img2s };

const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
const DV_IMG_WIDTH = Number("{{global.variables.DV_IMG_WIDTH}}");
const DV_IMG_WIDTH_VW = DV_IMG_WIDTH.toString() + "vw";
const RENDERINGS = document.getElementById("renderings")?.innerText;
const MIN_DURATION = 3;
const MAX_DURATION = 7;

/**
 * It generates an array of random numbers between MIN_DURATION and
 * MIN_DURATION + 4 for the duration of img moving through its range
 * @returns An array of numbers.
 */
const generateDVs = (): number[] => {
  const dvs: number[] = [];

  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    const duration =
      Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION;
    dvs.push(duration);
  }

  return dvs;
};

const convertRenderingsToObj = () => {
  if (RENDERINGS) {
    console.log(RENDERINGS);
    console.log(JSON.parse(RENDERINGS));
    return JSON.parse(RENDERINGS);
  }

  return null;
};

const mappingDVs = (dvContainers: number[]) => {
  const renderings: {
    [key: number]: { value: string; pos: number; img: string };
  } = convertRenderingsToObj();
  // const renderings = RENDERINGS;

  return (
    <>
      {dvContainers.map((dur, i) => {
        // const img =
        //   "url(data:image/png;base64," + images[renderings[i].img] + ")";
        const img = "data:image/png;base64, " + images[renderings[i].img];

        const props: {
          yInit: string;
          yFinal: string;
          idNumber: number;
          duration: number;
          challenge: string;
          bgImg: string;
        } = {
          yInit: "25vh",
          yFinal: "50vh",
          idNumber: i,
          duration: dur,
          challenge: renderings[i].value,
          bgImg: img,
        };

        return (
          <div
            id={"imgCol" + i}
            key={"imgCol" + i}
            className="dv-col flex-child"
            style={{
              left: renderings[i].pos.toString() + "%",
              maxWidth: DV_IMG_WIDTH_VW,
              minWidth: DV_IMG_WIDTH_VW,
            }}
          >
            {MotionContainer(props)}
          </div>
        );
      })}
    </>
  );
};

function App() {
  const dvContainers = generateDVs();
  const mainContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // get the container that the main background image is displaying on
    // const bgImageContainer = document.getElementById(
    //   "mainContainer"
    // ) as HTMLDivElement;
    const bgImageContainer = mainContainer.current as HTMLDivElement;
    console.log("mainContainer");
    console.log(mainContainer);
    console.log("mainContainer.current");
    console.log(mainContainer.current);

    if (bgImageContainer) {
      // get dimensions of main background image's container
      const height = bgImageContainer.offsetHeight;
      const width = bgImageContainer.offsetWidth;

      // get the container for the dv-cols
      const dvColsContainer = document.getElementById("dvColsContainer");
      const captchaDVForm = document.getElementById("captcha-dv-form");
      // cast as div element
      const dvsHolderDiv = dvColsContainer as HTMLDivElement;
      const captchaDVFormDiv = captchaDVForm as HTMLDivElement;
      // set that div element's dimensions to match the main background
      // container's dimensions
      console.log("width, height");
      console.log(width, height);

      // dvsHolderDiv.style.maxHeight = String(height) + "px";
      // dvsHolderDiv.style.minHeight = String(height) + "px";
      // dvsHolderDiv.style.height = String(height) + "px";
      // dvsHolderDiv.style.maxWidth = String(width) + "px";
      // dvsHolderDiv.style.minWidth = String(width) + "px";
      // dvsHolderDiv.style.width = String(width) + "px";
      // captchaDVFormDiv.style.maxHeight = String(height) + "px";
      // captchaDVFormDiv.style.minHeight = String(height) + "px";
      // captchaDVFormDiv.style.height = String(height) + "px";
      // captchaDVFormDiv.style.maxWidth = String(width) + "px";
      // captchaDVFormDiv.style.minWidth = String(width) + "px";
      // captchaDVFormDiv.style.width = String(width) + "px";
    } else {
      console.log("bg img container not found");
    }
  }, [mainContainer]);

  const advanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();
    const submitE = e.nativeEvent as SubmitEvent;
    const advFlowInput: HTMLElement | null =
      document.getElementById("advance-flow-input");
    const advFlowBtn: HTMLElement | null =
      document.getElementById("advance-flow-btn");

    if (advFlowInput as HTMLInputElement) {
      const advance = advFlowInput as HTMLInputElement;
      const inputEl = submitE.submitter as HTMLInputElement;
      const chll = inputEl.value;

      advance.value = chll;
    }

    advFlowBtn?.click();
  };

  return (
    <div
      id="mainContainer"
      ref={mainContainer}
      className="content muscle-container sceneImg"
      style={{ backgroundImage: "url(data:image/png;base64," + bgImg + ")" }}
    >
      <div
        id="dvColsContainer"
        className="flex-child muscle-container dvs-holder full-child"
      >
        <form
          id="captcha-dv-form"
          className="flex-form full-child"
          onSubmit={advanceFlow}
        >
          {mappingDVs(dvContainers)}
        </form>
        {/* need to show the following error as a popup or something
        <p
          className="text-danger mdi mdi-alert-circle"
          data-id="feedback"
          data-skcomponent="skerror"
        ></p>
        */}
      </div>
    </div>
  );
}

export default App;

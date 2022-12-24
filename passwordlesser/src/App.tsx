/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  BaseSyntheticEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";
import * as imgs from "./Imgs";
import { MotionValue, useMotionValue } from "framer-motion";

const bgImg = imgs.bgImg;

type img0sType = {
  [key: string]: string;
};
type image0Type = keyof img0sType;
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

type img1sType = {
  [key: string]: string;
};
type image1Type = keyof img1sType;
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

type img2sType = {
  [key: string]: string;
};
type image2Type = keyof img2sType;
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
const MIN_DURATION = 4;
const MAX_DURATION = 7;
const IMG_Y_INIT = "0px";

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
    return JSON.parse(RENDERINGS);
  } else {
    console.error("missing renderings");
  }

  return null;
};

const renderings: {
  [key: number]: { value: string; pos: number; img: string };
} = convertRenderingsToObj();

function App() {
  const [yInit, setYInit] = useState("-1000px");
  const [yFinal, setYFinal] = useState("1080px");
  const mainContainer = useRef<HTMLDivElement>(null);
  const dvContainers = generateDVs();
  const currentYValue: MotionValue<number> = useMotionValue(0);

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];
        const dvMotionDiv = document.querySelector(
          ".dv-motion-div"
        ) as HTMLDivElement;
        const h = dvMotionDiv.offsetHeight;
        const hPX = -h + "px";

        currentYValue.set(-h);
        setYInit(hPX);
        setYFinal(contentBoxSize.blockSize + "px");
      }
    }
  });

  useEffect(() => {
    const dvMotionDiv = document.querySelector(
      ".dv-motion-div"
    ) as HTMLDivElement;
    const h = dvMotionDiv.offsetHeight;
    const hPX = -h + "px";

    setYInit(hPX);
  }, []);

  useEffect(() => {
    // get the container that the main background image is displaying on
    // const bgImageContainer = document.getElementById(
    //   "mainContainer"
    // ) as HTMLDivElement;
    const bgImageContainer = mainContainer.current as HTMLDivElement;

    if (bgImageContainer) {
      resizeObserver.observe(bgImageContainer);
    } else {
      console.error("main bg img container not found");
    }

    return () => {
      resizeObserver.unobserve(bgImageContainer);
    };
  }, []);

  const updateValueAndAdvanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();
    const advFlowValue = document.getElementById(
      "advFlowValue"
    ) as HTMLInputElement;
    const advFlowSubmitBtn = document.getElementById(
      "advFlowSubmitBtn"
    ) as HTMLInputElement;

    if (advFlowValue as HTMLInputElement) {
      const advance = advFlowValue as HTMLInputElement;
      const target = e.target as HTMLInputElement;
      const value = target.value;

      advance.value = value;
    }

    advFlowSubmitBtn?.click();
  };

  const mappingDVs = (dvContainers: number[]) => {
    return (
      <>
        {dvContainers.map((dur, i) => {
          // const img =
          //   "url(data:image/png;base64," + images[renderings[i].img] + ")";
          const img = "data:image/png;base64, " + images[renderings[i].img];

          const props: {
            yInit: string | number;
            yFinal: string | number;
            yMotionValue: MotionValue<number>;
            idNumber: number;
            duration: number;
            challenge: string;
            bgImg: string;
            handleClick: Function;
          } = {
            yInit: yInit,
            yFinal: yFinal,
            yMotionValue: currentYValue,
            idNumber: i,
            duration: dur,
            challenge: renderings[i].value,
            bgImg: img,
            handleClick: updateValueAndAdvanceFlow,
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
          onSubmit={updateValueAndAdvanceFlow}
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

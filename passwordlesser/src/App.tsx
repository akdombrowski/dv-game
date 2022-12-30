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
import { MotionValue, useMotionValue } from "framer-motion";
import { debug } from "util";

const NUMBER_OF_DAVINCIS = 14; //Number("{{global.variables.difficulty}}");
const DV_IMG_WIDTH = 5; //Number("{{global.variables.DV_IMG_WIDTH}}");
const DV_IMG_WIDTH_VW = DV_IMG_WIDTH.toString() + "vw";
const RENDERINGS = document.getElementById("renderings")?.innerText;
const MIN_DURATION = 4;
const MAX_DURATION = 7;
const IMG_Y_INIT = "0px";

const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";

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

const precacheAllImagesNeeded = async () => {
  if (!renderings) {
    return new Promise<Error>(() => new Error("didn't get renderings info"));
  }

  const proms: Promise<void>[] = [];
  const imgsSet = new Set();

  for (const r of Object.values(renderings)) {
    const imgs = [];
    imgs.push(r.img);
    if (!imgsSet.has(r.img)) {
      imgsSet.add(r.img);
      const img = new Image();
      img.src = r.img;

      const ev = new Event("imgLoaded");
      img.addEventListener(
        ev.type,
        () => new Promise(() => console.log("image" + r.img + "loaded"))
      );

      img.onload = () => new Event("imgLoaded");
      img.onerror = () => new Event("imgLoadFailed");

      proms.push(
        new Promise((resolve, reject) => {
          img.addEventListener("imgLoaded", () => resolve());
          img.addEventListener("imgLoadFailed", () =>
            reject(r.img + " loadingg failed")
          );
        })
      );
    }
  }

  return proms;
};

function App() {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [yInit, setYInit] = useState("-100px");
  const [yFinal, setYFinal] = useState("1080px");
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  const dvContainers = generateDVs();
  const currentYValue: MotionValue<number> = useMotionValue(0);
  let mainContainer = useRef<HTMLDivElement | null>(null);

  const waitForImages = async () => {
    await precacheAllImagesNeeded();
    setImgsLoaded(true);
  };

  // const setInitialAndFinalYPositions = () => {
  //   const contentBoxSize = entry.contentBoxSize[0];
  //   const dvMotionDiv = document.querySelector(
  //     ".dv-motion-div"
  //   ) as HTMLDivElement;
  //   const h = dvMotionDiv.offsetHeight;
  //   const top = h * -1.1;
  //   const bottom = contentBoxSize.blockSize * 1.1;
  //   const topPX = top + "px";
  //   const bottomPX = bottom + "px";

  //   console.log("currentYValue");
  //   console.log(currentYValue);
  //   console.log("topPX");
  //   console.log(topPX);
  //   currentYValue.set(top);
  //   console.log("setYInit:", topPX);
  //   console.log("setYFinal:", bottomPX);
  //   setYInit(topPX);
  //   setYFinal(bottomPX);
  // };

  const resizeObserver = new ResizeObserver((entries) => {
    // entry is a ResizeObserverEntry
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];
        const dvMotionDiv = document.querySelector(
          ".dv-motion-div"
        ) as HTMLDivElement;
        const h = dvMotionDiv.offsetHeight;
        const top = h * -1.1;
        const bottom = Math.floor(contentBoxSize.blockSize /100) * 10 * 1.1;
        const topPX = -10 + "%";
        const bottomPX = 110 + "%";

        console.log("entry");
        console.log(entry);

        console.log("currentYValue");
        console.log(currentYValue);
        console.log("topPX");
        console.log(topPX);
        currentYValue.set(top);
        console.log("setYInit:", topPX);
        console.log("setYFinal:", bottomPX);
        setYInit(topPX);
        setYFinal(bottomPX);
      }
    }
  });

  useEffect(() => {
    console.log("dvContainers");
    console.log(dvContainers);

    waitForImages();
  }, []);

  useEffect(() => {
    if (!imgsLoaded) {
      const dvMotionDiv = document.querySelector(
        ".dv-motion-div"
      ) as HTMLDivElement;
      const height = dvMotionDiv?.clientHeight * -1.1;

      console.log("set yInit to:", height);
      console.log(height);

      if (height) {
        setYInit(height + "px");
      }
    } else {
      const bgImageContainer = document.getElementById(
        "mainContainer"
      ) as HTMLDivElement;
      console.log("mainContainer");
      console.log(mainContainer);
      console.log("bgImageContainer");
      console.log(bgImageContainer);

      // const bgImageContainer = mainContainer.current as HTMLDivElement;
      // const bgImageContainer = mainContainer; //.current as HTMLDivElement;

      if (bgImageContainer) {
        resizeObserver.observe(bgImageContainer);
        // resizeObserver.observe();
        return () => {
          resizeObserver.unobserve(bgImageContainer);
        };
      } else {
        console.error("main bg img container not found");
      }
    }
  }, [imgsLoaded]);

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
          const props: {
            yInit: string | number;
            yFinal: string | number;
            yMotionValue: MotionValue<number>;
            idNumber: number;
            duration: number;
            challenge: string;
            img: string;
            handleClick: Function;
          } = {
            yInit: yInit,
            yFinal: yFinal,
            yMotionValue: currentYValue,
            idNumber: i,
            duration: dur,
            challenge: renderings[i].value,
            img: renderings[i].img,
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

  return imgsLoaded ? (
    <div
      id="mainContainer"
      ref={mainContainer}
      className="content muscle-container sceneImg"
      style={{ backgroundImage: "url(" + bgImg + ")" }}
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
  ) : (
    <div>Loading...</div>
  );
}

export default App;

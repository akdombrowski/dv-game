/* eslint-disable jsx-a11y/anchor-is-valid */
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";

// for local dev
// const DV_IMG_WIDTH = 5;
// const NUMBER_OF_DAVINCIS = 14;
const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
const DV_IMG_WIDTH = Number("{{global.variables.DV_IMG_WIDTH}}");
const DV_IMG_WIDTH_VW = DV_IMG_WIDTH.toString() + "vw";
const RENDERINGS = document.getElementById("renderings")?.innerText;
const MIN_DURATION = 4;
const MAX_DURATION = 7;
const windowW = window.innerWidth;
const convert5VWToNumValue = (windowW / 100) * 5;

// for local dev
// const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";
const bgImg = "{{global.variables.themeSrc}}";

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

  const proms: Promise<string>[] = [];
  const imgsSet = new Set();

  for (const r of Object.values(renderings)) {
    const imgs = [];
    imgs.push(r.img);

    if (!imgsSet.has(r.img)) {
      imgsSet.add(r.img);
      const img = new Image();
      img.src = r.img;

      img.onload = () => new Event("imgLoaded");
      img.onerror = () => new Event("imgLoadFailed");

      proms.push(
        new Promise<string>((resolve, reject) => {
          img.addEventListener("imgLoaded", () =>
            resolve("loaded: " + img.src)
          );
          img.addEventListener("imgLoadFailed", () =>
            reject("loading failed for image: " + r.img)
          );
        })
      );
    }
  }

  return proms;
};

function App() {
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [bgImageContainerHeight, setBgImageContainerHeight] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const dvContainers = generateDVs();

  const waitForImages = async () => {
    await precacheAllImagesNeeded();
    setImgsLoaded(true);
  };

  useEffect(() => {
    console.log("in useEffect b4 waitForImages");

    waitForImages();

    console.log("in useEffect after waitForImages");
  }, []);

  const resizeObserver = new ResizeObserver((entries) => {
    const containerH = document.getElementById("mainContainer")?.clientHeight;
    const containerW = document.getElementById("mainContainer")?.clientWidth;
    const top = convert5VWToNumValue * -1.05;

    // entry is a ResizeObserverEntry
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];
        const bottom = contentBoxSize.blockSize;

        setBgImageContainerHeight(bottom);
      }
    }
  });

  useEffect(() => {
    if (imgsLoaded) {
      console.log("images are loaded");

      if (mainContainerRef?.current) {
        const curr = mainContainerRef.current as HTMLDivElement;
        resizeObserver.observe(curr);
        return () => {
          resizeObserver.unobserve(curr);
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
            idNumber: number;
            duration: number;
            challenge: string;
            img: string;
            handleClick: Function;
            imgsLoaded: boolean;
            bgImageContainerHeight: number;
          } = {
            idNumber: i,
            duration: dur,
            challenge: renderings[i].value,
            img: renderings[i].img,
            handleClick: updateValueAndAdvanceFlow,
            imgsLoaded: imgsLoaded,
            bgImageContainerHeight: bgImageContainerHeight,
          };

          return (
            <div
              id={"imgCol" + i}
              key={"imgCol" + i}
              className="dv-col"
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
      ref={mainContainerRef}
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
  );
}

export default App;

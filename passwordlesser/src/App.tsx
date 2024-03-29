/* eslint-disable jsx-a11y/anchor-is-valid */
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";

// for local dev
// const DV_IMG_SIZE = 20;
// const NUMBER_OF_DAVINCIS = 2;
// const DV_IMG_WIDTH_VW = DV_IMG_SIZE.toString() + "vw";
// const DV_IMG_HEIGHT_VH = DV_IMG_SIZE.toString() + "vh";
const DV_IMG_SIZE = Number("{{global.variables.DV_IMG_SIZE}}");
const DV_IMG_SIZE_RACING = Number("{{global.variables.DV_IMG_SIZE_RACING}}");
const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
const RENDERINGS = document.getElementById("renderings")?.innerText;
const MIN_DUR = 4;
const MAX_DUR = 8;

// for local dev
// const theme = "racing";
// const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";
// const bgImg = "https://i.ibb.co/ystvSH8/race-Track.png";
const theme = "{{global.variables.theme}}";
const bgImg = "{{global.variables.themeSrc}}";

/**
 * It generates an array of random numbers between MIN_DURATION and
 * MIN_DURATION + 4 for the duration of img moving through its range
 * @returns An array of numbers.
 */
const generateDurations = (): number[] => {
  const dvs: number[] = [];
  let min = MIN_DUR;
  let max = MAX_DUR;
  if (theme.startsWith("racing")) {
    min = 10;
    max = 20;
  }

  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    const duration = Math.random() * (max - min) + min;
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
  const [bgImageContainerWidth, setBgImageContainerWidth] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const dvContainers = generateDurations();

  const waitForImages = async () => {
    await precacheAllImagesNeeded();
    setImgsLoaded(true);
  };

  useEffect(() => {
    waitForImages();
  }, []);

  const resizeObserver = new ResizeObserver((entries) => {
    // entry is a ResizeObserverEntry
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];
        const height = contentBoxSize.blockSize;
        const width = contentBoxSize.inlineSize;

        setBgImageContainerHeight(height);
        setBgImageContainerWidth(width);
      }
    }
  });

  useEffect(() => {
    if (imgsLoaded) {
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
    let vwOrVH: string;
    let size: number;
    if (theme.startsWith("racing")) {
      vwOrVH = "vh";
      size = DV_IMG_SIZE_RACING;
    } else {
      vwOrVH = "vw";
      size = DV_IMG_SIZE;
    }
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
            bgImageContainerWidth: number;
            theme: string;
            imgSize: number;
            vwOrVH: string;
          } = {
            idNumber: i,
            duration: dur,
            challenge: renderings[i].value,
            img: renderings[i].img,
            handleClick: updateValueAndAdvanceFlow,
            imgsLoaded: imgsLoaded,
            bgImageContainerHeight: bgImageContainerHeight,
            bgImageContainerWidth: bgImageContainerWidth,
            theme: theme,
            imgSize: size,
            vwOrVH: vwOrVH,
          };

          let style;
          let rowOrClass;
          if (theme.startsWith("racing")) {
            style = {
              top: renderings[i].pos.toString() + "%",
              height: size + "%",
            };
            rowOrClass = "dv-row";
          } else {
            style = {
              left: renderings[i].pos.toString() + "%",
              width: size + "%",
            };
            rowOrClass = "dv-col";
          }
          return (
            <div
              id={"imgCol" + i}
              key={"imgCol" + i}
              className={rowOrClass}
              style={style}
            >
              {MotionContainer(props)}
            </div>
          );
        })}
      </>
    );
  };

  const calcFlexDirection = () => {
    if (theme.startsWith("racing")) {
      return "flex-child muscle-container dv-rows full-child";
    } else {
      return "flex-child muscle-container dv-cols full-child";
    }
  };

  return (
    <div
      id="mainContainer"
      ref={mainContainerRef}
      className="content muscle-container sceneImg"
      style={{ backgroundImage: "url(" + bgImg + ")" }}
    >
      <div id="dvsContainer" className={calcFlexDirection()}>
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

/* eslint-disable jsx-a11y/anchor-is-valid */
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";

// for local dev
const IMG_SIZE = 6;
const IMG_SIZE_RACING = 16;
const NUMBER_OF_DAVINCIS = 9;
const IMG_SIZE_VW = IMG_SIZE.toString() + "vw";
const IMG_HEIGHT_VH = IMG_SIZE.toString() + "vh";
// const IMG_SIZE = Number("{{global.variables.IMG_SIZE}}");
// const IMG_SIZE_RACING = Number("{{global.variables.IMG_SIZE_RACING}}");
// const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
const RENDERINGS = document.getElementById("renderings")?.innerText;
const MIN_DUR = 4;
const MAX_DUR = 8;

// for local dev
const theme = "racing";
// const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";
const bgImg = "https://i.postimg.cc/DzjCwcwW/race-Track.webp";
// const theme = "{{global.variables.theme}}";
// const bgImg = "{{global.variables.themeSrc}}";

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
    min = 5;
    max = 25;
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

const precacheImage = (
  imgsSet: Set<string>,
  imgSrc: string,
  proms: Promise<string>[]
) => {
  const img = new Image();
  imgsSet.add(imgSrc);
  proms.push(
    new Promise<string>((resolve, reject) => {
      img.onload = () => {
        console.log(imgSrc, "loaded");
        resolve("loaded: " + imgSrc);
      };
      img.onerror = () => {
        console.log(imgSrc, "loading failed");
        reject("loading failed for image: " + imgSrc);
      };
    })
  );

  img.src = imgSrc;
  img.loading = "eager";
  return { imgsSet, proms };
};

const precacheBGImage = (bgImg: string) => {
  const imgsSet = new Set<string>();
  let proms: Promise<string>[] = [];

  ({ proms } = precacheImage(imgsSet, bgImg, proms));

  return proms;
};

const precacheAllImagesNeeded = () => {
  if (!renderings) {
    throw new Error("didn't get renderings info");
  }

  let proms: Promise<string>[] = [];
  let imgsSet = new Set<string>();

  for (const r of Object.values(renderings)) {
    if (theme.startsWith("racing")) {
      const img0 = r.img[0];
      const img1 = r.img[1];

      if (!imgsSet.has(img0)) {
        ({ imgsSet, proms } = precacheImage(imgsSet, img0, proms));
      }
      if (!imgsSet.has(img1)) {
        ({ imgsSet, proms } = precacheImage(imgsSet, img1, proms));
      }
    } else {
      if (!imgsSet.has(r.img)) {
        ({ imgsSet, proms } = precacheImage(imgsSet, r.img, proms));
      }
    }
  }

  return proms;
};

function App() {
  const [bgImgLoaded, setBGImgLoaded] = useState(false);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [bgImageContainerHeight, setBgImageContainerHeight] = useState(0);
  const [bgImageContainerWidth, setBgImageContainerWidth] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const dvContainers = generateDurations();

  const waitForBGImage = async () => {
    await Promise.all(precacheBGImage(bgImg));
    setBGImgLoaded(true);
  };

  const waitForImages = async () => {
    await Promise.all(precacheAllImagesNeeded());
    setImgsLoaded(true);
  };

  useEffect(() => {
    waitForBGImage();
  }, []);

  useEffect(() => {
    waitForImages();
  }, [bgImgLoaded]);

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
      size = IMG_SIZE_RACING;
    } else {
      vwOrVH = "vw";
      size = IMG_SIZE;
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
      style={bgImgLoaded ? { backgroundImage: "url(" + bgImg + ")" } : {}}
    >
      <h1 style={bgImgLoaded ? { display: "none" } : {}}>Loading...</h1>
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

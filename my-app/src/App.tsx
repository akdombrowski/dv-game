/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { animated, useSpring } from "@react-spring/web";
import spring from "./spring";
import { motion } from "framer-motion";

const FadeIn = () => {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return <animated.div style={props}>I will fade in</animated.div>;
};

const NUMBER_OF_DAVINCIS = 10;

const generateDVs = (): number[] => {
  const dvs: number[] = [];
  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    dvs.push(i);
  }
  return dvs;
};

const dvContainers = generateDVs();

const mappingDVs = dvContainers.map((el, i) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // Calc width stuff
  const dvImgWidth = 10;
  const dvImgWidthStyle = "10vw";
  const dvImgWidthInPX = windowWidth * (10 / 100);
  const positionFromLeftEdge =
    Math.random() * windowWidth - dvImgWidthInPX + "px";

  // calc height stuff
  // aspect ratio is roughly 1.19
  const dvImgHeightPX = 1.19 * dvImgWidthInPX;
  const negDVImgHeightPX = 1.19 * dvImgWidthInPX * -1 * 2;
  // aspect ratio is roughly 1.19 and width is set to 100vw, aka
  // 100% of window.innerWidth
  const anthonyImgHeightPX = 1.19 * windowWidth;
  // const style = document.createElement("style");
  // document.getElementsByTagName("head")[0].appendChild(style);

  const pastAnthonyPicHeight = anthonyImgHeightPX + dvImgHeightPX;
  const duration = Math.random() * 3 + 10; // + "s";

  /**
   * framer-motion makes things a lot easier
   *
   * e.g.,
   * <motion.div
   *  initial={{ x: "100%" }}
   *  animate={{ x: "calc(100vw - 50%)" }}
   * />
   *
   */

  console.log("negDVImgHeightPX");
  console.log(negDVImgHeightPX);

  return (
    <motion.div
      initial={{ opacity: 0.9, x: positionFromLeftEdge, y: negDVImgHeightPX }}
      animate={{ opacity: 1, x: positionFromLeftEdge, y: pastAnthonyPicHeight }}
      transition={{
        repeat: Infinity,
        delay: 1,
        duration: duration,
        repeatType: "reverse",
      }}
      exit={{
        opacity: 0.9,
        x: positionFromLeftEdge,
        y: pastAnthonyPicHeight + 10,
      }}
      className="dv"
      key={"dv" + i}
      id={"dv" + i}
    >
      <img
        className="dvImg"
        id={"dvImg" + el}
        alt="davinci"
        src="https://i.imgur.com/B9wl1Gh.png"
      />
    </motion.div>
  );
});

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shows, setShows] = useState([]);

  return (
    <div className="content">
      <a
        id="screen-clickable"
        data-skcomponent="skbutton"
        data-skbuttonvalue="signOnPWReset"
        href=""
      >
        <div className="muscle-container container">
          <div className="flex-child anthony">
            <img
              className="imgEl"
              alt="anthony"
              src="https://i.imgur.com/8I6bO52.png"
            />
          </div>
          <div className="flex-child dvs-holder">{mappingDVs}</div>
        </div>
      </a>
    </div>
  );
}

export default App;

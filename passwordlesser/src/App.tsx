/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { motion } from "framer-motion";

const NUMBER_OF_DAVINCIS = 30;

const generateDVs = (): number[] => {
  const dvs: number[] = [];
  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    dvs.push(i);
  }
  return dvs;
};

const dvContainers = generateDVs();

const whichRandomHasTheLink = Math.floor(Math.random() * NUMBER_OF_DAVINCIS);

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
  const duration = Math.random() * 3 + 2; // + "s";

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

  if (i === whichRandomHasTheLink) {
    return (
      <motion.div
        initial={{ x: positionFromLeftEdge, y: "-40vh" }}
        animate={{
          x: positionFromLeftEdge,
          y: "120vh",
        }}
        transition={{
          repeat: Infinity,
          // delay: 1,
          duration: duration,
          repeatType: "reverse",
        }}
        className="dv-motion-div"
        key={"dv" + i}
        id={"dv" + i}
      >
        <a
          id="screen-clickable"
          data-skcomponent="skbutton"
          data-skbuttonvalue="signOnPWReset"
          data-skbuttontype="next-form"
          href=""
        >
          <div
            className="imgWrapper"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          >
            <img
              className="dvImg"
              id={"dvImg" + el}
              alt="davinci"
              src="https://i.imgur.com/B9wl1Gh.png"
            />
          </div>
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: positionFromLeftEdge, y: "-40vh" }}
      animate={{
        x: positionFromLeftEdge,
        y: "120vh",
      }}
      transition={{
        repeat: Infinity,
        // delay: 1,
        duration: duration,
        repeatType: "reverse",
      }}
      className="dv-motion-div"
      key={"dv" + i}
      id={"dv" + i}
    >
      {/* <a
        id="screen-clickable"
        data-skcomponent="skbutton"
        data-skbuttonvalue="signOnPWReset"
        href=""
      > */}
      <div>
        <img
          className="dvImg"
          id={"dvImg" + el}
          alt="davinci"
          src="https://i.imgur.com/B9wl1Gh.png"
        />
      </div>
      {/* </a> */}
    </motion.div>
  );
});

// const form = (
//   <div className="form">
//     <div
//       data-skcomponent="skerror"
//       className="feedback feedback--error sk-alert sk-alert-danger has-text-danger has-background-danger-light"
//       data-id="feedback"
//       data-skvisibility=""
//     ></div>
//     <form className="form" id="usernamePasswordForm" data-id="usernamePasswordForm">
//       <div className="field float-label">
//         <input
//           className="text-input float-label__input"
//           data-id="username-input"
//           id="username"
//           name="username"
//           type="text"
//           value=""
//         />
//         <label className="float-label__label" for="username">
//           Username
//         </label>
//       </div>
//       <div className="field float-label">
//         <input
//           className="text-input text-input--pasword float-label__input"
//           data-id="password-input"
//           id="password"
//           name="password"
//           type="password"
//           autocomplete="on"
//           value=""
//         />
//         <label className="float-label__label" for="password">
//           Password
//         </label>
//       </div>
//       <div className="control">
//         <button
//           className="field is-primary mt-2 button file-input--button button--primary brand-primary-bg"
//           data-id="button"
//           type="submit"
//           data-skcomponent="skbutton"
//           data-skbuttontype="form-submit"
//           data-skform="usernamePasswordForm"
//           data-skbuttonvalue="submit"
//         >
//           Sign On
//           <i className="fas fa-forward ml-2"></i>
//         </button>
//       </div>
//       <div className="control">
//         <div style="width: 100%; text-align: center;">
//           <button
//             type="submit"
//             className="buttonLink is-primary is-inverted mt-2"
//             data-skcomponent="skbutton"
//             data-skbuttontype="form-submit"
//             data-skform="usernamePasswordForm"
//             data-skbuttonvalue="forgotPassword"
//           >
//             Forgot Password
//             <i className="fas fa-forward ml-2"></i>
//           </button>
//         </div>
//       </div>
//     </form>
//   </div>
// );

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shows, setShows] = useState([]);

  return (
    <div className="content">
      {/* <a
        id="screen-clickable"
        data-skcomponent="skbutton"
        data-skbuttonvalue="signOnPWReset"
        href=""
      > */}
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
      {/* </a> */}
    </div>
  );
}

export default App;

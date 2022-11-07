import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// example from mdn
// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }
// postData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });

// literally pulling from dev tools running a different flow
const postData = (
  url: string,
  data: {
    id: string;
    nextEvent: {
      constructType: string;
      eventName: string;
      params: string[];
      eventType: string;
      postProcess: {};
      // async function postData(url = "", data = {}) {
      //   // Default options are marked with *
      //   const response = await fetch(url, {
      //     method: "POST", // *GET, POST, PUT, DELETE, etc.
      //     mode: "cors", // no-cors, *cors, same-origin
      //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: "same-origin", // include, *same-origin, omit
      //     headers: {
      //       "Content-Type": "application/json",
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //     redirect: "follow", // manual, *follow, error
      //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //     body: JSON.stringify(data), // body data type must match "Content-Type" header
      //   });
      //   return response.json(); // parses JSON response into native JavaScript objects
      // }
      // postData("https://example.com/answer", { answer: 42 }).then((data) => {
      //   console.log(data); // JSON data parsed by `data.json()` call
      // });
      // literally pulling from dev tools running a different flow
    };
  }
) => {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
    mode: "cors",
  });
};

const wrongDV = (e: SyntheticEvent) => {
  e.preventDefault();
  console.log("Oops, that's not the real DaVinci.");
};

const advance = async (e: SyntheticEvent) => {
  e.preventDefault();
  const data = {
    eventName: "continue",
    id: "k24psuiatw",
    nextEvent: {
      constructType: "skEvent",
      eventName: "continue",
      params: [],
      eventType: "post",
      postProcess: {},
    },
  };

  const envID = "d0dd90cf-dbb9-42aa-89c5-56fefdba73c9";
  const connectionID = "481e952e6b11db8360587b8711620786";
  const url =
    "https://auth.pingone.com/" +
    envID +
    "/davinci/connections/" +
    connectionID +
    "/capabilities/customHTMLTemplate";
  await postData(url, data);
};

const MotionContainer = (props: {
  idNumber: number;
  advance: boolean;
  yInit: string;
  yFinal: string;
  duration: number;
}) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // Calc width stuff
  const dvImgWidth = 10;
  const dvImgWidthStyle = "10vw";
  const dvImgWidthInPX = windowWidth * (10 / 100);
  // const positionFromLeftEdge =
  //   props.fromLeftEdge * windowWidth - dvImgWidthInPX + "px";

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

  if (props.advance) {
    return (
      <motion.div
        className="dv-motion-div muscle-container"
        key={"dv" + props.idNumber}
        id={"dv" + props.idNumber}
        initial={{ y: props.yInit }}
        animate={{
          y: props.yFinal,
        }}
        transition={{
          repeat: Infinity,
          // delay: 1,
          duration: props.duration,
          repeatType: "reverse",
        }}
      >
        <form
          id={"form" + props.idNumber}
          className="form-btn-wrapper"
          method="post"
        >
          {/* <div className="btn-wrapper"> */}
          <button
            className="flex-child dv-btn-img skbutton_form-submit"
            id={"ofa-btn-" + props.idNumber}
            onClick={advance}
            data-skbuttonvalue="button"
            // data-skform={"form" + props.idNumber}
            // data-skbuttontype="form-submit"
            data-skcomponent="skbutton"
            data-skskipvalidation
            formMethod="post"
            formTarget={"form" + props.idNumber}
            type="button"
            data-id="button"
            name="ofa-btn"
          ></button>
          {/* </div> */}
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="dv-motion-div muscle-container"
      key={"dv" + props.idNumber}
      id={"dv" + props.idNumber}
      initial={{ y: props.yInit }}
      animate={{
        y: props.yFinal,
      }}
      transition={{
        repeat: Infinity,
        // delay: 1,
        duration: props.duration,
        repeatType: "reverse",
      }}
    >
      {/* <div className="btn-wrapper"> */}
      {/* <form className="form"> */}
      <button
        className="flex-child dv-btn-img skbutton_form-submit"
        id={"skbutton_form-submit-" + props.idNumber}
        onClick={wrongDV}
        data-skbuttonvalue="buton"
        data-skbuttontype="butt"
        data-skcomponent="skbutton"
        type="button"
        data-id="button"
        name="ofa-btn"
      ></button>
      {/* </form> */}
      {/* </div> */}
    </motion.div>
  );
};

MotionContainer.propTypes = {};

export default MotionContainer;

import { SyntheticEvent } from "react";
import { motion } from "framer-motion";

const CONTINUE_BTN_VAL = "found-me";
const XSRF_TOKEN_COOKIE_NAME = "XSRF-TOKEN";

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

const createXSRFOriginCookieObject = (xsrfToken: string) => {
  return {
    "XSRF-TOKEN": xsrfToken,
  };
};

const getXSRFTokenOriginCookie = () => {
  const xsrfToken = getCookieValue(XSRF_TOKEN_COOKIE_NAME);
  const xsrfTokenOriginCookieHeaderValue =
    createXSRFOriginCookieObject(xsrfToken);
  return xsrfTokenOriginCookieHeaderValue;
};

const getXSRFTokenOriginCookieURIEncoded = () => {
  const xsrfTokenOriginCookieHeaderValue = getXSRFTokenOriginCookie();
  const urlEncodedXSRFTokenOriginCookieHeaderValue = encodeURIComponent(
    JSON.stringify(xsrfTokenOriginCookieHeaderValue)
  );

  return urlEncodedXSRFTokenOriginCookieHeaderValue;
};

const getInteractionToken = () => {
  const interactionToken = getCookieValue("interactionToken");
  return interactionToken;
};

const getInteractionID = () => {
  const interactionID = getCookieValue("interactionId");
  return interactionID;
};

const postData = async (
  url: string,
  data: {
    id: string;
    nextEvent: {
      constructType: string;
      eventName: string;
      params: string[];
      eventType: string;
      postProcess: {};
    };
  }
) => {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      interactionid: "undefined",
      interactiontoken: "undefined",
      "origin-cookies": getXSRFTokenOriginCookieURIEncoded(),
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
    id: "j66zw7fx8p",
    nextEvent: {
      constructType: "skEvent",
      eventName: "continue",
      params: [],
      eventType: "post",
      postProcess: {},
    },
    parameters: { buttonType: "next-event", buttonValue: CONTINUE_BTN_VAL },
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
  const formID = "form" + props.idNumber.toString();
  const formInputName = "formInput" + props.idNumber.toString();
  const formMethod = "post";
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

  if (props.advance) {
    return (
      <motion.div
        className="dv-motion-div"
        key={"dv" + props.idNumber}
        id={"dv"}
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
        <button
          data-skcustomloadingindicatorclass=""
          data-skcustomloadingindicator=""
          data-skdefaultloadingcolor=""
          data-skbuttonimageclass=""
          data-skbuttonimageplacement=""
          data-skbuttonimage=""
          data-skotpinput=""
          data-skform="captcha-dv-form"
          data-skbuttontype="form-submit"
          data-skbuttonvalue="captcha-dv"
          data-skbuttonevent=""
          data-skvalue="captcha-dv"
          className="skbutton-next"
          id="dv"
          data-skcomponent="skbutton"
          type="submit"
        ></button>
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
      <button
        className="skbutton_next"
        id={"ofa-btn-" + props.idNumber}
        data-skcustomloadingindicatorclass=""
        data-skcustomloadingindicator=""
        data-skdefaultloadingcolor=""
        data-skbuttontype="next-event"
        data-skbuttonvalue={CONTINUE_BTN_VAL}
        data-skbuttonevent=""
        data-skvalue={CONTINUE_BTN_VAL}
        data-skcomponent="skbutton"
        type="submit"
      ></button>
    </motion.div>
  );
};

MotionContainer.propTypes = {};

export default MotionContainer;

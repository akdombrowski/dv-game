/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";

const NUMBER_OF_DAVINCIS: number = 1;
const DV_IMG_WIDTH: number = 10;
const DV_IMG_WIDTH_VW: string = DV_IMG_WIDTH.toString() + "vw";

const generateDVs = (): number[] => {
  const dvs: number[] = [];
  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    const duration = Math.random() * 3 + 2;
    dvs.push(duration);
  }
  return dvs;
};

const whichRandomHasTheLink = Math.floor(Math.random() * NUMBER_OF_DAVINCIS);

const rndPositionFromLeftEdgeNumber = () =>
  Math.floor(Math.random() * 100 - DV_IMG_WIDTH);
const rndPositionFromLeftEdge = () =>
  rndPositionFromLeftEdgeNumber().toString() + "%";

// const colWidthNumber = (numOfDVs: number) => {
//   return Math.floor((100 - DV_IMG_WIDTH) / numOfDVs);
// };
// const colWidth = colWidthNumber(NUMBER_OF_DAVINCIS).toString() + "vw";

const mappingDVs = (dvContainers: number[]) => {
  return (
    <div
      className="dv-col"
      style={{
        left: rndPositionFromLeftEdge(),
        maxWidth: DV_IMG_WIDTH_VW,
        minWidth: DV_IMG_WIDTH_VW,
      }}
    >
      {dvContainers.map((dur, i) => {
        let shouldAdvance = false;
        if (whichRandomHasTheLink === i) {
          shouldAdvance = true;
        } else {
          shouldAdvance = false;
        }

        const props: {
          advance: boolean;
          yInit: string;
          yFinal: string;
          idNumber: number;
          duration: number;
        } = {
          yInit: "25vh",
          yFinal: "50vh",
          advance: shouldAdvance,
          idNumber: i,
          duration: dur,
        };

        // TODO: Work on CSS for what MotionContainer is returning. Start at the highest level object and get that to fit in the width of the dv-col div. Then move to the size of the button.
        return MotionContainer(props);
      })}
    </div>
  );
};

function App() {
  const dvContainers = generateDVs();
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

  const oldadvanceFlow = async (e: SyntheticEvent) => {
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
      parameters: { buttonType: "form-submit", buttonValue: "captchaDV" },
    };

    const envID = "6f04905c-9d86-4012-95c1-16486d20e26e";
    const connectionID = "867ed4363b2bc21c860085ad2baa817d";
    const url =
      "https://auth.pingone.com/" +
      envID +
      "/davinci/connections/" +
      connectionID +
      "/capabilities/customHTMLTemplate";
    await postData(url, data);

    // const dv: dvScript | null = document.querySelector(
    //   'script[src="https://assets.pingone.com/davinci/latest/davinci.js"]'
    // );
    // call the dv load screen script (doesn't come from this app)
    // dv?.loadIt();
    // console.log(dv?.props);
  };

  const advanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();
    const advFlowInput: HTMLElement | null =
      document.getElementById("advance-flow-input");
    const advFlowBtn: HTMLElement | null =
      document.getElementById("advance-flow-btn");
    if (advFlowInput as HTMLInputElement) {
      const advance = advFlowInput as HTMLInputElement;
      advance.value = "captcha dv";
    }
    advFlowBtn?.click();
  };

  // onSubmit={advanceFlow}

  // <form id="advance-flow-form">
  //   <button
  //     id="advance-flow-btn"
  //     data-id="advance-flow-btn"
  //     type="submit"
  //     data-skcomponent="skbutton"
  //     data-skbuttontype="form-submit"
  //     data-skbuttonvalue="submit"
  //     data-skform="advance-flow-form"
  //     className="hidden"
  //   ></button>
  // </form>;

  return (
    <div className="content muscle-container">
      <div className="flex-child muscle-container dvs-holder">
        <form id="captcha-dv-form" onSubmit={advanceFlow}>
          {mappingDVs(dvContainers)}
        </form>
      </div>
    </div>
  );
}

export default App;

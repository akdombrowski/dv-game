import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { animated, useSpring } from "@react-spring/web";
import spring from "./spring";

const FadeIn = () => {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return <animated.div style={props}>I will fade in</animated.div>;
};

function App() {
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
            <img className="imgEl" src="https://i.imgur.com/8I6bO52.png" />
          </div>
          <div className="flex-child dvs-holder">
            <div className="dv">
              <img className="imgEl" src="https://i.imgur.com/B9wl1Gh.png" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default App;

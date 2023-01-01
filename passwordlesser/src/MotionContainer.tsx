import { MotionValue, motion, useMotionValue } from "framer-motion";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

const MotionContainer = (props: {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  imgsLoaded: boolean;
}) => {
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  const windowH = window.innerHeight;
  const windowW = window.innerWidth;
  const convert5VWToNumValue = (windowW / 100) * 5;
  const y = useMotionValue(0);
  const [yInitial, setYInitial] = useState(0);
  const [yFinal, setYFinal] = useState(0);
  const bgImageContainer = document.getElementById(
    "mainContainer"
  ) as HTMLDivElement;

  const calculateYInitial = () => {
    const curr = dvMotionDiv.current;
    const yPos = y.get();
    if (curr) {
      if (yPos < 0) {
        console.log("id:", props.idNumber);
        console.log("y:", y.get());
        console.log("curr.clientHeight:", curr.clientHeight);
        console.log("formula:", "curr.clientHeight * -1.05");
        console.log("setYInitial:", curr.clientHeight * -1.05);
        setYInitial(curr.clientHeight * -1.05);
      } else {
        console.log("id:", props.idNumber);
        console.log("y:", y.get());
        console.log("curr.clientHeight:", curr.clientHeight);
        console.log("formula:", "yPos * -1 + curr.clientHeight * -1.05");
        console.log("setYInitial:", yPos * -1 + curr.clientHeight * -1.05);
        setYInitial(yPos * -1 + curr.clientHeight * -1.05);
      }
    } else {
      console.log("id:", props.idNumber);
      console.log("y:", y.get());
      console.log("convert5VWToNumValue:", convert5VWToNumValue);
      console.log("formula:", "convert5VWToNumValue * -1.05");
      console.log("setYInitial:", convert5VWToNumValue * -1.05);
      setYInitial(convert5VWToNumValue * -1.05);
    }
  };

  const calculateYFinal = () => {
    const mainContainer = document.getElementById("mainContainer");

    if (mainContainer) {
      if (y.get() < 0) {
        console.log("id:", props.idNumber);
        console.log("y:", y.get());
        console.log("mainContainer.clientHeight:", mainContainer.clientHeight);
        if (dvMotionDiv.current) {
          console.log(
            "formula:",
            "mainContainer.clientHeight + dvMotionDiv.current.clientHeight"
          );
          console.log(
            "setYFinal:",
            mainContainer.clientHeight + dvMotionDiv.current.clientHeight
          );
          setYFinal(
            mainContainer.clientHeight + dvMotionDiv.current.clientHeight
          );
        } else {
          console.log("formula:", "mainContainer.clientHeight * 1.05");
          console.log("setYFinal:", mainContainer.clientHeight * 1.05);
          setYFinal(mainContainer.clientHeight * 1.05);
        }
      } else {
        console.log("id:", props.idNumber);
        console.log("y:", y.get());
        console.log("mainContainer.clientHeight:", mainContainer.clientHeight);
        console.log(
          "formula:",
          "(mainContainer.clientHeight - y.get()) * 1.05"
        );
        console.log(
          "setYFinal:",
          (mainContainer.clientHeight - y.get()) * 1.05
        );
        setYFinal((mainContainer.clientHeight - y.get()) * 1.05);
      }
    } else {
      console.log("id:", props.idNumber);
      console.log("y:", y.get());
      console.log("windowH:", windowH);
      console.log("formula:", "windowH * 1.05");
      console.log("setYFinal:", windowH * 1.05);
      setYFinal(windowH * 1.05);
    }
  };

  useEffect(() => {
    calculateYInitial();
    calculateYFinal();
  }, [dvMotionDiv, bgImageContainer]);

  const resizeObserver = new ResizeObserver((entries) => {
    const containerH = document.getElementById("mainContainer")?.clientHeight;
    const containerW = document.getElementById("mainContainer")?.clientWidth;
    const h = y.get();
    const top = convert5VWToNumValue
      ? Math.max(h, convert5VWToNumValue) * -1.5
      : -100;

    // entry is a ResizeObserverEntry
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];
        const bottom = contentBoxSize.blockSize;
        const topPX = top + "px";
        const bottomPX = bottom * 1.1 + "px";
        // const bottomPX = bottom + "vh";

        // console.log("h:", h);

        // console.log("convert5VWToNumValue", convert5VWToNumValue);

        // console.log("windowH:", windowH);
        // console.log("windowW:", windowW);

        // console.log("id:", props.idNumber);
        // console.log("topPX:", topPX);
        // console.log("bottomPX:", bottomPX);
        // console.log("yMotionValue.get():", h);
        // console.log("yMotionValue.set(top):", top);
        calculateYInitial();
        calculateYFinal();
      }
    }
  });

  useEffect(() => {
    if (props.imgsLoaded) {
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
  }, [props.imgsLoaded]);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    props.handleClick(e);
  };

  return props.imgsLoaded ? (
    <motion.div
      ref={dvMotionDiv}
      className="dv-motion-div muscle-container"
      id={"motionDV" + props.idNumber}
      style={{ y }}
      initial={{ y: yInitial }}
      animate={{
        y: yFinal,
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: props.duration,
          repeatType: "reverse",
          type: "tween",
        },
      }}
      whileHover={{
        scale: 3,
        translateY: 0,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 10, translateY: 0, transition: { duration: 0.01 } }}
      exit={{ scale: 100, transition: { duration: 0.01 } }}
    >
      <input
        id={"dvBtn" + props.idNumber}
        name={"dvBtn" + props.idNumber}
        alt={"captcha image option"}
        className="skbutton-next backgroundImg"
        type="image"
        onClick={handleClick}
        value={props.challenge}
        src={props.img}
      ></input>
      {/* style={{ backgroundImage: props.bgImg }} */}
    </motion.div>
  ) : (
    <div>Loading...</div>
  );
};

export default MotionContainer;

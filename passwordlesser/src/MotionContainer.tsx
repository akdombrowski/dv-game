import { MotionValue, motion, useMotionValue } from "framer-motion";
import { SyntheticEvent, useEffect, useRef } from "react";

const MotionContainer = (props: {
  yInit: string | number;
  yFinal: string | number;
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
  const initYPos = convert5VWToNumValue * -1.5;
  const y = useMotionValue(0);

  const resizeObserver = new ResizeObserver((entries) => {
    const containerH = document.getElementById("mainContainer")?.clientHeight;
    const containerW = document.getElementById("mainContainer")?.clientWidth;
    const h = y.get();
    const top =
      (h ? Math.max(h, convert5VWToNumValue) : convert5VWToNumValue) * -1.5;

    // entry is a ResizeObserverEntry
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];
        const bottom = Math.ceil(contentBoxSize.blockSize / 10);
        const topPX = top + "px";
        const bottomPX = ((bottom * windowH) / 100) * 1.1 + "px";
        // const bottomPX = bottom + "vh";

        console.log("topPX:", topPX);
        console.log("bottomPX:", bottomPX);
        console.log("yMotionValue.get():", h);
        console.log("yMotionValue.set(top):", top);
        y.set(top);
      }
    }
  });

  useEffect(() => {
    if (props.imgsLoaded) {
      const bgImageContainer = document.getElementById(
        "mainContainer"
      ) as HTMLDivElement;

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

  return (
    <motion.div
      ref={dvMotionDiv}
      className="dv-motion-div muscle-container"
      id={"motionDV" + props.idNumber}
      style={{ y }}
      // initial={{ y: props.yInit }}
      animate={{
        y: props.yFinal,
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
  );
};

export default MotionContainer;


import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useAnimationControls,
} from "framer-motion";
import {
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type motioncontainerprops = {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  imgsLoaded: boolean;
  bgImageContainerHeight: number;
  bgImageContainerWidth: number;
  theme: string;
  imgStackSize: number;
  movementSize: number;
  moveDir: string;
};

const convert5WToPx = () => {
  const windowW = window.innerWidth;
  return (windowW / 100) * 5;
};

const MotionContainer = (props: motioncontainerprops) => {
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  const bgImageContainerHeight = props.bgImageContainerHeight;
  const bgImageContainerWidth = props.bgImageContainerWidth;
  const y = useMotionValue(0);
  const xRight = useMotionValue("-100vw");
  const xLeft = useMotionValue("100vw");
  const bottomYVal = (-100 * 16) / 9 + "vh";
  const topYVal = (100 * 16) / 9 + "vh";
  const yBottom = useMotionValue(bottomYVal);
  const yTop = useMotionValue(topYVal);
  const [yFinal, setYFinal] = useState(0);
  const xRightControls = useAnimationControls();
  const xLeftControls = useAnimationControls();
  const yDownControls = useAnimationControls();
  const yUpControls = useAnimationControls();
  const imgStackSizeHPX =
    props.bgImageContainerHeight * props.imgStackSize * 0.01;
  const imgStackSizeWPX =
    props.bgImageContainerHeight * props.imgStackSize * 0.01;
  const imgStackSizePerc = props.imgStackSize + "%";
  const imgMovementSizeHPX = (imgStackSizeHPX * 16) / 9;
  const imgMovementSizeWPX = (imgStackSizeWPX * 16) / 9;
  const imgMovementSizeHPerc =
    (imgMovementSizeHPX / props.bgImageContainerWidth) * 100 + "%";
  const imgMovementSizeWPerc =
    (imgMovementSizeWPX / props.bgImageContainerHeight) * 100 + "%";
  const rightEdge = props.bgImageContainerWidth + imgMovementSizeHPX;
  const leftEdge = props.bgImageContainerWidth - rightEdge - imgMovementSizeHPX;
  const bottomEdge = props.bgImageContainerHeight + imgMovementSizeWPX;
  const topEdge =
    props.bgImageContainerHeight - bottomEdge - imgMovementSizeWPX;
  const racingThemeTransition = {
    type: "tween",
    duration: props.duration + 2,
    repeat: 0,
    ease: "linear",
  };

  const startMovingRightAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    xRightControls.set({
      x: startPos,
    });
    return xRightControls.start({
      x: rightEdge,
      transition: racingThemeTransition,
    });
  };
  const startMovingLeftAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    xLeftControls.set({
      x: startPos,
    });
    return xLeftControls.start({
      x: leftEdge,
      transition: racingThemeTransition,
    });
  };

  const startMovingDownAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    yDownControls.set({
      y: startPos,
    });
    return yDownControls.start({
      y: bottomEdge,
      transition: racingThemeTransition,
    });
  };
  const startMovingUpAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    yUpControls.set({
      y: startPos,
    });
    return yUpControls.start({
      y: topEdge,
      transition: racingThemeTransition,
    });
  };

  useEffect(() => {
    if (props.theme === "racing") {
      startMovingRightAnimation(0);
    } else {
      startMovingDownAnimation(0);
    }
  });

  useMotionValueEvent(xRight, "animationComplete", () => {
    startMovingLeftAnimation(rightEdge);
  });
  useMotionValueEvent(xLeft, "animationComplete", () => {
    startMovingRightAnimation(leftEdge);
  });
  useMotionValueEvent(yBottom, "animationComplete", () => {
    startMovingUpAnimation(rightEdge);
  });
  useMotionValueEvent(yTop, "animationComplete", () => {
    startMovingDownAnimation(leftEdge);
  });

  useLayoutEffect(() => {
    const pxSizeOf5W = convert5WToPx();

    calculateYInitial(pxSizeOf5W);
    calculateYFinal(bgImageContainerHeight);
  }, [bgImageContainerHeight]);

  const calculateYInitial = (pxSizeOf5W: number) => {
    y.set(pxSizeOf5W * -1);
  };

  const calculateYFinal = (bgImageContainerHeight: number) => {
    setYFinal(bgImageContainerHeight);
  };

  const createMotionDivBasedOnTheme = () => {
    if (props.theme === "racing") {
      return (
        <>
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motionRight" + props.idNumber}
            data-theme={props.theme}
            data-left-edge={leftEdge}
            data-right-edge={rightEdge}
            data-img-movement-size-px={imgMovementSizeHPX}
            data-img-movement-size-perc={imgMovementSizeHPerc}
            data-img-size-px={imgStackSizeHPX}
            data-img-size-perc={imgStackSizePerc}
            animate={xRightControls}
            style={{ x: xRight, width: imgStackSizePerc }}
            whileHover={{
              scale: 3,
              translateY: 0,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 10,
              translateY: 0,
              transition: { duration: 0.01 },
            }}
            exit={{ scale: 1000, transition: { duration: 0.1 } }}
          >
            <input
              id={"meImg" + props.idNumber}
              name={"meImg" + props.idNumber}
              alt={"kaptcha answer option"}
              className="image-btn-x"
              type="image"
              src={props.img[0]}
              style={{ width: "100%" }}
            ></input>
          </motion.div>
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motionLeft" + props.idNumber}
            data-theme={props.theme}
            data-left-edge={leftEdge}
            data-right-edge={rightEdge}
            data-img-movement-size-perc={imgMovementSizeHPerc}
            data-img-size-px={imgStackSizeHPX}
            data-img-size-perc={imgStackSizePerc}
            style={{ x: xLeft, width: imgStackSizePerc }}
            animate={xLeftControls}
            whileHover={{
              scale: 3,
              translateY: 0,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 10,
              translateY: 0,
              transition: { duration: 0.01 },
            }}
            exit={{ scale: 1000, transition: { duration: 0.1 } }}
          >
            <input
              id={"meImg" + props.idNumber}
              name={"meImg" + props.idNumber}
              alt={"kaptcha answer option"}
              className="image-btn-x"
              type="image"
              src={props.img[1]}
              style={{ width: "100%" }}
            ></input>
          </motion.div>
        </>
      );
    } else {
      return (
        <>
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motion" + props.idNumber}
            data-theme={props.theme}
            data-top-edge={topEdge}
            data-bottom-edge={bottomEdge}
            data-img-movement-size-perc={imgMovementSizeWPerc}
            data-img-size-px={imgStackSizeWPX}
            data-img-size-perc={imgStackSizePerc}
            style={{ y: yTop, height: imgStackSizePerc }}
            animate={yDownControls}
            whileHover={{
              scale: 3,
              translateY: 0,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 10,
              translateY: 0,
              transition: { duration: 0.01 },
            }}
            exit={{ scale: 1000, transition: { duration: 0.1 } }}
          >
            <input
              id={"meImgDown" + props.idNumber}
              name={"meImgDown" + props.idNumber}
              alt={"kaptcha answer option"}
              className="image-btn-x"
              type="image"
              src={props.img}
              style={{ width: "100%" }}
            ></input>
          </motion.div>
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motionUp" + props.idNumber}
            data-theme={props.theme}
            data-top-edge={topEdge}
            data-bottom-edge={bottomEdge}
            data-img-movement-size-perc={imgMovementSizeWPerc}
            data-img-size-px={imgStackSizeWPX}
            data-img-size-perc={imgStackSizePerc}
            style={{ y: yTop, height: imgStackSizePerc }}
            animate={yUpControls}
            whileHover={{
              scale: 3,
              translateY: 0,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 10,
              translateY: 0,
              transition: { duration: 0.01 },
            }}
            exit={{ scale: 1000, transition: { duration: 0.1 } }}
          >
            <input
              id={"meImgUp" + props.idNumber}
              name={"meImgUp" + props.idNumber}
              alt={"kaptcha answer option"}
              className="image-btn-x"
              type="image"
              src={props.img}
              style={{ width: "100%" }}
            ></input>
          </motion.div>
        </>
      );
    }
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    props.handleClick(e);
  };

  return props.imgsLoaded ? (
    createMotionDivBasedOnTheme()
  ) : (
    <div>Loading...</div>
  );
};

export default MotionContainer;
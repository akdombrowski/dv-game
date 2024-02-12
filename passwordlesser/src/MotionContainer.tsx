
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
  const downYVal = (-100 * 9) / 16;
  const yDownVH = downYVal + "vh";
  const upYVal = (100 * 9) / 16;
  const yUpVH = upYVal + "vh";
  const yDown = useMotionValue(yDownVH);
  const yUp = useMotionValue(yUpVH);
  const [yFinal, setYFinal] = useState(0);
  const xRightControls = useAnimationControls();
  const xLeftControls = useAnimationControls();
  const yDownControls = useAnimationControls();
  const yUpControls = useAnimationControls();
  const imgStackSizePX =
    props.bgImageContainerHeight * props.imgStackSize * 0.01;
  const imgStackSizePerc = props.imgStackSize + "%";
  const imgMovementSizePX = (imgStackSizePX * 16) / 9;
  const imgMovementSizePerc =
    (imgMovementSizePX / props.bgImageContainerWidth) * 100 + "%";
  const rightEdge = props.bgImageContainerWidth + imgMovementSizePX;
  const leftEdge = props.bgImageContainerWidth - rightEdge - imgMovementSizePX;
  const downEdge = props.bgImageContainerHeight + imgMovementSizePX;
  const upEdge = props.bgImageContainerHeight - downEdge - imgMovementSizePX;
  const offEdgeTransition = {
    type: "tween",
    duration: props.duration + 2,
    repeat: 0,
    ease: "linear",
  };

  // horizontal movement
  const startMovingRightAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    xRightControls.set({
      x: startPos,
    });
    return xRightControls.start({
      x: rightEdge,
      transition: offEdgeTransition,
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
      transition: offEdgeTransition,
    });
  };

  // vertical movement
  const startMovingDownAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    yDownControls.set({
      y: startPos,
    });
    return yDownControls.start({
      y: downEdge,
      transition: offEdgeTransition,
    });
  };
  const startMovingUpAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    yUpControls.set({
      y: startPos,
    });
    return yUpControls.start({
      y: upEdge,
      transition: offEdgeTransition,
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
  useMotionValueEvent(yDown, "animationComplete", () => {
    startMovingUpAnimation(downEdge);
  });
  useMotionValueEvent(yUp, "animationComplete", () => {
    startMovingDownAnimation(upEdge);
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
            data-img-movement-size-px={imgMovementSizePX}
            data-img-movement-size-perc={imgMovementSizePerc}
            data-img-size-px={imgStackSizePX}
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
            data-img-movement-size-perc={imgMovementSizePerc}
            data-img-size-px={imgStackSizePX}
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
            data-top-edge={upEdge}
            data-bottom-edge={downEdge}
            data-img-movement-size-perc={imgMovementSizePerc}
            data-img-size-px={imgStackSizePX}
            data-img-size-perc={imgStackSizePerc}
            style={{ y: yDown, height: imgStackSizePerc }}
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
            data-top-edge={upEdge}
            data-bottom-edge={downEdge}
            data-img-movement-size-perc={imgMovementSizePerc}
            data-img-size-px={imgStackSizePX}
            data-img-size-perc={imgStackSizePerc}
            style={{ y: yUp, height: imgStackSizePerc }}
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
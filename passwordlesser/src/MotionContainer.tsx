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

const convert5WToPx = () => {
  const windowW = window.innerWidth;
  return (windowW / 100) * 5;
};

const MotionContainer = (props: {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  imgsLoaded: boolean;
  bgImageContainerHeight: number;
  bgImageContainerWidth: number;
  theme: string;
}) => {
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  const bgImageContainerHeight = props.bgImageContainerHeight;
  const y = useMotionValue(0);
  const x = useMotionValue("0");
  const xRight = useMotionValue(0);
  const xLeft = useMotionValue("100vw");
  const [yFinal, setYFinal] = useState(0);
  const [xFinal, setXFinal] = useState(0);
  const [xDir, setXDir] = useState("right");
  const xRightControls = useAnimationControls();
  const xLeftControls = useAnimationControls();

  useEffect(() => {
    xRightControls.start({
      x: "100vw",
      transition: {
        repeat: 0,
        duration: props.duration,
        type: "tween",
      },
    });
    xLeftControls.set({
      x: "100vw",
    });
  });

  useMotionValueEvent(xRight, "animationComplete", () => {
    console.log("animation complete on xRight");
    xLeftControls.set({
      x: "100vw",
    });
    xLeftControls.start({
      x: "-10vw",
      transition: {
        repeat: 0,
        duration: props.duration,
        type: "tween",
      },
    });
  });
  useMotionValueEvent(xLeft, "animationComplete", () => {
    console.log("animation complete on xLeft");
    xRightControls.set({
      x: "-10vw",
    });
    xRightControls.start({
      x: "100vw",
      transition: {
        repeat: 0,
        duration: props.duration,
        type: "tween",
      },
    });
  });

  const calculateYInitial = (pxSizeOf5W: number) => {
    y.set(pxSizeOf5W * -1);
  };

  const calculateYFinal = (bgImageContainerHeight: number) => {
    setYFinal(bgImageContainerHeight);
  };

  const calculateXFinal = (bgImageContainerWidth: number) => {
    setXFinal(bgImageContainerWidth);
  };

  const createMotionDivBasedOnTheme = () => {
    if (props.theme === "racing") {
      return (
        <>
          <motion.div
            ref={dvMotionDiv}
            className="dv-motion-div muscle-container"
            id={"motionDVRight" + props.idNumber}
            animate={xRightControls}
            style={{ x: xRight }}
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
            exit={{ scale: 0.5, transition: { duration: 0.1 } }}
          >
            <input
              id={"dvBtn" + props.idNumber}
              name={"dvBtn" + props.idNumber}
              alt={"captcha image option"}
              className="skbutton-next backgroundImg"
              type="image"
              onClick={handleClick}
              value={props.challenge}
              src={props.img[0]}
            ></input>
          </motion.div>
          <motion.div
            ref={dvMotionDiv}
            className="dv-motion-div muscle-container"
            id={"motionDVLeft" + props.idNumber}
            style={{ x: xLeft }}
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
            exit={{ scale: 0.5, transition: { duration: 0.1 } }}
          >
            <input
              id={"dvBtn" + props.idNumber}
              name={"dvBtn" + props.idNumber}
              alt={"captcha image option"}
              className="skbutton-next backgroundImg"
              type="image"
              onClick={handleClick}
              value={props.challenge}
              src={props.img[1]}
            ></input>
          </motion.div>
        </>
      );
    } else {
      return (
        <motion.div
          ref={dvMotionDiv}
          className="dv-motion-div muscle-container"
          id={"motionDV" + props.idNumber}
          style={{ y }}
          // initial={{ y: yInitial }}
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
          whileTap={{
            scale: 10,
            translateY: 0,
            transition: { duration: 0.01 },
          }}
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
        </motion.div>
      );
    }
  };

  useLayoutEffect(() => {
    const pxSizeOf5W = convert5WToPx();

    calculateYInitial(pxSizeOf5W);
    calculateYFinal(bgImageContainerHeight);
  }, [bgImageContainerHeight]);

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

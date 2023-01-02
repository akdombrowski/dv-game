import { MotionValue, motion, useMotionValue } from "framer-motion";
import {
  MutableRefObject,
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const MotionContainer = (props: {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  imgsLoaded: boolean;
  bgImageContainerHeight: number;
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
  const bgImageContainerHeight = props.bgImageContainerHeight;

  const calculateYInitial = () => {
    y.set(0);
  };

  const calculateYFinal = (
    dvMotionDiv: MutableRefObject<HTMLDivElement | null>,
    bgImageContainerHeight: number
  ) => {
    setYFinal(bgImageContainerHeight);
  };

  useLayoutEffect(() => {
    calculateYInitial();
    calculateYFinal(dvMotionDiv, bgImageContainerHeight);
  }, [dvMotionDiv, bgImageContainerHeight]);

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
      // initial={{ y: "0vh" }}
      animate={{
        y: document.getElementById("mainContainer")?.clientHeight || "100vh",
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
    </motion.div>
  ) : (
    <div>Loading...</div>
  );
};

export default MotionContainer;

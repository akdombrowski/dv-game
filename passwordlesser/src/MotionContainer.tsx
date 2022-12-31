import { MotionValue, motion, useMotionValue } from "framer-motion";
import { SyntheticEvent, useRef } from "react";

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
  const containerH = document.getElementById("mainContainer")?.clientHeight;
  const containerW = document.getElementById("mainContainer")?.clientWidth;
  const dvMotionDiv = document.querySelector(
    ".dv-motion-div"
  ) as HTMLDivElement;
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  const yMotionValue: MotionValue<number> = useMotionValue(0);
  const windowH = window.innerHeight;
  const windowW = window.innerWidth;
  const convert5VWToPX = (windowW / 100) * 5;
  const h = dvMotionDiv.offsetHeight;
  const top = Math.max(h, convert5VWToPX) * -1.5;
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    props.handleClick(e);
  };

  const yMV = props.yMotionValue;

  return (
    <motion.div
      className="dv-motion-div muscle-container"
      id={"motionDV" + props.idNumber}
      initial={{ y: props.yInit }}
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

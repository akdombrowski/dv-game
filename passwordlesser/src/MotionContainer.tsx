import { MotionValue, motion } from "framer-motion";
import { SyntheticEvent } from "react";

const MotionContainer = (props: {
  yInit: string | number;
  yFinal: string | number;
  yMotionValue: MotionValue<number>;
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
}) => {
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    props.handleClick(e);
  };

  const yMV = props.yMotionValue;

  console.log("idNumber");
  console.log(props.idNumber);
  console.log("duration");
  console.log(props.duration);

  return (
    <motion.div
      className="dv-motion-div muscle-container"
      id={"motionDV" + props.idNumber}
      initial={{ y: props.yInit }}
      animate={{
        y: props.yFinal,
      }}
      transition={{
        repeat: Infinity,
        duration: props.duration,
        repeatType: "reverse",
        type: "tween",
      }}
      whileHover={{
        scale: 1.5,
        translateY: 0,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 2, translateY: 0, transition: { duration: 0.5 } }}
      exit={{ scale: 10, transition: { duration: 0.1 } }}
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

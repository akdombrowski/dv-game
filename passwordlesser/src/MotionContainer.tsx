import { MotionValue, motion } from "framer-motion";
import { SyntheticEvent } from "react";

const MotionContainer = (props: {
  yInit: string | number;
  yFinal: string | number;
  yMotionValue: MotionValue<number>;
  idNumber: number;
  duration: number;
  challenge: string;
  bgImg: string;
  handleClick: Function;
}) => {
  const variants = {
    init: {
      y: props.yInit,
      transition: {
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
    final: {
      y: props.yFinal,
    },
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    props.handleClick(e);
  };

  return (
    <motion.div
      className="dv-motion-div muscle-container"
      id={"motionDV" + props.idNumber}
      initial="init"
      animate="final"
      style={{
        y: props.yMotionValue,
      }}
      transition={{
        repeat: Infinity,
        duration: props.duration,
        repeatType: "reverse",
      }}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 2, transition: { duration: 0.1 } }}
    >
      <input
        id={"dvBtn" + props.idNumber}
        name={"dvBtn" + props.idNumber}
        alt={"captcha image option"}
        className="skbutton-next backgroundImg"
        type="image"
        onClick={handleClick}
        value={props.challenge}
        src={props.bgImg}
      ></input>
      {/* style={{ backgroundImage: props.bgImg }} */}
    </motion.div>
  );
};

export default MotionContainer;

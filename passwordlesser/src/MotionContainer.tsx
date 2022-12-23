import { MotionValue, motion } from "framer-motion";
import { SyntheticEvent } from "react";

const clickSubmitBtn = (e: SyntheticEvent) => {
  e.preventDefault();
  const submitBtn = document.getElementById("submitBtn") as HTMLInputElement;
  submitBtn.click();
};

const MotionContainer = (props: {
  yInit: string | number;
  yFinal: string | number;
  yMotionValue: MotionValue<number>;
  idNumber: number;
  duration: number;
  challenge: string;
  bgImg: string;
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
  return (
    <motion.div
      className="dv-motion-div muscle-container"
      id={"motionDV" + props.idNumber}
      initial="init"
      animate="final"
      variants={variants}
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
        formNoValidate
        id="submitBtn"
        name="submitBtn"
        className="hidden"
        type="submit"
        form="captcha-dv-form"
      ></input>
      <input
        id={"dvBtn" + props.idNumber}
        name={"dvBtn" + props.idNumber}
        alt={"captcha image option"}
        className="skbutton-next backgroundImg"
        type="image"
        onClick={clickSubmitBtn}
        value={props.challenge}
        src={props.bgImg}
      ></input>
      {/* style={{ backgroundImage: props.bgImg }} */}
    </motion.div>
  );
};

export default MotionContainer;

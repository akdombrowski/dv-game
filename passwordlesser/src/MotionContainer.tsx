import { motion } from "framer-motion";
import { SyntheticEvent } from "react";

const clickSubmitBtn = (e: SyntheticEvent) => {
  e.preventDefault();
  const submitBtn = document.getElementById("submitBtn") as HTMLInputElement;
  submitBtn.click();
};

const MotionContainer = (props: {
  yInit: string;
  yFinal: string;
  idNumber: number;
  duration: number;
  challenge: string;
  bgImg: string;
}) => {
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
      }}
      style={{}}
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

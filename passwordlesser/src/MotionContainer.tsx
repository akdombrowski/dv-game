import { motion } from "framer-motion";

const MotionContainer = (props: {
  yInit: string;
  yFinal: string;
  idNumber: number;
  duration: number;
  challenge: string;
}) => {
  return (
    <motion.div
      className="dv-motion-div"
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
    >
      <input
        id={"dvBtn" + props.idNumber}
        name={"dvBtn" + props.idNumber}
        className="skbutton-next backgroundImg"
        type="submit"
        value={props.challenge}
      ></input>
    </motion.div>
  );
};

export default MotionContainer;

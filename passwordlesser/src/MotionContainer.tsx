import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const MotionContainer = (props: {
  idNumber: number;
  advance: boolean;
  yInit: string;
  yFinal: string;
  duration: number;
}) => {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // Calc width stuff
  const dvImgWidth = 10;
  const dvImgWidthStyle = "10vw";
  const dvImgWidthInPX = windowWidth * (10 / 100);
  // const positionFromLeftEdge =
  //   props.fromLeftEdge * windowWidth - dvImgWidthInPX + "px";

  // calc height stuff
  // aspect ratio is roughly 1.19
  const dvImgHeightPX = 1.19 * dvImgWidthInPX;
  const negDVImgHeightPX = 1.19 * dvImgWidthInPX * -1 * 2;
  // aspect ratio is roughly 1.19 and width is set to 100vw, aka
  // 100% of window.innerWidth
  const anthonyImgHeightPX = 1.19 * windowWidth;
  // const style = document.createElement("style");
  // document.getElementsByTagName("head")[0].appendChild(style);

  const pastAnthonyPicHeight = anthonyImgHeightPX + dvImgHeightPX;

  if (props.advance) {
    return (
      <motion.div
        initial={{ y: props.yInit }}
        animate={{
          y: props.yFinal,
        }}
        transition={{
          repeat: Infinity,
          // delay: 1,
          duration: props.duration,
          repeatType: "reverse",
        }}
        className="dv-motion-div muscle-container"
        key={"dv" + props.idNumber}
        id={"dv" + props.idNumber}
      >
        <button
          data-skbuttonvalue="submit"
          data-skform="usernamePasswordForm"
          data-skbuttontype="form-submit"
          data-skcomponent="skbutton"
          type="submit"
          data-id="button"
          className="dv-btn-img skbutton_form-submit"
          id={"skbutton_form-submit-" + props.idNumber}
        ></button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: props.yInit }}
      animate={{
        y: props.yFinal,
      }}
      transition={{
        repeat: Infinity,
        // delay: 1,
        duration: props.duration,
        repeatType: "reverse",
      }}
      className="flex-child dv-motion-div"
      key={"dv" + props.idNumber}
      id={"dv" + props.idNumber}
    >
      <button
        type="submit"
        data-id="button"
        className="dv-btn-img"
        id={"skbutton_form-submit-" + props.idNumber}
      ></button>
    </motion.div>
  );
};

MotionContainer.propTypes = {};

export default MotionContainer;

import React, { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";

import styles from "./styles.module.css";

export default function App() {
  const [open, toggle] = useState(false);
  const [ref, { height }] = useMeasure();
  const { x } = useSpring({ x: 0 });
  useEffect(() => {
    // This animates as expected, from 100 to 0.
    x.start({ from: 100, to: 0 });
  });

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.main} onClick={() => toggle(!open)}>
        {/* <animated.div className={styles.fill} style={props} /> */}
        <animated.div className={styles.content}>
          {/* {props.height.to((y) => y.toFixed(0))} */}
          {/* {props.width.to((x) => {
            return parseInt(x.toFixed(0));
          })} */}
        </animated.div>
      </div>
    </div>
  );
}

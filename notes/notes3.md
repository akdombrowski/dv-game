# framer-motion

```js

const yMV = useMotionValue(0);
const duration = 4.3;

<motion.div
    initial={{ y: 0 }}
    animate={{
      y: 100,
    }}
    style={{ y: yMV }}
    transition={{
      repeat: Infinity,
      duration: duration,
      repeatType: "reverse",
    }}
>

```

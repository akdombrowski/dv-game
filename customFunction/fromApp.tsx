const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
const IMG_SIZE = Number("{{global.variables.IMG_SIZE}}");
const IMG_SIZE_VW = IMG_SIZE.toString() + "vw";
const CHALLENGES = document.getElementById("ids");
const DV_COL_POSITIONS = new Set();

// calculates a random number to place the col contanining an img
// min value is 0 to keep from going off screen to the left
// max value is 99 since I'm converting this to a percentage
const rndPositionFromLeftForImg = () => {
  return Math.max(0, Math.floor(Math.random() * 99 - IMG_SIZE));
};

/**
 * It generates a random number between 0 and the window width (technically 99%
 * of window width), and if that number is already in the set, it generates a
 * new number until it finds one that isn't in the set to avoid overlapping
 * but limited to 100 iterations
 * @returns A random number between 0 and the window width minus the width of the
 * image.
 */
const rndPosFromLeftEdgeNumber = () => {
  const iterationsToFindLeftPos = 100;
  let rndLeft = rndPositionFromLeftForImg();

  // keep iterations to 100 just to avoid infinite loop. at that point we'll probably have to overlap. if i really want, I can take the total window width and divide it by the dv img width to get when the whole window width should be filled up. but overlapping could make that tricky since I'm only checking for exact position was already used
  for (let i = 0; i < iterationsToFindLeftPos; i++) {
    // if we already have this position try again, else break out and use that
    // value
    if (DV_COL_POSITIONS.has(rndLeft)) {
      rndLeft = rndPositionFromLeftForImg();
    } else {
      break;
    }
  }

  // save value to avoid overlap
  DV_COL_POSITIONS.add(rndLeft);

  return rndLeft;
};

// convert rnd number to percentage
const rndPosPercFromLeftEdge = () =>
  rndPosFromLeftEdgeNumber().toString() + "%";

const getChlls = () => {
  const chs = CHALLENGES?.firstChild;
  let chsStr;
  let chsArr;
  let chlls;
  if (chs) {
    chsStr = chs.textContent;
    chsStr = chsStr?.slice(1, -1) as string;
    chlls = JSON.parse(chsStr);
  }

  return chlls;
};

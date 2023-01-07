const clickBtn = () => {
  const nextEventBtn = document.getElementById("nextEventBtn");

  console.log("readyState:", document.readyState);
  console.log("nextEventBtn:", nextEventBtn);

  console.log("click");
  nextEventBtn.click();
};

/**
 * Wait for page to load to click the button
 */
if (document.readyState !== "complete") {
  //   // Loading hasn't finished yet
  console.log("readyState:", document.readyState);
  document.onreadystatechange = () => {
    console.log("readyState:", document.readyState);
    if (document.getElementById("nextEventBtn")) {
      clickBtn();
    }
  };
  // console.log("readyState:", "not completed");
  // window.addEventListener("load", clickBtn);
  // document.addEventListener("load", clickBtn);
} else {
  // `DOMContentLoaded` has already fired
  console.log("readyState:", "finished loading");
  clickBtn();
}

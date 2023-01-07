const clickBtn = () => {
  const nextEventBtn = document.getElementById("nextEventBtn");

  console.log("readyState:", document.readyState);
  console.log("nextEventBtn:", nextEventBtn);

  nextEventBtn.click();
};

/**
 * Wait for page to load to click the button
 */
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  console.log("readyState:", "not completed");
  document.addEventListener("readystatechange", clickBtn);
  document.addEventListener("load", clickBtn);
} else {
  // `DOMContentLoaded` has already fired
  console.log("readyState:", "finished loading");
  clickBtn();
}

const clickBtn = () => {
  const nextEventBtn = document.getElementById("nextEventBtn");

  nextEventBtn.click();
};

/**
 * Wait for page to load to click the button
 */
if (document.readyState !== "complete") {
  // Loading hasn't finished yet
  document.addEventListener("load", window.requestAnimationFrame(clickBtn));
} else {
  // `DOMContentLoaded` has already fired
  window.requestAnimationFrame(clickBtn);
}

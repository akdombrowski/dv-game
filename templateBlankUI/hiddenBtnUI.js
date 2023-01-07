const clickBtn = () => {
  const nextEventBtn = document.getElementById("nextEventBtn");
  nextEventBtn.click();
};

/**
 * Wait for page to load to click the button
 */
if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", clickBtn);
} else {
  // `DOMContentLoaded` has already fired
  clickBtn();
}

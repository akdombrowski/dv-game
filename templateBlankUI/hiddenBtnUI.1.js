// Close the window after 100 milleseconds
const checkInterval = 250; // How often to run the timer
const showButtonTime = 1000; // How long until we show the button
let waitTime = 0; // How long we have waited

const myTimer = window.setInterval(function () {
  waitTime += checkInterval;

  if (waitTime >= showButtonTime) {
    buttonDiv = document.getElementById("button-div");

    // This should show the continue button and only run 1 time because clearInterval will stop the timer
    //
    // The expectation is that this will never run, because the page will be gone after the click
    if (buttonDiv) {
      buttonDiv.style = "display: block";
      //console.log("  Clearing Timer")
    }
    clearInterval(myTimer);
  }

  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    //console.log("Clicking Button")
    nextButton.click();
  }
}, checkInterval);
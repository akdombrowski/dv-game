/**
 * Call this function when want to submit a form wit a value in advance-flow-input
 * @param {Event} e
 */
const advanceFlow = (e) => {
  e.preventDefault();
  const advFlowInput = document.getElementById("advance-flow-input");
  const advFlowBtn = document.getElementById("advance-flow-btn");
  if (advFlowInput) {
    const advance = advFlowInput;
    // replace with the value you want to pass through the DV flow
    advance.value = "captcha dv";
  }
  advFlowBtn?.click();
};

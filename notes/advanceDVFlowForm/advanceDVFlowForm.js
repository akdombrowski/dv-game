/**
 * Call this function when want to submit a form wit a value in advanceFlowValue
 * @param {Event} e
 */
const advanceFlow = (e) => {
  e.preventDefault();
  const advFlowInput = document.getElementById("advanceFlowValue");
  const advFlowBtn = document.getElementById("advFlowSubmitBtn");
  if (advFlowInput) {
    const advance = advFlowInput;
    // replace with the value you want to pass through the DV flow
    advance.value = "captcha dv";
  }
  advFlowBtn?.click();
};

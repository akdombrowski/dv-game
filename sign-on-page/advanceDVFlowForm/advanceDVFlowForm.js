/**
 * Call this function when want to submit a form wit a value in advanceFlowValue
 * @param {Event} e
 */
const advanceFlow = (e) => {
  e.preventDefault();
  const advanceFlowInputEmail = document.getElementById(
    "advanceFlowInputEmail"
  );
  const advanceFlowInputDifficulty = document.getElementById(
    "advanceFlowInputDifficulty"
  );
  const advanceFlowBtn = document.getElementById("advanceFlowBtn");
  if (advanceFlowBtn) {
    const advance = advanceFlowBtn;
    // replace with the value you want to pass through the DV flow
    advance.value = "captcha dv";
    advanceFlowBtn.click();
  }
};

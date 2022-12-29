import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState, SyntheticEvent, useEffect, ChangeEvent } from "react";
import { GameDifficultyLevelSelectionFormGroup } from "./GameDifficultyLevelSelectionFormGroup";
import { EmailInputFormGroup } from "./EmailInputFormGroup";
import "./App.css";

const includeRegistration: string = "{{global.variables.includeRegistration}}";

const SignOnPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [emailInputValue, setEmailInputValue] = useState("");

  // run on after first render
  useEffect(() => {
    const body = document.body as HTMLElement;

    body.style.backgroundColor = "var(--bs-dark)";
  }, []);

  useEffect(() => {
    const advanceFlowInputEmail: HTMLElement | null = document.getElementById(
      "advanceFlowInputEmail"
    );
    const advanceFlowInputDifficulty: HTMLElement | null =
      document.getElementById("advanceFlowInputDifficulty");

    if (advanceFlowInputEmail) {
      const advanceFlowInputEmailInputElement =
        advanceFlowInputEmail as HTMLInputElement;
      advanceFlowInputEmailInputElement.value = emailInputValue;
    }

    if (advanceFlowInputDifficulty) {
      const advanceFlowInputDifficultyInputElement =
        advanceFlowInputDifficulty as HTMLInputElement;
      advanceFlowInputDifficultyInputElement.value =
        selectedDifficulty.toString();
    }
  }, [emailInputValue, selectedDifficulty]);

  const clickAdvFlowBtn = () => {
    const advFlowBtn = document.getElementById(
      "advanceFlowBtn"
    ) as HTMLInputElement;
    if (advFlowBtn) {
      advFlowBtn.click();
      return true;
    } else {
      throw new Error("Advance button not found");
    }
  };

  const updateActionValue = (action: string) => {
    const advFlowActionElement = document.getElementById(
      "advFlowAction"
    ) as HTMLInputElement;

    if (advFlowActionElement) {
      advFlowActionElement.value = action;
    } else {
      throw new Error("Input element to send action chosen was not found");
    }
  };

  const advanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();

    // Check for values in the advance DV flow form inputs
    const advanceFlowInputEmailInputElement = document.getElementById(
      "advanceFlowInputEmail"
    ) as HTMLInputElement;
    const advanceFlowInputDifficultyInputElement = document.getElementById(
      "advanceFlowInputDifficulty"
    ) as HTMLInputElement;

    // Throw error if we're missing one of the input values we need to move forward
    if (
      !advanceFlowInputEmailInputElement?.value ||
      !advanceFlowInputDifficultyInputElement?.value
    ) {
      throw new Error(
        "Need values for both email and difficulty, but we're missing one or both"
      );
    }

    updateActionValue("signOn");

    // Click the advance button to progress the flow
    clickAdvFlowBtn();
  };

  const handleEmailUpdate = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setEmailInputValue(target.value);
  };

  const difficultySelectedFn = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSelectedDifficulty(Number(target.value));
  };

  const handleReg = (e: SyntheticEvent) => {
    e.preventDefault();

    // This fn fires when the registration button is clicked
    // Set the action type input element's value to be createAccount
    updateActionValue("createAccount");

    // Click the advance button to progress the flow
    clickAdvFlowBtn();
  };

  return (
    <Container
      fluid
      className="col-md-8 col-lg-6 mx-auto my-5"
      style={{ backgroundColor: "var(--bs-dark)" }}
    >
      <Row className="mb-4">
        <Col className="col-md-10 col-lg-8 mx-auto">
          <h1
            className="display-5 text-center font-monospace"
            style={{ color: "var(--bs-cyan)" }}
          >
            Sign on
          </h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form id="signOnForm" onSubmit={advanceFlow}>
            <Stack gap={2} className="mb-4">
              <EmailInputFormGroup updateEmail={handleEmailUpdate} />
              <GameDifficultyLevelSelectionFormGroup
                difficultySelectedFn={difficultySelectedFn}
              />
            </Stack>

            <Row>
              <ButtonGroup id="signOnFormActionBtns" vertical className="gap-1">
                <Button
                  id="signOnBtn"
                  variant="outline-dark"
                  size="lg"
                  type="submit"
                  style={{
                    color: "var(--bs-cyan)",
                    borderColor: "var(--bs-cyan)",
                  }}
                >
                  Sign on
                </Button>

                {/* Only show register button if registration hasn't been done already */}
                {includeRegistration ? (
                  <Button
                    id="createNewAcctBtn"
                    variant="outline-dark"
                    type="button"
                    onClick={handleReg}
                    style={{
                      color: "var(--bs-gray-500)",
                      borderColor: "var(--bs-gray-600)",
                    }}
                  >
                    Register a new account
                  </Button>
                ) : (
                  <></>
                )}
              </ButtonGroup>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOnPage;

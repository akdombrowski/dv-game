import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState, SyntheticEvent, useEffect, ChangeEvent } from "react";
import { GameDifficultyLevelSelectionFormGroup } from "./GameDifficultyLevelSelectionFormGroup";
import { EmailInputFormGroup } from "./EmailInputFormGroup";
import { ThemeChooser } from "./ThemeChooser";

import "./App.css";

// for local dev
// const includeRegistration = true;
// const themes = { \"0\": {\"name\": \"seeingDouble\", \"src\": \"https://i.ibb.co/yWrB3tt/anthony-double-trouble.png\"}, \"1\": {\"name\": \"ahhhhhh\", \"src\": \"https://i.ibb.co/4dgrH9T/groupphoto3.png\"}, \"2\": {\"name\": \"racing\", \"src\": \"https://i.ibb.co/ystvSH8/race-Track.png\"} , \"3\": {\"name\": \"ping\", \"src\": \"https://i.ibb.co/zsK7Rs1/jewelBG.png\"} }
const includeRegistration = "{{global.variables.includeRegistration}}";
const themeNames = "{{global.variables.themeNames}}";
const themeBGs = "{{global.variables.themeBGs}}";
const themeNamesArr = themeNames.split(", ");
const themeBGsArr = themeBGs.split(", ");
const IMG_SIZE = Number("{{global.variables.IMG_SIZE}}");
const maxDifficulty = Math.floor(100 / IMG_SIZE);

const SignOnPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(3);
  const [emailInputValue, setEmailInputValue] = useState("");
  const [theme, setTheme] = useState<string>();

  // sets background to dark color. run only after first render
  useEffect(() => {
    const body = document.body as HTMLElement;

    body.style.backgroundColor = "var(--bs-dark)";
  }, []);

  // sets one of the radio buttons as default (doesn't determine which one
  // specifically)
  useEffect(() => {
    const radioInput = document.querySelector(
      "input[type=radio]",
    ) as HTMLInputElement;

    radioInput.checked = true;
    setTheme(radioInput.id);
  }, []);

  useEffect(() => {
    const advanceFlowInputEmail: HTMLElement | null = document.getElementById(
      "advanceFlowInputEmail",
    );
    const advanceFlowInputDifficulty: HTMLElement | null =
      document.getElementById("advanceFlowInputDifficulty");

    const advanceFlowInputTheme: HTMLElement | null = document.getElementById(
      "advanceFlowInputTheme",
    );

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

    if (advanceFlowInputTheme) {
      const advanceFlowInputThemeInputElement =
        advanceFlowInputTheme as HTMLInputElement;
      advanceFlowInputThemeInputElement.value = theme as string;
    }
  }, [emailInputValue, selectedDifficulty, theme]);

  const clickAdvFlowBtn = () => {
    const advFlowBtn = document.getElementById(
      "advanceFlowBtn",
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
      "advFlowAction",
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
      "advanceFlowInputEmail",
    ) as HTMLInputElement;
    const advanceFlowInputDifficultyInputElement = document.getElementById(
      "advanceFlowInputDifficulty",
    ) as HTMLInputElement;

    // Throw error if we're missing one of the input values we need to move forward
    if (
      !advanceFlowInputEmailInputElement?.value ||
      !advanceFlowInputDifficultyInputElement?.value
    ) {
      throw new Error(
        "Need values for both email and difficulty, but we're missing one or both",
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

  const handleThemeUpdate = (e: ChangeEvent) => {
    setTheme(e.target.id);
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
      className="py-3 px-5 align-content-around"
      style={{ backgroundColor: "var(--bs-dark)" }}
    >
      <Row xs={3} className="m-1 h-10">
        <Col xs={1}></Col>
        <Col xs={1} className="">
          <Image
            src="https://i.postimg.cc/Xq7JXNYH/recaptcha-katpchame.webp"
            fluid
            thumbnail
          ></Image>
        </Col>
        <Col xs={3} className="mx-auto">
          <h1
            className="display-5 text-center font-monospace"
            style={{ color: "var(--bs-cyan)" }}
          >
            Sign on
          </h1>
        </Col>
      </Row>

      <Row className="m-1 h-90">
        <Col>
          <Form id="signOnForm" onSubmit={advanceFlow}>
            <Stack gap={2} className="mb-4">
              <EmailInputFormGroup updateEmail={handleEmailUpdate} />
              <GameDifficultyLevelSelectionFormGroup
                maxDifficulty={maxDifficulty}
                difficultySelectedFn={difficultySelectedFn}
              />
            </Stack>

            <ButtonGroup
              as={Row}
              id="signOnFormActionBtns"
              className="align-content-between d-flex"
            >
              <Col xs={12} className="mb-3">
                <Button
                  id="signOnBtn"
                  variant="outline-dark"
                  size="lg"
                  type="submit"
                  style={{
                    color: "var(--bs-cyan)",
                    borderColor: "var(--bs-cyan)",
                    width: "100%",
                  }}
                >
                  Sign on
                </Button>
              </Col>

              {/* Only show register button if registration hasn't been done already */}
              {includeRegistration ? (
                <Col xs={12} className="mb-3">
                  <Button
                    id="createNewAcctBtn"
                    variant="outline-dark"
                    type="button"
                    onClick={handleReg}
                    style={{
                      color: "var(--bs-gray-500)",
                      borderColor: "var(--bs-gray-600)",
                      width: "100%",
                    }}
                  >
                    Register a new account
                  </Button>
                </Col>
              ) : (
                <></>
              )}
            </ButtonGroup>

            <Row className="py-3">
              <ThemeChooser
                updateTheme={handleThemeUpdate}
                themeNames={themeNamesArr}
                themeBGs={themeBGsArr}
              ></ThemeChooser>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOnPage;

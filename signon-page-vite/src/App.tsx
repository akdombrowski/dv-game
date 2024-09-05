import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState, SyntheticEvent, useEffect, ChangeEvent } from "react";
import { GameDifficultyLevelSelectionFormGroup } from "./GameDifficultyLevelSelectionFormGroup";
import { EmailInputFormGroup } from "./EmailInputFormGroup";
import { IThemes, ThemeChooser } from "./ThemeChooser";

// for local dev
// const includeRegistration = true;
// const themes = { \"0\": {\"name\": \"seeingDouble\", \"src\": \"https://i.ibb.co/yWrB3tt/anthony-double-trouble.png\"}, \"1\": {\"name\": \"ahhhhhh\", \"src\": \"https://i.ibb.co/4dgrH9T/groupphoto3.png\"}, \"2\": {\"name\": \"racing\", \"src\": \"https://i.ibb.co/ystvSH8/race-Track.png\"} , \"3\": {\"name\": \"ping\", \"src\": \"https://i.ibb.co/zsK7Rs1/jewelBG.png\"} }
// const includeRegistration = "{{global.variables.includeRegistration}}";
const themesFlowVar = "{{global.variables.themes}}";
let themes: IThemes;
try {
  themes = JSON.parse(themesFlowVar);
} catch (e) {
  themes = {
    "0": {
      name: "seeingDouble",
      src: "https://i.postimg.cc/HxhXYXj2/double-Trouble.webp",
    },
    "1": { name: "ahhhhhh", src: "https://i.postimg.cc/Gm1Ppjgq/ahhBG.webp" },
    "2": {
      name: "racing",
      src: "https://i.postimg.cc/DzjCwcwW/raceTrack.webp",
    },
    "3": {
      name: "anthroid",
      src: "https://i.postimg.cc/kXMqTcr6/katpcha-me-bugdroid-bg.png",
    },
  };
}

const themeNames = "{{global.variables.themeNames}}";
const themeBGs = "{{global.variables.themeBGs}}";
const themeNamesArr = themeNames.split(", ");
const themeBGsArr = themeBGs.split(", ");
// const IMG_SIZE = "{{global.variables.IMG_SIZE}}";
// const imgSize = Number.isInteger(IMG_SIZE) ? Number.parseInt(IMG_SIZE) : 8;
const maxDifficulty = 25;
const defaultDifficulty = 10;

const SignOnPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(defaultDifficulty);
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

  const difficultySelectedFn = (d: number) => {
    setSelectedDifficulty(d);
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
      className="h-100 justify-content-start align-content-start d-flex flex-wrap"
      style={{
        backgroundColor: "var(--bs-dark)",
      }}
    >
      <Row className="px-5 h-100 align-items-center">
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={7}
          className="px-5 py-1 h-100 align-content-center"
        >
          <Row className="h-100 align-content-center row-gap-5">
            {/* <Row xs={1} className=""> */}
            <Col
              xs={12}
              className="d-flex justify-content-center"
              style={{ height: "13vh" }}
            >
              <Row className="row-gap-0">
                <Col xs={12} className="p-0" style={{ height: "80%" }}>
                  <h1 className="display-1 text-center text-info font-monospace m-0">
                    Sign In
                  </h1>
                  R
                </Col>
                <Col xs={12} className="p-0" style={{ height: "20%" }}>
                  <h6 className="text-center text-secondary font-monospace m-0">
                    or Sign Up
                  </h6>
                </Col>
              </Row>
            </Col>
            {/* </Row> */}

            {/* <Form id="signOnForm" as={Row} onSubmit={advanceFlow}> */}
            <Form
              id="signOnForm"
              as={Col}
              xs={12}
              className=""
              onSubmit={advanceFlow}
            >
              <Row className="">
                <Col xs={12} className="">
                  {/* <Stack gap={0} className=""> */}
                  <Form.Group controlId="emailInput">
                    {/* <Col xs={12}> */}
                    <EmailInputFormGroup updateEmail={handleEmailUpdate} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="row-gap-5">
                <Col xs={12}>
                  <Form.Group controlId="difficultySelector">
                    <GameDifficultyLevelSelectionFormGroup
                      defaultDifficulty={defaultDifficulty}
                      maxDifficulty={maxDifficulty}
                      difficultySelectedFn={difficultySelectedFn}
                    />
                  </Form.Group>
                </Col>

                <Col
                  id="themes-col-formgroup-wrapper"
                  xs={12}
                  className="vh-25"
                >
                  <Form.Group
                    controlId="themes"
                    className="h-100 justify"
                    style={{}}
                  >
                    {/* <Row className="row-gap-3"> */}
                    {/* <Col */}
                    {/* xs={12}
                      className="flex-shrink-1"
                      id="themes-col-wrapper"
                      > */}
                    <ThemeChooser
                      updateTheme={handleThemeUpdate}
                      themeNames={themeNamesArr}
                      themeBGs={themeBGsArr}
                      themes={themes}
                    ></ThemeChooser>
                    {/* </Col> */}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="submitBtns">
                    <ButtonGroup
                      as={Col}
                      xs={12}
                      id="signOnFormActionBtns"
                      className="justify-content-center"
                    >
                      <Row id="btn-group-inner-row">
                        <Col xs={8} className="">
                          <Button
                            className="w-100 h-100"
                            id="signOnBtn"
                            variant="outline-dark"
                            size="sm"
                            onClick={advanceFlow}
                            style={{
                              color: "var(--bs-cyan)",
                              borderColor: "var(--bs-cyan)",
                            }}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs={4} className="">
                          <Button
                            className="w-100 h-100"
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
                        </Col>
                      </Row>
                    </ButtonGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={5}
          className="px-xs-5 py-sm-5 py-md-5 px-lg-4 px-xl-3 py-5 h-100"
        >
          <Row className="h-100">
            <Col className="justify-content-center align-items-center d-flex">
              <Image
                src="https://i.postimg.cc/Xq7JXNYH/recaptcha-katpchame.webp"
                className="h-100"
              ></Image>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOnPage;

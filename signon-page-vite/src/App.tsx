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
import type { MouseEvent } from "react";

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
      src: "https://i.postimg.cc/6pyc5PNF/katpcha-me-bugdroid-bg-v3.png",
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
  const [email, setEmail] = useState("");
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

    if (advanceFlowInputEmail && email) {
      const advanceFlowInputEmailInputElement =
        advanceFlowInputEmail as HTMLInputElement;
      advanceFlowInputEmailInputElement.value = email;
    }

    if (advanceFlowInputDifficulty && selectedDifficulty) {
      const advanceFlowInputDifficultyInputElement =
        advanceFlowInputDifficulty as HTMLInputElement;
      advanceFlowInputDifficultyInputElement.value =
        selectedDifficulty.toString();
    }

    if (advanceFlowInputTheme && theme) {
      const advanceFlowInputThemeInputElement =
        advanceFlowInputTheme as HTMLInputElement;
      advanceFlowInputThemeInputElement.value = theme as string;
    }
  }, [email, selectedDifficulty, theme]);

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

    setEmail(target.value);
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

  const copyTestEmail = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const email = event.currentTarget.value;
    setEmail(email);
  };

  return (
    <Container
      fluid
      className="justify-content-center align-items-center d-flex flex-wrap"
      style={{
        backgroundColor: "var(--bs-dark)",
      }}
    >
      <Row
        id="main-row"
        className="justify-content-center align-items-center row-gap-5"
      >
        <Col
          id="form-col"
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={7}
          className="align-content-center justify-content-center vh-100"
          as={Form}
          onSubmit={advanceFlow}
        >
          <Row id="form-row" className="align-content-center row-gap-3 px-5">
            <Col
              id="form-title-col"
              xs={12}
              className="d-flex justify-content-center"
            >
              <Row className="row-gap-1">
                <Col xs={12} className="">
                  <h1 className="display-1 text-center text-info font-monospace m-0">
                    Sign In
                  </h1>
                </Col>
                <Col xs={12} className="">
                  <h6 className="text-center text-secondary font-monospace m-0">
                    or Sign Up
                  </h6>
                </Col>
              </Row>
            </Col>

            <Col id="email-col" xs={12} className="">
              {/* <Form
              id="sign-on-form-col"
              as={Col}
              className=""
              onSubmit={advanceFlow}
            > */}
              <Row id="email-input-row" className="">
                <Col xs={12} className="">
                  <Form.Group controlId="emailInput">
                    <EmailInputFormGroup
                      updateEmail={handleEmailUpdate}
                      email={email}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col id="diff-sel-col" xs={12}>
              <Form.Group controlId="difficultySelector">
                <GameDifficultyLevelSelectionFormGroup
                  defaultDifficulty={defaultDifficulty}
                  maxDifficulty={maxDifficulty}
                  difficultySelectedFn={difficultySelectedFn}
                />
              </Form.Group>
            </Col>

            <Form.Group
              id="formgroup-themes"
              controlId="themes"
              className="h-100 justify"
              style={{}}
              as={Col}
              xs={12}
            >
              <ThemeChooser
                updateTheme={handleThemeUpdate}
                themeNames={themeNamesArr}
                themeBGs={themeBGsArr}
                themes={themes}
                cols={2}
              ></ThemeChooser>
            </Form.Group>

            <Form.Group
              controlId="submitBtns"
              id="form-group-action-btns"
              as={Col}
              xs={12}
              className=""
            >
              <ButtonGroup as={Row} id="btn-group" className="row-gap-3 d-flex">
                <Col xs={12} className="">
                  <Button
                    className="w-100 h-100 text-nowrap btn btn-primary"
                    id="sign-on-btn"
                    variant="outline-dark"
                    size="lg"
                    onClick={advanceFlow}
                    style={{
                      color: "var(--bs-white)",
                      borderColor: "var(--bs-cyan)",
                    }}
                  >
                    Login
                  </Button>
                </Col>
                <Col xs={12} className="">
                  <Button
                    className="w-100 h-100 text-nowrap"
                    id="register-btn"
                    variant="outline-dark"
                    type="button"
                    onClick={handleReg}
                    size="sm"
                    style={{
                      color: "var(--bs-gray-500)",
                      borderColor: "var(--bs-gray-600)",
                    }}
                  >
                    Register
                  </Button>
                </Col>
              </ButtonGroup>
            </Form.Group>
          </Row>
        </Col>

        <Col
          className="justify-content-center align-items-center d-flex"
          xs={10}
          sm={10}
          md={6}
          lg={6}
          xl={5}
        >
          <Image
            src="https://i.postimg.cc/Xq7JXNYH/recaptcha-katpchame.webp"
            className=""
            fluid
            style={{ maxHeight: "100%", width: "100%" }}
          />
        </Col>
      </Row>
      <Button
        className="position-absolute  text-nowrap"
        id="hidden-email-test-btn"
        variant="outline-dark"
        type="button"
        onClick={copyTestEmail}
        value={`akdombrowski+${Date.now()}@gmail.com`}
        // size="sm"
        style={{
          // color: "var(--bs-gray-500)",
          // borderColor: "var(--bs-gray-600)",
          width: "5px",
          height: "5px",
          top: 0,
          left: 0,
        }}
      ></Button>
    </Container>
  );
};

export default SignOnPage;

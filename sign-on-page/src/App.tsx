import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FormControl, { FormControlProps } from "react-bootstrap/FormControl";
import {
  useState,
  SyntheticEvent,
  useRef,
  useEffect,
  MutableRefObject,
  ChangeEvent,
} from "react";
import { GameDifficultyLevelSelectionFormGroup } from "./GameDifficultyLevelSelectionFormGroup";
import { EmailInputFormGroup } from "./EmailInputFormGroup";

const SignOnPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [emailInputvalue, setEmailInputValue] = useState("");

  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // const emailInput: HTMLInputElement = document.getElementById(
    //   "floatingEmailInput"
    // ) as HTMLInputElement;
    // const advInput: HTMLInputElement = document.getElementById(
    //   "advance-flow-input-email"
    // ) as HTMLInputElement;
    // advInput.value = emailInputvalue;
    console.log("emailRef.current");
    console.log(emailRef.current);
    const emailRefCurrent = emailRef.current;
    if (emailRefCurrent) {
      const advanceflowinputemail = emailRefCurrent as HTMLInputElement;
      console.log("advanceflowinputemail.value");
      console.log(advanceflowinputemail.value);
    }
  }, [emailInputvalue]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("e.cancelable");
    console.log(e.cancelable);
    console.log("e.defaultPrevented");
    console.log(e.defaultPrevented);
    const target = e.target as HTMLFormElement;
    const currentTarget = e.currentTarget as HTMLFormElement;
    console.log("form submit");
    // console.log("e");
    // console.log(e);
    console.log("e.target");
    console.log(target);
    console.log("e.target.elements");
    console.log(target.elements);
    console.log("e.target.action");
    console.log(target.action);
    console.log("e.currentTarget");
    console.log(currentTarget);
    console.log("e.currentTarget.elements");
    console.log(currentTarget.elements);
    console.log("e.currentTarget.action");
    console.log(currentTarget.action);
    console.log("target.value");
    console.log(target.value);
    console.log("currentTarget.value");
    console.log(currentTarget.value);

    const advFlowBtn: HTMLElement | null =
      document.getElementById("advance-flow-btn");

    if (advFlowBtn) {
      advFlowBtn.click();
      return true;
    } else {
      throw new Error("Advance button not found");
    }
  };

  const handleEmailUpdate = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    console.log("email change");
    console.log("target");
    console.log(target);
    console.log("target.value");
    console.log(target.value);
    setEmailInputValue(target.value);
  };

  const difficultySelectedFn = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <Container fluid className="col-md-8 col-lg-6 mx-auto my-5">
      <Row className="mb-4">
        <Col className="col-md-10 col-lg-8 mx-auto">
          <h1 className="display-5 text-center font-monospace">Sign on</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Stack gap={2} className="mb-4">
              <EmailInputFormGroup updateEmail={handleEmailUpdate} />
              <GameDifficultyLevelSelectionFormGroup
                difficultySelectedFn={difficultySelectedFn}
              />
            </Stack>

            <Row>
              <ButtonGroup vertical className="gap-1">
                <Button variant="outline-primary" type="submit">
                  Sign on
                </Button>
                <Button variant="outline-secondary" type="submit">
                  Create a new account
                </Button>
              </ButtonGroup>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOnPage;

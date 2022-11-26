import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { ButtonGroup } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { GameDifficultyLevelSelectionFormGroup } from "./GameDifficultyLevelSelectionFormGroup";
import { EmailInputFormGroup } from "./EmailInputFormGroup";

/**
 *
 * Currently setup for a registration page. Change to email input for with
 * option below to go through registration.
 *
 * @returns
 */
const SignOnPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const email: HTMLElement | null = document.getElementById("userEmail");
    const advFlowBtn: HTMLElement | null =
      document.getElementById("advance-flow-btn");
    if (email as HTMLInputElement) {
      const advance = email as HTMLInputElement;
      advance.value = "captcha dv";
    }
    advFlowBtn?.click();
  };

  const difficultySelectedFn = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <Container fluid className="col-md-8 col-lg-6 mx-auto my-5">
      <Form id="advance-flow-form">
        <Form.Group controlId="advance-flow-input">
          <Form.Control
            type="hidden"
            name="advance-flow-input"
            placeholder="easy"
            value={selectedDifficulty}
          />
        </Form.Group>
        <Button
          id="advance-flow-btn"
          type="submit"
          data-skcomponent="skbutton"
          data-skbuttontype="form-submit"
          data-skbuttonvalue="submit"
          data-skform="advance-flow-form"
          className="hidden"
          style={{ display: "none" }}
        ></Button>
      </Form>
      <Row className="mb-4">
        <Col className="col-md-10 col-lg-8 mx-auto">
          <h1 className="display-5 text-center font-monospace">Sign on</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Stack gap={2} className="mb-4">
              <EmailInputFormGroup />
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

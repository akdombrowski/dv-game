import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useState } from "react";

/**
 *
 * Currently setup for a registration page. Change to email input for with
 * option below to go through registration.
 *
 * @returns
 */
const SignOnPage = () => {
  return (
    <Container fluid className="col-md-8 col-lg-6 mx-auto my-5">
      <Row className="mb-4">
        <Col className="col-md-10 col-lg-8 mx-auto">
          <h1 className="display-5 text-center font-monospace">Sign on</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form>
            <Stack gap={1} className="mb-5">
              <Form.Group controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInputFormBasicEmail"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    autoComplete="username"
                  />
                  <Form.Text
                    muted
                    className="help-text"
                    id="username-help-text"
                  >
                    This will also be your username.
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>

              <Form.Group controlId="formDifficultyLevel" className="d-grid gap-1">
                <Form.Label>Choose Difficulty: </Form.Label>
                <ToggleButtonGroup
                  type="radio"
                  name="difficulty"
                  defaultValue="easy"
                >
                  <ToggleButton
                    id="radio-easy"
                    variant="outline-secondary"
                    value="easy"
                  >
                    easy
                  </ToggleButton>
                  <ToggleButton
                    id="radio-medium"
                    variant="outline-secondary"
                    value="medium"
                  >
                    medium
                  </ToggleButton>
                  <ToggleButton
                    id="radio-hard"
                    variant="outline-secondary"
                    value="hard"
                  >
                    hard
                  </ToggleButton>
                </ToggleButtonGroup>
              </Form.Group>
            </Stack>

            <Stack gap={2}>
              <Button variant="outline-primary" type="submit">
                Sign on
              </Button>
              <Button variant="outline-secondary" type="submit">
                Create a new account
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignOnPage;

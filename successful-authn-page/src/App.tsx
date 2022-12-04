import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { SyntheticEvent } from "react";

const SuccessfulAuthnPage = () => {
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

  const advanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();
    // Click the advance button to progress the flow
    clickAdvFlowBtn();
  };

  return (
    <Container fluid className="col-md-8 col-lg-6 mx-auto my-5">
      <Row className="mb-4">
        <Col className="col-md-10 col-lg-8 mx-auto">
          <h1 className="display-5 text-center font-monospace">
            You're now signed on!
          </h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="col-md-10 col-lg-8 mx-auto">
          <h1 className="display-5 text-center font-monospace">Continue</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form id="signOnForm" onSubmit={advanceFlow}>
            <Row>
              <Button id="signOnBtn" variant="outline-primary" type="submit">
                Continue
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessfulAuthnPage;

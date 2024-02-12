import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ChangeEventHandler } from "react";

interface Props {
  updateEmail: ChangeEventHandler;
}

export const EmailInputFormGroup = (props: Props) => {
  return (
    <FloatingLabel
      controlId="floatingEmailInput"
      label="Username"
      style={{ color: "var(--bs-light)" }}
    >
      <Form.Control
        required
        type="email"
        autoComplete="email"
        placeholder="akdombrowski+1gmail.com"
        onChange={props.updateEmail}
        style={{
          color: "var(--bs-cyan)",
          backgroundColor: "var(--bs-dark)",
          borderColor: "var(--bs-gray-600)",
        }}
      />
      <Form.Group className="mb-1" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="*test: akdombrowski+1@gmail.com"
          onChange={props.updateEmail}
          style={{ color: "var(--bs-gray-600)" }}
        />
      </Form.Group>
      <Form.Text
        className="help-text"
        id="emailIsUsernameHelpText"
        style={{ color: "var(--bs-gray-500)" }}
      >
        Use an email address that you've registered with.
      </Form.Text>
    </FloatingLabel>
  );
};

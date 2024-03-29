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
        placeholder="name@example.com"
        onChange={props.updateEmail}
        style={{
          color: "var(--bs-cyan)",
          backgroundColor: "var(--bs-dark)",
          borderColor: "var(--bs-gray-600)",
        }}
      />
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

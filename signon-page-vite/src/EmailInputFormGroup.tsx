import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ChangeEventHandler } from "react";

interface Props {
  updateEmail: ChangeEventHandler;
}

export const EmailInputFormGroup = (props: Props) => {
  return (
    <FloatingLabel
      className=""
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
      <Form.Text
        className="m-0 p-0 help-text"
        id="emailIsUsernameHelpText"
        style={{ color: "var(--bs-dark)" }}
      >
        akdombrowski+1@gmail.com
      </Form.Text>
    </FloatingLabel>
  );
};

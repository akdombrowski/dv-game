import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ChangeEventHandler } from "react";

interface Props {
  updateEmail: ChangeEventHandler;
}

export const EmailInputFormGroup = (props: Props) => {
  return (
    <FloatingLabel controlId="floatingEmailInput" label="Email address">
      <Form.Control
        required
        type="email"
        autoComplete="email"
        placeholder="name@example.com"
        onChange={props.updateEmail}
      />
      <Form.Text muted className="help-text" id="emailIsUsernameHelpText">
        This will also be your username.
      </Form.Text>
    </FloatingLabel>
  );
};
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export const EmailInputFormGroup = () => {
  return (
    <FloatingLabel controlId="floatingEmailInput" label="Email address">
      <Form.Control
        required
        type="email"
        autoComplete="email"
        placeholder="name@example.com"
      />
      <Form.Text muted className="help-text" id="emailIsUsernameHelpText">
        This will also be your username.
      </Form.Text>
    </FloatingLabel>
  );
};

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  ChangeEventHandler,
  type ChangeEvent,
} from "react";

interface Props {
  updateEmail: ChangeEventHandler;
  email: string;
}

export const EmailInputFormGroup = (props: Props) => {
  const { email } = props;

  const handleChange = (e: ChangeEvent) => {
    const em = (e.target as HTMLButtonElement).value;
    if (em) {
      // setEmail(em);
      props.updateEmail(e);
    }
  };

  return (
    <FloatingLabel
      className=""
      controlId="floatingEmailInput"
      label="Email"
      style={{ color: "var(--bs-light)" }}
    >
      <Form.Control
        required
        type="email"
        autoComplete="email"
        placeholder="akdombrowski+1@gmail.com"
        onChange={handleChange}
        value={email}
        style={{
          color: "var(--bs-cyan)",
          backgroundColor: "var(--bs-dark)",
          borderColor: "var(--bs-gray-600)",
        }}
      />
      {/* <Form.Text
        className="m-0 p-0 help-text"
        id="emailIsUsernameHelpText"
        style={{ color: "var(--bs-dark)" }}
      >
        akdombrowski+1@gmail.com
      </Form.Text> */}

    </FloatingLabel>
  );
};

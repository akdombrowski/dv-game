import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  ChangeEventHandler,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";

interface Props {
  updateEmail: ChangeEventHandler;
  email: string;
}

export const EmailInputFormGroup = (props: Props) => {
  console.log("props.email:", props.email);
  const [email, setEmail] = useState(props.email);

  const handleChange = (e: ChangeEvent) => {
    const em = (e.target as HTMLButtonElement).value;
    if (em) {
      setEmail(em);
      props.updateEmail(e);
    }
  };

  const copyTestEmail = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const email = event.currentTarget.value;
    console.log("email:", email);

    setEmail(email);
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
      <Button
        className="position-absolute  text-nowrap"
        id="hidden-email-test-btn"
        variant="outline-dark"
        type="button"
        onClick={copyTestEmail}
        value={`akdombrowski+${Date.now()}@gmail.com`}
        // size="sm"
        style={{
          // color: "var(--bs-gray-500)",
          // borderColor: "var(--bs-gray-600)",
          width: "5px",
          height: "5px",
          top: "0",
          right: "-30px",
        }}
      ></Button>
    </FloatingLabel>
  );
};

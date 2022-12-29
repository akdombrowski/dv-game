import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ChangeEventHandler } from "react";

interface Props {
  updateTheme: ChangeEventHandler;
  theme: string;
  bgImg: string;
}

export const ThemeChooser = (props: Props) => {
  return (
    <Form.Check
      type="radio"
      id="radio"
      style={{ backgroundImage: props.bgImg }}
    >
      <Form.Check.Input type="radio" as="image" />
      <Form.Check.Label>{props.theme}</Form.Check.Label>
      <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
    </Form.Check>
  );
};

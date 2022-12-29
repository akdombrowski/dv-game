import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { ChangeEventHandler } from "react";

interface Props {
  updateTheme: ChangeEventHandler;
}

export const ThemeChooser = (props: Props) => {
  return (
      <Form.Check type="radio" id="radio">
        <Form.Check.Input type="radio" isValid />
        <Form.Check.Label>Custom api radio</Form.Check.Label>
        <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
      </Form.Check>
  );
};

import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl, FormGroup, Row } from "react-bootstrap";

interface Props {
  updateTheme: ChangeEventHandler;
  themes: { [key: number]: { name: string; src: string } };
  // bgImg: string;
}

const FEEDBACK = ["Oh... I like your taste!", "Hey. I like your style."];
export const ThemeChooser = (props: Props) => {
  const options = () => {
    const themes = Object.values(props.themes);
    const numThemes = themes.length;
    const colWidth = Math.floor(12 / numThemes); // if want them all in one line
    return themes.map((theme, i) => {
      return (
        <Col xs={6} className="flex-fill">
          <Form.Check type="radio" id={theme.name}>
            <Form.Check.Input
              type="radio"
              onChange={props.updateTheme}
              name="theme"
            />
            <Form.Check.Label style={{ color: "var(--bs-light)" }}>
              {theme.name}
            </Form.Check.Label>
            <Image fluid src={theme.src}></Image>
            <Form.Control.Feedback
              type="valid"
              style={{ color: "var(--bs-light)" }}
            >
              {FEEDBACK[i]}
            </Form.Control.Feedback>
          </Form.Check>
        </Col>
      );
    });
  };

  return (
    <FormGroup>
      <Row>{options()}</Row>
    </FormGroup>
  );
};

import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import { ChangeEventHandler } from "react";
import { FormGroup, Row } from "react-bootstrap";

interface Props {
  updateTheme: ChangeEventHandler;
  themes: { [key: number]: { name: string; src: string } };
  // bgImg: string;
}

const FEEDBACK = [
  "Oh... I like your taste!",
  "Hey. I like your style.",
  "Are you sure?",
];

export const ThemeChooser = (props: Props) => {
  const options = () => {
    const themes = Object.values(props.themes);
    const numThemes = themes.length;
    const numThemesPerRow = 2;
    const colWidth = Math.floor(12 / numThemesPerRow);
    const numRows = 12 / colWidth / numThemes;

    return themes.map((theme, i) => {
      return (
        <Col key={theme.name + "Col"} xs={6} className="flex-fill">
          <Form.Check type="radio" id={theme.name}>
            <Form.Check.Input
              type="radio"
              onChange={props.updateTheme}
              name="theme"
              aria-describedby={theme.name + "Label"}
            />
            <Form.Check.Label
              id={theme.name + "Label"}
              style={{ color: "var(--bs-light)" }}
              htmlFor={theme.name}
            >
              {theme.name}
            </Form.Check.Label>
            <Image fluid src={theme.src}></Image>
            <Form.Control.Feedback
              type="valid"
              style={{ color: "var(--bs-light)" }}
            >
              <p>{FEEDBACK[i % FEEDBACK.length]}</p>
            </Form.Control.Feedback>
          </Form.Check>
        </Col>
      );
    });
  };

  return (
    <FormGroup>
      <Row className="flex-wrap">{options()}</Row>
    </FormGroup>
  );
};

import { ChangeEventHandler } from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  updateTheme: ChangeEventHandler;
  themeNames: Array<string>;
  themeBGs: Array<string>;
}

const FEEDBACK = [
  "Oh... I like your taste!",
  "Hey. I like your style.",
  "Are you sure?",
];

export const ThemeChooser = (props: Props) => {
  const themeOptsRender = () => {
    const themes = props.themeNames;
    const bgs = props.themeBGs;
    const numThemes =
      props.themeNames.length === props.themeBGs.length
        ? props.themeNames.length
        : -1;
    const numThemesPerRow = 2;
    const colWidth = Math.floor(12 / numThemesPerRow);
    const numRows = numThemes / numThemesPerRow;
    const heightPerc = 100 / numRows + "%";

    return themes.map((theme, i) => {
      return (
        <Form.Check className="col-6" type="radio" id={theme}>
          <Row
            key={theme + "Col"}
            xs={12}
            className="a"
          >
            <Col xs={2}>
              <Form.Check.Input
                type="radio"
                onChange={props.updateTheme}
                name="theme"
                aria-describedby={theme + "-label"}
              />
            </Col>
            <Col>
              <Form.Check.Label
                id={theme[i] + "-label"}
                style={{ color: "var(--bs-light)" }}
                htmlFor={theme}
              >
                {theme}
              </Form.Check.Label>
            </Col>
          </Row>
          <Row>
            <Image fluid src={bgs[i]}></Image>
          </Row>
          <Row>
            <Form.Control.Feedback
              type="valid"
              style={{ color: "var(--bs-light)" }}
            >
              <p>{FEEDBACK[i % FEEDBACK.length]}</p>
            </Form.Control.Feedback>
          </Row>
        </Form.Check>
      );
    });
  };
  const options = () => {
    return (
      <Container fluid>
        <Row>{themeOptsRender()}</Row>
      </Container>
    );
  };

  return (
    <FormGroup>
      <Row className="flex-wrap py-3">{options()}</Row>
    </FormGroup>
  );
};

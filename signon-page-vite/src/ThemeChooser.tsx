import { ChangeEventHandler } from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export interface IThemes {
  [key: string]: ITheme;
}
export interface ITheme {
  name: string;
  src: string;
}

interface Props {
  updateTheme: ChangeEventHandler;
  themeNames: string[];
  themeBGs: string[];
  themes: IThemes;
}

const FEEDBACK = [
  "Oh... I like your taste!",
  "Hey. I like your style.",
  "Are you sure?",
];

export const ThemeChooser = (props: Props) => {
  const themeOptsRender = () => {
    const { themes } = props;

    // if (Object.entries(themes).length <= 1 || bgs.length <= 1) {
    //   bgs = Object.values(bgsLinks);
    // }
    // const numThemes =
    //   props.themeNames.length === props.themeBGs.length
    //     ? props.themeNames.length
    //     : -1;
    // const numThemesPerRow = 2;
    // const colWidth = Math.floor(12 / numThemesPerRow);
    // const numRows = numThemes / numThemesPerRow;
    // const heightPerc = 100 / numRows + "%";

    return Object.values(themes).map((theme, i) => {
      return (
        <Form.Check
          className="col-3 justify flex-wrap d-flex"
          type="radio"
          id={theme.name}
          key={theme.name + `-${i}`}
          name={theme.name + "-col"}
        >
          <Row className="">
            <Col xs={2} className="">
              <Form.Check.Input
                type="radio"
                onChange={props.updateTheme}
                name="theme"
                aria-describedby={theme.name + "-label"}
              />
              <Form.Check.Label
                id={theme.name + "-label"}
                style={{ color: "var(--bs-light)" }}
                htmlFor={theme.name}
              >
                {theme.name}
              </Form.Check.Label>
            </Col>
          </Row>
          <Row className="">
            <Col
              xs={12}
              id="theme-img-wrapper-row"
              className="justify-content-center align-items-center d-flex"
            >
              <Image fluid src={theme.src}></Image>
            </Col>
            <Form.Control.Feedback
              type="valid"
              className="col"
              style={{ color: "var(--bs-light)" }}
            >
              <p>{FEEDBACK[i % FEEDBACK.length]}</p>
            </Form.Control.Feedback>
          </Row>
        </Form.Check>
      );
    });
  };

  return (
    <FormGroup id="themes-form-group" className="row">
      {/* <Row className="flex-wrap" id="themes-row-wrapper">{themeOptsRender()}</Row> */}
      {themeOptsRender()}
    </FormGroup>
  );
};

import { ChangeEventHandler } from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Image from "react-bootstrap/Image";
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
    let themes = props.themeNames;
    let bgs = props.themeBGs;
    const bgsLinks = {
      seeingDouble: "https://i.postimg.cc/HxhXYXj2/double-Trouble.webp",
      ahhhhhh: "https://i.postimg.cc/Gm1Ppjgq/ahhBG.webp",
      racing: "https://i.postimg.cc/DzjCwcwW/race-Track.webp",
      bitwarden: "https://i.postimg.cc/cCKzR6p2/black-BG-bitwarden.webp",
    };
    if (!!themes?.length || !!bgs?.length) {
      themes = Object.keys(bgsLinks);
      bgs = Object.values(bgsLinks);
    }
    // const numThemes =
    //   props.themeNames.length === props.themeBGs.length
    //     ? props.themeNames.length
    //     : -1;
    // const numThemesPerRow = 2;
    // const colWidth = Math.floor(12 / numThemesPerRow);
    // const numRows = numThemes / numThemesPerRow;
    // const heightPerc = 100 / numRows + "%";

    return themes.map((theme, i) => {
      return (
        <Form.Check
          className="col-3 justify flex-wrap d-flex"
          type="radio"
          id={theme}
          name={theme + "-col"}
        >
          <Row className="">
            <Col xs={2} className="">
              <Form.Check.Input
                type="radio"
                onChange={props.updateTheme}
                name="theme"
                aria-describedby={theme + "-label"}
              />
              <Form.Check.Label
                id={theme[i] + "-label"}
                style={{ color: "var(--bs-light)" }}
                htmlFor={theme}
              >
                {theme}
              </Form.Check.Label>
            </Col>
          </Row>
          <Row className="">
            <Col
              xs={12}
              id="theme-img-wrapper-row"
              className="justify-content-center align-items-center d-flex"
            >
              <Image fluid src={bgs[i]}></Image>
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

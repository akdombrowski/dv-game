import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ChangeEventHandler } from "react";

interface Props {
  difficultySelectedFn: ChangeEventHandler<HTMLInputElement>;
}

export const GameDifficultyLevelSelectionFormGroup = (props: Props) => {
  return (
    <Form.Group as={Row} className="gap-1">
      <Form.Label column xs={6} sm="auto">
        Choose a difficulty:
      </Form.Label>
      <Form.Range
        defaultValue={0}
        min={1}
        max={100}
        onChange={props.difficultySelectedFn}
      ></Form.Range>
      {/* <ToggleButtonGroup
        as={Col}
        xs={6}
        sm
        type="radio"
        name="difficultySelectionRadioBtnGroup"
        defaultValue="easy"
        onChange={props.difficultySelectedFn}
      >
        <ToggleButton
          id="radio-difficulty-easy"
          name="radio-difficulty-easy"
          variant="outline-secondary"
          value="easy"
        >
          easy
        </ToggleButton>
        <ToggleButton
          id="radio-difficulty-medium"
          name="radio-difficulty-medium"
          variant="outline-secondary"
          value="medium"
        >
          medium
        </ToggleButton>
        <ToggleButton
          id="radio-difficulty-hard"
          name="radio-difficulty-hard"
          variant="outline-secondary"
          value="hard"
        >
          hard
        </ToggleButton>
      </ToggleButtonGroup> */}
    </Form.Group>
  );
};

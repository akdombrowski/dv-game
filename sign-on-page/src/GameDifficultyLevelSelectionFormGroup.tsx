import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface Props {
  difficultySelectedFn: ChangeEventHandler<HTMLInputElement>;
}

export const GameDifficultyLevelSelectionFormGroup = (props: Props) => {
  const [difficulty, setDifficulty] = useState("1");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDifficulty(e.target.value);
    props.difficultySelectedFn(e);
  };

  return (
    <Form.Group as={Row} className="gap-1">
      <Form.Label column xs={6} sm="auto" style={{ color: "white" }}>
        Choose a difficulty: ({difficulty})
      </Form.Label>
      <Form.Range
        className="px-5"
        defaultValue={difficulty}
        min={1}
        max={25}
        onChange={handleChange}
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

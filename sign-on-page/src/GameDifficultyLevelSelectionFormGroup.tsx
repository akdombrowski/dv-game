import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface Props {
  maxDifficulty: number;
  difficultySelectedFn: ChangeEventHandler<HTMLInputElement>;
}

export const GameDifficultyLevelSelectionFormGroup = (props: Props) => {
  const [difficulty, setDifficulty] = useState("3");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDifficulty(e.target.value);
    props.difficultySelectedFn(e);
  };

  return (
    <Form.Group as={Row} className="gap-1">
      <Form.Label
        column
        xs={6}
        sm="auto"
        style={{ color: "var(--bs-gray-400)" }}
      >
        Choose a difficulty: ({difficulty})
      </Form.Label>
      <Form.Range
        className="px-5"
        defaultValue={difficulty}
        min={1}
        max={props.maxDifficulty}
        onChange={handleChange}
      ></Form.Range>
    </Form.Group>
  );
};

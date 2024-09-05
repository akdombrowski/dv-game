import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ChangeEvent, useState } from "react";

interface Props {
  defaultDifficulty?: number;
  maxDifficulty?: number;
  difficultySelectedFn: (d: number) => void;
}

export const GameDifficultyLevelSelectionFormGroup = (props: Props) => {
  const [difficulty, setDifficulty] = useState<number>(
    props.defaultDifficulty ?? 25,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const diff = Number.parseInt(e.target.value);
    setDifficulty(diff);
    props.difficultySelectedFn(diff);
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
        className="px-1"
        defaultValue={difficulty}
        min={1}
        max={props.maxDifficulty ?? 20}
        onChange={handleChange}
      ></Form.Range>
    </Form.Group>
  );
};

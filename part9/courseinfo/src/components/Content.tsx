import type { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;
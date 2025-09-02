import type { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  const part = props.part;
  return (
    <div>
      <p><strong>{part.name} {part.exerciseCount}</strong></p>
      {part.description && <p>{part.description}</p>}
      {(() => {
        switch (part.kind) {
          case 'basic':
            return null;
          case 'group':
            return <p>group project count: {part.groupProjectCount}</p>;
          case 'background':
            return <p>background material: {part.backgroundMaterial}</p>;
          case 'special':
            return <p>required skills: {part.requirements.join(', ')}</p>;
          default:
            const _exhaustiveCheck: never = part;
            return _exhaustiveCheck;
        }
      })()}
    </div>
  )
}

export default Part;
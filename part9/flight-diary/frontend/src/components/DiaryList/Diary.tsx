import type { DiaryEntry } from "../../types";

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = (props: DiaryProps) => {
  const { diary } = props;
  return (
    <div>
      <h3>{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};

export default Diary;
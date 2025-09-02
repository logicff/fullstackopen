import type { DiaryEntry } from "../../types";
import Diary from "./Diary";

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = (props: DiaryListProps) => {
  const { diaries } = props;
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiaryList;
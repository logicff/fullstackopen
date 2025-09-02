import { useState, useEffect } from "react";
import type { DiaryEntry, DiaryFormValues } from "./types";
import diaryService from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    fetchDiaries();
  }, []);

  const addDiary = async (diary: DiaryFormValues) => {
    try {
      const newDiary = await diaryService.create(diary);
      setDiaries(diaries.concat(newDiary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div>
      <DiaryForm addDiary={addDiary} error={error} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;

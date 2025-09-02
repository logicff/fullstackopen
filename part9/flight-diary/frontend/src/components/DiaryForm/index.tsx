import { useState, type SyntheticEvent } from "react";
import type { DiaryFormValues, Visibility, Weather } from "../../types";

interface DiaryFormProps {
  addDiary: (diary: DiaryFormValues) => void;
  error?: string;
}

const DiaryForm = (props: DiaryFormProps) => {
  const { addDiary, error } = props;
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');
  
  const createDiary = (event: SyntheticEvent) => {
    event.preventDefault();
    addDiary({
      date, visibility, weather, comment,
    });

    setDate('');
    setVisibility('great');
    setWeather('sunny');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && (<p style={{ color: '#dc2626' }}>{error}</p>)}
      <form onSubmit={createDiary}>
        <div>
          date:
          <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          visibility:
          <input type="radio" name="visibility"  value="great" checked={visibility === 'great'} onChange={({ target }) => setVisibility(target.value as Visibility)} />
          <label>great</label>

          <input type="radio" name="visibility"  value="good" checked={visibility === 'good'} onChange={({ target }) => setVisibility(target.value as Visibility)} />
          <label>good</label>

          <input type="radio" name="visibility"  value="ok" checked={visibility === 'ok'} onChange={({ target }) => setVisibility(target.value as Visibility)} />
          <label>ok</label>

          <input type="radio" name="visibility"  value="poor" checked={visibility === 'poor'} onChange={({ target }) => setVisibility(target.value as Visibility)} />
          <label>poor</label>
        </div>
        <div>
          weather:
          <input type="radio" name="weather" value="sunny" checked={weather === 'sunny'} onChange={({ target }) => setWeather(target.value as Weather)} />
          <label>sunny</label>

          <input type="radio" name="weather" value="rainy" checked={weather === 'rainy'} onChange={({ target }) => setWeather(target.value as Weather)} />
          <label>rainy</label>

          <input type="radio" name="weather" value="cloudy" checked={weather === 'cloudy'} onChange={({ target }) => setWeather(target.value as Weather)} />
          <label>cloudy</label>

          <input type="radio" name="weather" value="stormy" checked={weather === 'stormy'} onChange={({ target }) => setWeather(target.value as Weather)} />
          <label>stormy</label>

          <input type="radio" name="weather" value="windy" checked={weather === 'windy'} onChange={({ target }) => setWeather(target.value as Weather)} />
          <label>windy</label>
        </div>
        <div>
          comment:
          <input value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
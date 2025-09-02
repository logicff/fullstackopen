export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type DiaryFormValues = Omit<DiaryEntry, "id">;

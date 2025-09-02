import axios from 'axios';
import type { DiaryEntry, DiaryFormValues } from '../types';

const baseUrl = '/api/diaries';

const getAll = async () => {
  const res = await axios.get<DiaryEntry[]>(baseUrl);
  return res.data;
};

const create = async (obj: DiaryFormValues) => {
  const res = await axios.post<DiaryEntry>(baseUrl, obj);
  return res.data;
};

export default {
  getAll,
  create,
};
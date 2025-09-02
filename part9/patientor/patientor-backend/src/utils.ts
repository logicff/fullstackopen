import { NewPatient, Gender, HealthCheckRating, EntryWithoutId } from "./types";
import { z } from 'zod';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender).map(v => v.toString()).includes(param);
// };

// const parseString = (text: unknown): string => {
//   if (!text || !isString(text)) {
//     throw new Error('Incorrect or missing text');
//   }
//   return text;
// };

// const parseDate = (date: unknown): string => {
//   if (!date || !isString(date) || !isDate(date)) {
//     throw new Error('Incorrect or missing date: ' + date);
//   }
//   return date;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//       throw new Error('Incorrect or missing gender: ' + gender);
//   }
//   return gender;
// };

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

const diagnosisCodeSchema = z.string();
export const diagnosisSchema = z.object({
  code: diagnosisCodeSchema,
  name: z.string(),
  latin: z.string().optional()
});

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(diagnosisCodeSchema).optional()
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  })
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }).optional()
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.enum(HealthCheckRating)
});

export const entryWithoutIdSchema = z.discriminatedUnion('type', [
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema
]);

export const toEntryWithoutId = (object: unknown): EntryWithoutId => {
  return entryWithoutIdSchema.parse(object) as EntryWithoutId;
};
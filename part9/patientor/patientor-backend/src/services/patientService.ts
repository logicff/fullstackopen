import patientData from '../data/patients';
import { NewPatient, NonSensitivePatient, Patient, Entry, EntryWithoutId } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntryToPatient = (id: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient) {
    const newEntry = {
      id: uuid(),
      ...entry,
    };
    patient.entries.push(newEntry);
    return newEntry;
  } else {
    return;
  }
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntryToPatient,
};
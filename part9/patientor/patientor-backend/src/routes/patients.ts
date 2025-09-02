import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toEntryWithoutId } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res, next) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    next(error);
  }
});

router.post('/:id/entries', (req, res, next) => {
  try {
    const newEntry = toEntryWithoutId(req.body);
    const entry = patientService.addEntryToPatient(req.params.id, newEntry);
    if (entry) {
      res.json(entry);
    } else {
      res.sendStatus(404);
    }
  } catch (error: unknown) {
    next(error);
  }
})

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
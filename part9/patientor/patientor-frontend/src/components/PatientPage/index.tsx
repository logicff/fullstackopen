import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PatientInfo from "./PatientInfo";
import EntryDetail from "./EntryDetail";
import AddEntryModal from "./AddEntryModal";
import axios from "axios";

import { Typography, Box, Button } from "@mui/material";

import patientService from "../../services/patients";

import { Patient, Diagnosis, EntryWithoutId } from "../../types";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [adderror, setAddError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setAddError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setError(message);
          } else {
            setError("Patient don't exist");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }

    if (id) {
      fetchPatient(id);
    } else {
      setPatient(null);
    }
  }, [id]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id) return;
    try {
      const entry = await patientService.addEntryFor(id, values);
      if (patient) {
        const updatedPatient = {
          ...patient,
          entries: [...(patient.entries || []), entry]
        };
        setPatient(updatedPatient);
      }
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setAddError(message);
        } else {
          setAddError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setAddError("Unknown error");
      }
    }
  };

  return (
    <div>
      <PatientInfo patient={patient} diagnoses={diagnoses} error={error} />
      
      <Box>
        <Typography variant="h6" style={{ marginBottom: "0.5em", marginTop: "0.5em" }}>
          entries
        </Typography>
      </Box>
      {patient && patient.entries && patient.entries.map(entry => (
        <EntryDetail key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={adderror}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  )
};

export default PatientPage;
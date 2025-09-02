import { Typography, Box, Alert } from "@mui/material";
import { Male, Female } from "@mui/icons-material";

import { Gender, Patient, Diagnosis } from "../../types";

interface PatientInfoProps {
  patient: Patient | null;
  diagnoses: Diagnosis[];
  error?: string;
}

const PatientInfo = ({ patient, error }: PatientInfoProps) => {
  if (patient === null) return (<div>{error && <Alert severity="error">{error}</Alert>}</div>);

  return (
    <div>
      <Box>
        <Typography variant="h5" style={{ marginBottom: "0.5em", marginTop: "0.5em" }}>
          {patient.name}
          {patient.gender === Gender.Other ? null : (patient.gender === Gender.Male ? <Male /> : <Female />)}
        </Typography>
      </Box>
      <div>
        <p>birthday: {patient.dateOfBirth}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    </div>
  );
};

export default PatientInfo;
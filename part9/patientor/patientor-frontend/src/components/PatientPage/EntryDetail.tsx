import { Entry, Diagnosis } from "../../types";
import { Box } from "@mui/material";
import {
  LocalHospital as HospitalIcon,
  Work as OccupationalHealthcareIcon,
  MedicalServices as HealthCheckIcon
} from "@mui/icons-material";

import HealthRatingBar from "../HealthRatingBar";

type EntryType = Entry['type'];

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetail = ({ entry, diagnoses }: EntryProps) => {
  const getDiagnosisDescription = (code: string) => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? `${diagnosis.code} - ${diagnosis.name}` : code;
  };

  const getEntryIcon = (type: EntryType) => {
    switch (type) {
      case 'Hospital':
        return <HospitalIcon />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareIcon />;
      case 'HealthCheck':
        return <HealthCheckIcon />;
      default:
        // Exhaustive type checking
        const _exhaustiveCheck: never = type;
        return _exhaustiveCheck;
    }
  };

  const renderEntryDetails = () => {
    switch (entry.type) {
      case 'Hospital':
        return (<p>discharge {entry.discharge.date}: {entry.discharge.criteria}</p>);
      case 'OccupationalHealthcare':
        return (
          <>
            <p>employer: {entry.employerName}</p>
            {entry.sickLeave && (<p>sick leave: {`${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}</p>)}
          </>
        );
      case 'HealthCheck':
        return (<HealthRatingBar rating={entry.healthCheckRating} showText={false}></HealthRatingBar>);
      default:
        // Exhaustive type checking - will throw error if new type is added
        const _exhaustiveCheck: never = entry;
        return <p color="error">Unknown entry type: {_exhaustiveCheck}</p>;
    }
  }

  return (
    <Box sx={{ 
      p: 2, 
      mb: 3, 
      border: 1, 
      borderColor: 'divider', 
      borderRadius: 2,
      boxShadow: 1 
    }}>
      <p>
        {entry.date} {getEntryIcon(entry.type)}
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map((code, index) => (
          <li key={index}>{getDiagnosisDescription(code)}</li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>

      {renderEntryDetails()}
    </Box>
  );
};

export default EntryDetail;
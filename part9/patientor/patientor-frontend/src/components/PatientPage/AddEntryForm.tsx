import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, MenuItem, Select, Grid, Button } from '@mui/material';

import { EntryWithoutId, HealthCheckRating, Entry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

type EntryType = Entry['type'];

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

// TypeScript 枚举在编译后会生成双向映射的对象，包含 { key: value, value: key }
const ratingOptions: RatingOption[] = (Object.keys(HealthCheckRating)
  .filter(key => !isNaN(Number(key))) // 过滤出数值键（即枚举值）
  .map(key => ({
    value: Number(key) as HealthCheckRating, // 转换为数值类型
    label: HealthCheckRating[Number(key) as HealthCheckRating] // 获取对应的标签
  }))
);

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>('HealthCheck');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [codes, setCodes] = useState('');
  const [specialist, setSpecialist] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let entryData;
    switch (type) {
      case 'Hospital':
        entryData = {
          type: 'Hospital' as const,
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: codes
            ? codes.split(',').map(code => code.trim())
            : undefined,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;

      case 'OccupationalHealthcare':
        entryData = {
          type: 'OccupationalHealthcare' as const,
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: codes
            ? codes.split(',').map(code => code.trim())
            : undefined,
          employerName: employerName,
          sickLeave: sickLeaveStartDate && sickLeaveEndDate
            ? {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate
            }
            : undefined
        };
        break;

      case 'HealthCheck':
        entryData = {
          type: 'HealthCheck' as const,
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: codes
            ? codes.split(',').map(code => code.trim())
            : undefined,
          healthCheckRating: healthCheckRating
        };
        break;

      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`Unsupported entry type: ${_exhaustiveCheck}`);
    }

    onSubmit(entryData);
  };

  const renderTypeSpecificFields = () => {
    switch (type) {
      case 'Hospital':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Discharge Date"
                name="dischargeDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Discharge Criteria"
                name="dischargeCriteria"
                multiline
                rows={2}
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </Grid>
          </Grid>
        );
      
      case 'OccupationalHealthcare':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Employer Name"
                name="employerName"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sick Leave Start Date"
                name="sickLeaveStartDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sick Leave End Date"
                name="sickLeaveEndDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </Grid>
          </Grid>
        );

      case 'HealthCheck':
        return (
          <>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              name="healthCheckRating"
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={({ target }) => setHealthCheckRating(target.value as HealthCheckRating)}
            >
              {ratingOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <div>
          <input type="radio" name="type" value="Hospital" checked={type === 'Hospital'} onChange={({ target }) => setType(target.value as EntryType)} />
          <label>Hospital</label>

          <input type="radio" name="type" value="OccupationalHealthcare" checked={type === 'OccupationalHealthcare'} onChange={({ target }) => setType(target.value as EntryType)} />
          <label>OccupationalHealthcare</label>

          <input type="radio" name="type" value="HealthCheck" checked={type === 'HealthCheck'} onChange={({ target }) => setType(target.value as EntryType)} />
          <label>HealthCheck</label>
        </div>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={2}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          placeholder="Description of the entry"
        />

        <TextField
          margin="normal"
          fullWidth
          label="Diagnosis Codes (comma separated)"
          name="diagnosisCodes"
          value={codes}
          onChange={({ target }) => setCodes(target.value)}
          placeholder="e.g. Z57.1, Z74.3"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Specialist"
          name="specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          placeholder="Name of the treating specialist"
        />

        {renderTypeSpecificFields()}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
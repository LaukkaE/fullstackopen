import patientsData from '../../data/patients.json';
import { v4 as uuid } from 'uuid';

import {
    PatientEntry,
    NonSensitivePatientEntry,
    newPatientEntry,
} from '../types';

const patients: Array<PatientEntry> = patientsData;

const getEntries = () => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addEntry = (entry: newPatientEntry): PatientEntry => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...entry,
    };

    patientsData.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
};

import { PublicPatient } from './../types';
import patientsData from '../../data/patients';
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
const getAllPatientInfo = (id: string): PatientEntry | undefined => {
    const foundPatient = patients.find((patient) => patient.id === id);
    if (!foundPatient) return undefined;

    return foundPatient;
};

const getPatientInfo = (id: string): PublicPatient | undefined => {
    const foundPatient = patients.find((patient) => patient.id === id);
    if (!foundPatient) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, entries, ...modifiedPatient } = foundPatient;

    return modifiedPatient;
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
    getPatientInfo,
    getAllPatientInfo,
};

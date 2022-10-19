import { newPatientEntry, Gender } from './types';

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};
const parseSsn = (SSN: unknown): string => {
    if (!SSN || !isString(SSN)) {
        throw new Error('Incorrect or missing SSN');
    }

    return SSN;
};
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = ({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
}: Fields): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
    };

    return newEntry;
};

// type EntryFields = {
//     id?: unknown;
//     dateOfBirth: unknown;
//     ssn: unknown;
//     gender: unknown;
//     occupation: unknown;
// };

// export interface PatientEntry {
//     id?: string;
//     name: string;
//     dateOfBirth: string;
//     ssn: string;
//     gender: string;
//     occupation: string;
//     entries?: Entry[];
// }

export default toNewPatientEntry;

import { Diagnosis } from './../types';
import { State } from './state';
import { Patient } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      }
    | {
          type: 'SET_DIAGNOSIS_LIST';
          payload: Diagnosis[];
      };

export const setPatientList = (patientList: Patient[]): Action => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: patientList,
    };
};
export const setDiagnosisList = (diagnosislist: Diagnosis[]): Action => {
    return {
        type: 'SET_DIAGNOSIS_LIST',
        payload: diagnosislist,
    };
};
export const addPatient = (patient: Patient): Action => {
    return {
        type: 'ADD_PATIENT',
        payload: patient,
    };
};
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case 'ADD_PATIENT':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case 'SET_DIAGNOSIS_LIST':
            return {
                ...state,
                diagnoses: [...action.payload],
            };
        default:
            return state;
    }
};

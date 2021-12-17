import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Gender, Patient } from '../types';

const PatientInformationPage = () => {
    const [, dispatch] = useStateValue();
    const [patient, setPatient] = React.useState<Patient>({
        name: '',
        id: '000',
        occupation: 'none',
        gender: Gender.Male,
        entries: [],
    });
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatientList = async () => {
            try {
                const { data: fetchedPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );

                setPatient(fetchedPatient);
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientList();
    }, [dispatch]);

    if (!patient.ssn) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <button onClick={() => console.log(patient)}>debug</button>
            <h2>
                {patient.name}{' '}
                <Icon
                    name={
                        patient.gender === 'male'
                            ? 'man'
                            : patient.gender === 'female'
                            ? 'woman'
                            : 'other gender'
                    }
                />
            </h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>DOB: {patient.dateOfBirth}</p>
            <h4>entries</h4>
            {patient.entries?.map((entry, index) => {
                return (
                    <div key={index}>
                        <p>
                            {entry.date} {entry.description}
                        </p>
            {entry.diagnosisCodes &&          <ul>
                            {entry.diagnosisCodes.map(
                                (dCode, index: number) => (
                                    <li key={index}>{dCode}</li>
                                )
                            )}
                        </ul>}
                    </div>
                );
            })}
        </div>
    );
};

export default PatientInformationPage;

import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Diagnosis, Entry, Gender, Patient } from '../types';
import PatientEntry from './PatientEntry';
import AddEntryModal, { MegaEntry } from '../AddEntryModal';

const PatientInformationPage = () => {
    const [{ diagnoses }, dispatch] = useStateValue();
    // const [diagnoseList, setDiagnoseList] = React.useState<Diagnosis[]>([]);
    const [patient, setPatient] = React.useState<Patient>({
        name: '',
        id: '000',
        occupation: 'none',
        gender: Gender.Male,
        entries: [],
    });
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: MegaEntry) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function isEmpty(obj: any): boolean {
            // helpperi poistamaan tyhjät objectit, integer check ettei healthcheckrating grieffaannu
            if (Number.isInteger(obj)) return false;
            return Object.keys(obj).length === 0;
        }
        function removeEmpty(obj: MegaEntry): MegaEntry {
            return Object.fromEntries(
                Object.entries(obj)
                    // testataan ettei oo null(healthcheckrating), tyhjä string tai tyhjä object
                    .filter(
                        ([_, v]) => v != null && v.length != 0 && !isEmpty(v)
                    )
                    // ammutaan rekursiivisesti nested objekteihin
                    .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
            );
        }

        let newObj = removeEmpty(values);
        //ajetaan koko paska kahesti läpi että saadaan tyhjät objectit pois, huono ratkasu. :C
        newObj = removeEmpty(newObj);

        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                newObj
            );
            setPatient(newPatient);
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

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
            <button onClick={() => console.log(diagnoses)}>debug</button>
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
                        <PatientEntry entry={entry} />
                    </div>
                );
            })}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientInformationPage;

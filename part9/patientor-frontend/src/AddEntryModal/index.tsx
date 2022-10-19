import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Discharge, Entry, HealthCheckRating, SickLeave } from '../types';
import AddEntryForm from './AddEntryForm';

// Aivan hirveä ratkasu n + 1 määrään erinäköisiä typescript ongelmia
export interface MegaEntry {
    type?: 'Hospital' | 'Occupationalhealthcare' | 'Healthcheck' | string;
    id?: string;
    description?: string;
    date?: string;
    specialist?: string;
    diagnosisCodes?: string[];
    employerName?: string;
    discharge?: Discharge;
    sickLeave?: SickLeave;
    healthCheckRating?: HealthCheckRating | null;
}
interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: MegaEntry) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Entry</Modal.Header>
        <Modal.Content>
            {error && (
                <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;

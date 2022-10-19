import React from 'react';
import {
    Entry,
    HospitalEntry,
    OccupationalHealthcareEntry,
    HealthCheckEntry,
} from '../types';
import { Icon } from 'semantic-ui-react';
import { assertNever } from '../utils';

const css = {
    width: '800px',
    minHeight: '50px',
    border: '1px solid black',
    borderRadius: '5px',
    marginBottom: '15px',
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <div style={css}>
            <p>
                {entry.date} <Icon name="ambulance" />
            </p>
            <p>{entry.description}</p>
            <p>
                Discharged at {entry.discharge?.date} reason :
                {entry.discharge?.criteria}
            </p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};
const OccupationalHealth: React.FC<{
    entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
    return (
        <div style={css}>
            <p>
                {entry.date} <Icon name="building outline" />{' '}
                {entry.employerName}
            </p>
            <p>{entry.description}</p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};
const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <div style={css}>
            <p>
                {entry.date} <Icon name="heartbeat" color="red" />
            </p>
            <p>{entry.description}</p>
            <p>
                <Icon
                    name="heart"
                    color={
                        entry.healthCheckRating === 0
                            ? 'green'
                            : entry.healthCheckRating === 1
                            ? 'yellow'
                            : entry.healthCheckRating === 2
                            ? 'red'
                            : 'black'
                    }
                />
            </p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

const PatientEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <Hospital entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealth entry={entry} />;
        case 'HealthCheck':
            return <HealthCheck entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default PatientEntry;

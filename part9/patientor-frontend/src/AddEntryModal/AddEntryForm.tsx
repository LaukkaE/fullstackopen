import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik, FormikProps } from 'formik';
import { Button, Dropdown, Form, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { MegaEntry } from '.';

interface Props {
    onSubmit: (values: MegaEntry) => void;
    onCancel: () => void;
}
interface EntryOptionTypes {
    key: string;
    text: string;
    value: string;
}
interface HealthOptionTypes {
    key: string;
    text: string;
    value: number;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    const EntryOptions: EntryOptionTypes[] = [
        { key: 'Hospital', text: 'Hospital', value: 'Hospital' },
        {
            key: 'Occupational',
            text: 'Work related visit',
            value: 'OccupationalHealthcare',
        },
        { key: 'Healthcheck', text: 'Healthcheck', value: 'HealthCheck' },
    ];
    const healthOptions: HealthOptionTypes[] = [
        { key: 'Healthy', text: 'Healthy', value: 0 },
        { key: 'LowRisk', text: 'LowRisk', value: 1 },
        { key: 'HighRisk', text: 'HighRisk', value: 2 },
        { key: 'CriticalRisk', text: 'CriticalRisk', value: 3 },
    ];
    const [entryType, setEntryType] = useState<string>(EntryOptions[0]?.value);
    const megaValues: MegaEntry = {
        type: entryType,
        description: '',
        date: '',
        specialist: '',
        employerName: '',
        healthCheckRating: null,
        sickLeave: {
            startDate: '',
            endDate: '',
        },
        discharge: {
            criteria: '',
            date: '',
        },
    };

    return (
        <Formik
            initialValues={megaValues}
            enableReinitialize
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (entryType != 'HealthCheck') {
                    if (
                        !values.sickLeave?.startDate ||
                        !values.sickLeave?.endDate
                    ) {
                        errors.sickLeave = requiredError;
                    }
                }

                if (entryType === 'Hospital') {
                    if (!values.discharge?.criteria || !values.discharge.date)
                        errors.discharge = requiredError;
                }
                if (entryType === 'HealthCheck') {
                    if (values.healthCheckRating === null) {
                        errors.healthCheckRating = requiredError;
                    }
                }
                if (entryType === 'OccupationalHealthcare') {
                    if (!values.employerName) {
                        errors.employerName = requiredError;
                    }
                }
                return errors;
            }}
        >
            {({
                isValid,
                dirty,
                setFieldValue,
                setFieldTouched,
                submitForm,
                resetForm,
            }) => {
                const typeSelect = (
                    event: React.SyntheticEvent<HTMLElement>,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    { value }: any
                ) => {
                    const field = 'type';
                    setEntryType(value);
                    setFieldValue(field, value);
                };

                return (
                    <Form className="form ui">
                        <Form.Field>
                            <label>Entry Type</label>
                            <Dropdown
                                name="type"
                                fluid
                                defaultValue={entryType}
                                selection
                                options={EntryOptions}
                                onChange={typeSelect}
                            />
                        </Form.Field>
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label="description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Entry Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        {entryType === 'OccupationalHealthcare' && (
                            <Field
                                label="Employer"
                                placeholder="Employer"
                                name="employerName"
                                component={TextField}
                            />
                        )}
                        {entryType != 'HealthCheck' && ( //Occupational & Hospital
                            <>
                                <Field
                                    label="Sickleave start"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.startDate"
                                    component={TextField}
                                />
                                <Field
                                    label="Sickleave end"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.endDate"
                                    component={TextField}
                                />
                            </>
                        )}
                        {entryType === 'Hospital' && (
                            <>
                                <Field
                                    label="Discharge criteria"
                                    placeholder="Discharge criteria"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                                <Field
                                    label="Discharge date"
                                    placeholder="YYYY-MM-DD"
                                    name="discharge.date"
                                    component={TextField}
                                />
                            </>
                        )}
                        {entryType === 'HealthCheck' && (
                            <Form.Field>
                                <label>Healthrating</label>
                                <Dropdown
                                    name="healthCheckRating"
                                    fluid
                                    selection
                                    options={healthOptions}
                                    onChange={(e, { value }) =>
                                        setFieldValue(
                                            'healthCheckRating',
                                            value
                                        )
                                    }
                                />
                            </Form.Field>
                        )}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    color="red"
                                >
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    onClick={submitForm}
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;

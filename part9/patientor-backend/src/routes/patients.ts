import { Entry } from './../types';
import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();
import toNewPatientEntry from '../utils';
import patientService from '../services/patientService';

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

// router.get('/:id', (req, res) => {
//     const foundPatient = patientService.getPatientInfo(req.params.id);
//     if (!foundPatient) res.send({ error: 'Patient not found' });
//     res.send(foundPatient);
// });
router.get('/:id', (req, res) => {
    const foundPatient = patientService.getAllPatientInfo(req.params.id);
    if (!foundPatient) res.send({ error: 'Patient not found' });
    res.send(foundPatient);
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedPatientEntry = patientService.addEntry(newPatientEntry);
        res.json(addedPatientEntry);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});

router.post(
    '/:id/entries',
    (req: Request<{ id: string }, never, Entry>, res: Response) => {
        try {
            const modifiedPatient = patientService.addPatientEntry(
                req.params.id,
                req.body
            );
            res.json(modifiedPatient);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    }
);

export default router;

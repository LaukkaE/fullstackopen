import express from 'express';

const router = express.Router();
import toNewPatientEntry from '../utils';
import patientService from '../services/patientService';

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
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

export default router;

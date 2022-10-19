"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const utils_1 = __importDefault(require("../utils"));
const patientService_1 = __importDefault(require("../services/patientService"));
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
// router.get('/:id', (req, res) => {
//     const foundPatient = patientService.getPatientInfo(req.params.id);
//     if (!foundPatient) res.send({ error: 'Patient not found' });
//     res.send(foundPatient);
// });
router.get('/:id', (req, res) => {
    const foundPatient = patientService_1.default.getAllPatientInfo(req.params.id);
    if (!foundPatient)
        res.send({ error: 'Patient not found' });
    res.send(foundPatient);
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedPatientEntry = patientService_1.default.addEntry(newPatientEntry);
        res.json(addedPatientEntry);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        console.log(e.message);
        res.status(400).send(e.message);
    }
});
exports.default = router;

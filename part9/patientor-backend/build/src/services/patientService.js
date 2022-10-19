"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const getAllPatientInfo = (id) => {
    const foundPatient = patients.find((patient) => patient.id === id);
    if (!foundPatient)
        return undefined;
    return foundPatient;
};
const getPatientInfo = (id) => {
    const foundPatient = patients.find((patient) => patient.id === id);
    if (!foundPatient)
        return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, entries } = foundPatient, modifiedPatient = __rest(foundPatient, ["ssn", "entries"]);
    return modifiedPatient;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addEntry = (entry) => {
    const id = (0, uuid_1.v4)();
    const newPatient = Object.assign({ id }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
    getPatientInfo,
    getAllPatientInfo,
};

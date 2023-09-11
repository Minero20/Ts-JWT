"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// select all
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield models_1.road_safeties.findAll();
    res.json(data);
}));
// select by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield models_1.road_safeties.findByPk(req.params.id);
    res.json(data);
}));
// insert
router.post('/insert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        if (!data.name) {
            throw 'name is not found';
        }
        models_1.road_safeties.create({
            name: data.name,
            usId: data.usId,
            forYears: data.forYears,
            introdution: data.introdution,
            objective: data.objective,
            detail: data.detail
        });
        res.json({ 'status': true });
    }
    catch (e) {
        res.json({ 'status': false, 'error': e });
    }
}));
// update
router.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        if (!data.id) {
            throw 'id is not found';
        }
        if (!data.name) {
            throw 'name is not found';
        }
        models_1.road_safeties.update({
            name: data.name,
            usId: data.usId,
            forYears: data.forYears,
            introdution: data.introdution,
            objective: data.objective,
            detail: data.detail
        }, {
            where: { id: data.id }
        });
        res.json({ 'status': true });
    }
    catch (e) {
        res.json({ 'status': false, 'error': e });
    }
}));
// delete by id
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        if (!data.id) {
            throw 'id is not found';
        }
        models_1.road_safeties.destroy({ where: { id: data.id } });
        res.json({ 'status': true });
    }
    catch (e) {
        res.json({ 'status': false, 'error': e });
    }
}));
module.exports = router;

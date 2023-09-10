import { causes_accidents } from "../models";

import express, { Request, Response } from 'express';
const router = express.Router();
// select all
router.get('/', async (req: Request, res: Response) => {
    let data = await causes_accidents.findAll();
    res.json(data);
})
// select by id
router.get('/:id', async (req: Request, res: Response) => {
    let data = await causes_accidents.findByPk(req.params.id);
    res.json(data);
})
// insert
// update
// delete by id

module.exports = router
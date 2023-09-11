import { users } from "../models";
import express, { Request, Response, Router } from 'express';
// import * as bcrypt from 'bcrypt';

require('dotenv').config();

const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/jwtAuthMiddleware')

//login
router.post('/login', async (req, res) => {
    
    try {
        const { username, password } = req.body;
        // const bc = await bcrypt.hash(password, 10);

        if (!(username && password)) {
            return res.status(400).send('ALL input is required'); 
        }

        const user = await users.findOne({ where: { username: username } });
        const pass = await users.findOne({ where: { password: password } });

        if (user && pass) {
            const token = jwt.sign (
                { user_id: user.username, pass },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h'
                }
            );

            user.sid = token;
            await user.save();

            return res.status(200).json(user); 
        }
        return res.status(400).send('Invalid Credentials'); 
        // res.status(200).json(bc); 
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//welcome
router.post('/welcome', auth, async (req, res) => {
    res.status(200).send("welcome to page เย้ๆๆๆๆๆ");
})

// select all
router.get('/', async (req: Request, res: Response) => {
    let data = await users.findAll();
    res.json(data);
})

// select by id
router.get('/:id', async (req: Request, res: Response) => {
    let data = await users.findByPk(req.params.id);
    res.json(data);
})

// insert
router.post('/insert', async (req: Request, res: Response) => {
    let data = req.body;
    try {
        if (!data.name) {
            throw 'name is not found';
        }
        users.create({
            name: data.name,
            utId: data.utId,
            bcId: data.bcId,
            detail: data.detail,
            regisDate: data.regisDate
        });
        res.json({ 'status': true });
    } catch (e) {
        res.json({ 'status': false, 'error': e });
    }
})

// update
router.put('/update', async (req: Request, res: Response) => {
    let data = req.body;
    try {
        if (!data.id) {
            throw 'id is not found';
        }
        if (!data.name) {
            throw 'name is not found';
        }
        users.update({
            name: data.name,
            utId: data.utId,
            bcId: data.bcId,
            detail: data.detail,
            regisDate: data.regisDate
        }, {
            where: { id: data.id }
        });
        res.json({ 'status': true });
    } catch (e) {
        res.json({ 'status': false, 'error': e });
    }
})

// delete by id
router.delete('/delete', async (req: Request, res: Response) => {
    let data = req.body;
    try {
        if (!data.id) {
            throw 'id is not found';
        }
        users.destroy({ where: { id: data.id } });
        res.json({ 'status': true });
    } catch (e) {
        res.json({ 'status': false, 'error': e });
    }
})

module.exports = router

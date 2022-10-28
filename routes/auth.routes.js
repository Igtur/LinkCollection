const {Router} = require('express');
const bctypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Invalide email').isEmail(),
        check('password', 'Min six simbols')
            .isLength({min: 6})
    ],
    async(req,res)=>{
    try {

        console.log('Body:', req.body)

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data from register'
            })
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email: email});

        // проверка что юзер есть в базе
        if (candidate) {
         return res.status(400).json({message:'Such user alredy exist'})
        }
        // шифровагие пароля с фронта
        const hashedPassword = await bctypt.hash(password, 12);
        const user = new User({email: email, password: hashedPassword});

        await user.save();

        res.status(201).json({message:'User create'})

    }catch(e){
        res.status(500).json({message: 'Some trouble...'})
    }
    
})

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Insert correct email').normalizeEmail().isEmail(),
        check('password', 'Insert password').exists()
    ],
 async(req,res)=>{
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data from login'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (!user) {
           return res.status(400).json({message: 'Invalid password or email'})
        }

        const isMatch = await bctypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message:'Invalid password or email'})
        }
        
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {
                expiresIn: '1h'
            }
        )

        res.json({token, userId: user.id})

    }catch(e){
        res.status(500).json({message: 'Some trouble...'})
    }
})


module.exports = router;
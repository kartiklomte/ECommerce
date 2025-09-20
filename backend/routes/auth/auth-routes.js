const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, authMiddleware } = require('../../controllers/auth/auth-controller');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/checkauth',authMiddleware,(req,res)=>{
    const user = req.user;
    return res.status(200).json({
        success : true,
        message : "user is authorized",
        user
    })
})

module.exports = router;
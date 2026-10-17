const { Router } = require("express");
const  authConteller = require("../controllers/auth.controller")
const router = Router();

router.post('/register' , authConteller.registerUser)

router.post('/login' , authConteller.loginUser)




module.exports = router;
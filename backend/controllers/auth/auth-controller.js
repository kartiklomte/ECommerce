const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// for registration 
const registerUser = async(req,res)=>{
    
    const {userName, email, password} = req.body;

    try {
        const hashpass = await bcrypt.hash(password,11);

        //checking if the user already existed
        const existsUser = await User.findOne({email});
        if(existsUser){
            return res.status(400).json({
                success : false,
                message : "account with this email already exists",
            });
        }

        const newUser = new User({
            userName,email,password:hashpass,
        })        
        console.log("ready to save the data to dataset");
        await newUser.save();
        return res.status(200).json({
            success : true,
            message : "registration successfull"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : 'error occur while registration'
        })
    }
};

//for login
const loginUser = async(req,res)=>{
    const {email, password} = req.body;

    try {
        //check if the user exist or not
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(400).json({
                success : false,
                message : "account does not exist. please register first",
            })
        }
        //compare the password with the user password which we get by email in the above step 
        const passMatch = await bcrypt.compare(password,checkUser.password);
        if(!passMatch){
            return res.status(400).json({
                success : true,
                message : "password does not match with the email"
            });
        }

        const token = jwt.sign({
            id : checkUser._id , role : checkUser.role, email : checkUser.email, userName: checkUser.userName
        }, 'CLIENT_SECRET_KEY',{expiresIn : '60m'});

        res.cookie("token",token,{httpOnly : true, secure : false}).json({
            success : true,
            message : "log in successfull",
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id,
                userName : checkUser.userName
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'error occur while registration'
        });
    }
};

//for logout
const logoutUser = (req,res)=>{
    res.clearCookie('token').json({
        success : true,
        message : "log out successfully"
    })
}

//auth middleware
const authMiddleware = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "user is not authorized"
        })
    }

    try {
        const decode = jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "user not authorized"
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser ,authMiddleware};
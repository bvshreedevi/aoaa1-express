const Validator = require('fastest-validator');

const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
function signUp(req, res){
    
    //Sign up
    models.User.findOne({where:{email:req.body.regEmail}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists!",
            });
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.regPwd, salt, function(err, hash){
                    const user = {
                        name: req.body.regName,
                        userName:req.body.regUserName,
                        password: hash,
                        email: req.body.regEmail,
                        contactNumber: req.body.regContactNum,
                        bankName: req.body.regBankName,
                        bankAddress: req.body.regBankAddress,
                        
                    }
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User created successfully",
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong!",
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong in db connection!",
        });
    });
}

function login(req, res){
    models.User.findOne({where:{email: req.body.email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Email not found",
            });
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successful!",                            
                            token: token
                        });
                    });
                }else{
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}

 module.exports = {
     signUp:signUp,
     login: login
 }
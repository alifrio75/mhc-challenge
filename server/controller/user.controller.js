const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserModel = mongoose.model('user');

exports.createUser = async (req, res) => {
    try {
        const findUser = await UserModel.findOne({company: req.body.company})
        if (findUser) {
            res.status(500).send({message : 'user exist', user: findUser})
        } else {
            const addEntries = await UserModel.create(req.body)
            res.status(200).send(addEntries);
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const handleError = (res) => {
    res.status(500).send({message : 'login error'})
    return
}

exports.login = async (req, res) => {
    try {
        const findUser = await UserModel.findOne({company: req.body.company})
        if (!findUser) handleError(res);
        if (findUser.password !== req.body.password) handleError(res);
        console.log(findUser)
        const payload = {
            id: findUser.id,
            company: findUser.company,
            email: findUser.email,
            role: findUser.role
        };
        const jwtOption = {
            expiresIn: 31556926,
        }
        const processResponse = (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token,
            });
        }
        jwt.sign(payload,process.env.SECRET_KEY, jwtOption, processResponse);        
    } catch (error) {
        handleError(res);
    }
}

exports.getVendor = async (req, res) => {
    try {
        const findVendor = await UserModel.find({ role: "Vendor" }, 'company')
        res.status(200).send(findVendor)
    } catch (error) {
        res.status(500).send(error)
    }
}
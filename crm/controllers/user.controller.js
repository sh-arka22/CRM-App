/**
 * This is the controller file for the user resource
 */
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

/**
 * 
 * Get the list of all the users 
 */
exports.findAll = async (req, res) => {


    const queryObj = {};
    /**
     * Reading the optional query params
     */
    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;
    if (userTypeQP) {
        queryObj.userType = userTypeQP;
    }

    if (userStatusQP) {
        queryObj.userStatus = userStatusQP;
    }


    try {
        const users = await User.find(queryObj);
        res.status(200).send(objectConverter.userResponse(users));

    } catch (err) {
        console.log("Error while fetching all the users");
        res.status(500).send({
            message: "Internal server error"
        })
    }

}
/**
 * This method will return the User details based on the id
 */
exports.findByUserId = async (req, res) => {

    try {
        const user = await User.find({ userId: req.params.id });
        // user validation would have happened in the middleware itself
        return res.status(200).send(objectConverter.userResponse(user));

    } catch (err) {
        console.log("Error while searching the user ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

exports.update = async (req, res) => {

    try {
        const user = await User.findOne({ userId: req.params.id });
        user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.userStatus;
        user.name = req.body.name != undefined ? req.body.name : user.name;
        user.userType = req.body.userType != undefined ? req.body.userType : user.userType;
        const updatedUser = await user.save();
        res.status(200).send({
            name: updatedUser.name,
            userId: updatedUser.userId,
            email: updatedUser.email,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus,
        })
    } catch (err) {
        console.log("Error whileDB operation", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}


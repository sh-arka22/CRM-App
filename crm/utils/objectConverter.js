exports.userResponse =  (users) =>{


    userResult = [];

    users.forEach(user => {
        userResult.push({
            name : user.name,
            userid :user.userId,
            email : user.email,
            userTypes : user.userType,
            userStatus : user.userStatus
        });
    });
    return userResult;
    
}
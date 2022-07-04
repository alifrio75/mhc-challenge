const UserController = require('./../controller/user.controller')

module.exports = (app) => {
    app.post('/api/createUser', UserController.createUser)
    app.post('/api/user/login', UserController.login)
    app.get('/api/user/vendor', UserController.getVendor)
};

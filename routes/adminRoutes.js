const express = require('express');
const route = express.Router();

const amdinCtl = require('../controller/adminController');
const Admin = require('../models/adminModel');

const upload = Admin.uploadImage;

const checkAuth = (req, res, next) => {
    try {
        if (!req.cookies.userData) {
            return res.redirect('/login');
        }

        next();
    } catch (err) {
        console.log(err);
        return res.redirect('/login');
    }
};

route.get('/signup', amdinCtl.signupPage);
route.post('/register', amdinCtl.registerPage);

route.get('/login', amdinCtl.loginPage);
route.post('/loginUser', amdinCtl.loginUser);

route.get('/', checkAuth, amdinCtl.dashboardPage);

route.get('/add-admin', checkAuth, amdinCtl.addAdminPage);
route.post('/add-admin', checkAuth, upload, amdinCtl.insertAdmin);

route.get('/view-admin', checkAuth, amdinCtl.viewAdminPage);

route.get('/edit-admin/:id', checkAuth, amdinCtl.editAdminPage);
route.post('/update-admin/:id', checkAuth, upload, amdinCtl.updateAdmin);

route.get('/delete-admin/:id', checkAuth, amdinCtl.deleteAdmin);

route.get('/logout', checkAuth, amdinCtl.logout);

module.exports = route;
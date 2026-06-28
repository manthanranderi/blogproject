const Admin = require('../models/adminModel');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const deleteAdminAvatar = (avatar) => {
    if (!avatar) {
        return;
    }

    const imagePath = path.join(
        __dirname,
        '..',
        'public',
        avatar.replace(/^\//, '')
    );

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted successfully");
    } else {
        console.log("Image not found, skipping delete");
    }
};

module.exports.signupPage = (req, res) => {
    try {
        return res.render('signup');
    } catch (err) {
        console.log(err);
    }
};

module.exports.registerPage = async (req, res) => {
    try {
        let checkEmail = await Admin.findOne({
            email: req.body.email
        });

        if (checkEmail) {
            console.log("User Already Exist");
            return res.redirect('/signup');
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10);

        req.body.password = hashPassword;

        await Admin.create(req.body);

        console.log("SignUp Successfully...!");
        return res.redirect('/login');
    } catch (err) {
        console.log(err);
    }
};

module.exports.loginPage = (req, res) => {
    try {
        return res.render('login');
    } catch (err) {
        console.log(err);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let user = await Admin.findOne({
            email: req.body.email
        });

        if (!user) {
            console.log("Invalid Email");
            return res.redirect('/login');
        }

        let matchPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!matchPassword) {
            console.log("Password Incorrect");
            return res.redirect('/login');
        }

        res.cookie('userData', user._id, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        console.log("Login SuccessFully");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

module.exports.logout = (req, res) => {
    try {
        res.clearCookie('userData');
        return res.redirect('/login');
    } catch (err) {
        console.log(err);
    }
};

module.exports.dashboardPage = (req, res) => {
    try {
        return res.render('dashboard');
    } catch (err) {
        console.log(err);
    }
};

module.exports.addAdminPage = (req, res) => {
    try {
        return res.render('add-admin');
    } catch (err) {
        console.log(err);
    }
};

module.exports.insertAdmin = async (req, res) => {
    try {
        if (req.file) {
            req.body.avatar = Admin.imagePath + '/' + req.file.filename;
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);

        await Admin.create(req.body);

        console.log("ADMIN ADDED SUCCESSFULLY...!");

        return res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

module.exports.viewAdminPage = async (req, res) => {
    try {
        const adminData = await Admin.find();

        return res.render('view-admin', {
            adminData
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.editAdminPage = async (req, res) => {
    try {
        const id = req.params.id;

        const singleAdmin = await Admin.findById(id);

        if (!singleAdmin) {
            return res.send("Admin not found");
        }

        return res.render('edit-admin', {
            admin: singleAdmin
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports.updateAdmin = async (req, res) => {
    try {
        const id = req.params.id;

        const oldAdmin = await Admin.findById(id);

        if (!oldAdmin) {
            return res.send("Admin not found");
        }

        let avatar = oldAdmin.avatar;

        if (req.file) {
            deleteAdminAvatar(oldAdmin.avatar);
            avatar = Admin.imagePath + '/' + req.file.filename;
        }

        await Admin.findByIdAndUpdate(id, {
            fname: req.body.fname,
            lname: req.body.lname,
            uname: req.body.uname,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            hobby: req.body.hobby,
            city: req.body.city,
            role: req.body.role,
            address: req.body.address,
            avatar: avatar
        });

        return res.redirect('/view-admin');

    } catch (err) {
        console.log(err);
    }
};

module.exports.deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;

        const singleAdmin = await Admin.findById(id);

        if (!singleAdmin) {
            return res.send("Admin not found");
        }

        deleteAdminAvatar(singleAdmin.avatar);

        await Admin.findByIdAndDelete(id);

        return res.redirect('/view-admin');
    } catch (err) {
        console.log(err);
    }
};

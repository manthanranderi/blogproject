const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const imagePath = '/assets/images/avtar/admin';
const { timeStamp } = require('console');

const adminSchema = mongoose.Schema({
    fname: {
        type: String,
        // required : true
    },
    lname: {
        type: String,
        // required : true
    },
    uname: {
        type: String,
        // required : true
    },
    email: {
        type: String,
        unique: true,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    dob: {
        type: Date,
        // required : true
    },
    mobile: {
        type: Number,
        // required : true
    },
    gender: {
        type: String,
        // required : true
    },
    hobby: {
        type: Array,
        // required : true
    },
    city: {
        type: String,
        // required : true
    },
    role: {
        type: String,
        // required : true
    },
    address: {
        type: String,
        // required : true
    },
    avatar: {
        type: String,
        // required : true
    },
}, {
    timestamps: true
});

const adminImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", 'public', imagePath))
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now()
        );
    }
});

adminSchema.statics.uploadImage = multer({
    storage: adminImageStorage
}).single('avatar');

adminSchema.statics.imagePath = imagePath;

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

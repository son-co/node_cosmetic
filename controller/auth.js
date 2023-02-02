const cookieSession = require('cookie-session');
const mongoose = require("mongoose");
const { response } = require('express');
var mongo = require('../routes/mongo')

const adminModel = require("../models/admin.model")
const userModel = require("../models/customer.model")



mongoose.connect(mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;


exports.login = async(req, res) => {
    console.log(req.body);

    userModel.findOne({ email: req.body.email, matkhau: req.body.matkhau }, function(err, user) {
        if (user) {
            var data = [];
            data = user;
            var session;
            session = req.session;
            session.email = req.body.email;
            session.hoten = data.hoten;
            session.ma = data._id;
            console.log(data);

            res.status(200).redirect('/');
        } else {
            res.render('login');
        }
    });
}

exports.loginAdmin = async(req, res) => {
    console.log(req.body);


    adminModel.findOne({ user: req.body.user, password: req.body.password }, function(err, results) {
        if (results) {
            // res.render('admin');
            res.redirect('/admin');
        } else {
            res.render('login_admin');
        }
    });

}

exports.registerAdmin = (req, res) => {
    console.log(req.body);
    const admin = new adminModel(req.body);

    adminModel.findOne({ user: req.body.user }, function(err, results) {
        if (results) {
            res.status(404).send({ message: "Failed! Username is already in use!" });
        } else {
            admin.save();
            res.render('login_admin');
        }
    });

}

exports.register = (req, res) => {
    console.log(req.body);
    const reguser = new userModel(req.body);

    userModel.findOne({ email: req.body.email }, function(err, results) {
        if (results) {
            res.status(404).send({ message: "Failed! Email is already in use!" });
        } else {
            reguser.save();
            res.render('login');
        }
    });


}
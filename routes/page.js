const express = require('express');

const router = express.Router();
const ptttModel = require("../models/PTTT.model")
const reviewModel = require("../models/review.model");

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login_admin', (req, res) => {
    res.render('login_admin');
});
router.get('/register_admin', (req, res) => {
    res.render('register_admin');
});


router.get('/cart', (req, res) => {
    if (req.session.ma == null) {
        res.redirect("/");
    } else {
        res.render('cart', {
            dataCustomer: {
                id: req.session ? req.session.ma : false,
                name: req.session.hoten,
            }
        });
    }

});

router.get('/end', (req, res) => {
    res.render('end', {
        dataCustomer: {
            id: req.session ? req.session.ma : false,
            name: req.session.hoten,
        }
    });
});
router.get('/thanhtoan', (req, res) => {

    ptttModel.find({}, function(err, pttt) {
        if (pttt) {
            res.render('thanhtoan', {
                dataCustomer: {
                    id: req.session ? req.session.ma : false,
                    name: req.session.hoten,
                },
                pay: pttt,

            });
        } else {
            res.status(404).send(err);
        }
    })

})


router.get('/review', (req, res) => {

    reviewModel.find({}, function(err, pttt) {
        if (pttt) {
            res.render('review', {
                dataCustomer: {
                    id: req.session ? req.session.ma : false,
                    name: req.session.hoten,
                },
                review: pttt,

            });
        } else {
            res.status(404).send(err);
        }
    })

})



module.exports = router;
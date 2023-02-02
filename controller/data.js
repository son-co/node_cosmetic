const { json } = require("express");
const res = require("express/lib/response");
var session = require('express-session');
const mongoose = require("mongoose");
var mongo = require('../routes/mongo')
var nodemailer = require('nodemailer');

const userModel = require("../models/customer.model");
const productModel = require("../models/product.model");
const rateModel = require("../models/rate.model");
const brandModel = require("../models/brand.model");
const reviewModel = require("../models/review.model");
const arriveModel = require("../models/newarrive.model")


mongoose.connect(mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

async function sendMail(email, carts, name, sdt, diachi) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sontoong675@gmail.com',
            pass: 'son195014'
        }
    });
    var mailOptions = {
        from: 'sontoong675@gmail.com',
        to: email,
        subject: "Xác nhận đặt hàng",
        html: `<div>Thông tin khách hàng <br>
        Họ tên : ${name} <br>
        Số điện thoại: ${sdt} <br>
        Địa chỉ: ${diachi}
        </div>
        <div><p>Bạn đã đặt hàng thành công</p>
            <p>Danh sách sản phẩm bạn đã đặt mua:</p><br>
            ${carts}</div>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



module.exports = {
    showData: async(request, response) => {
        userModel.findOne({ email: request.session.email }, function(err, user) {
            productModel.find({}, function(err, product) {
                arriveModel.find({}, function(err, arr) {
                    rateModel.find({}, function(err, rate) {
                        brandModel.find({}, function(err, brand) {
                            console.log(brand);
                            if (brand || rate || product || user || arr) {
                                response.render('index', {
                                    dataCustomer: {
                                        id: request.session ? request.session.ma : false,
                                        name: request.session.hoten,
                                    },
                                    bestseller: product,
                                    newarrive: arr,
                                    rate: rate,
                                    brand: brand
                                })
                            } else {
                                res.send(err);
                            }
                        })
                    })
                })
            })
        });


    },
    showDetailProduct: async(req, res) => {
        userModel.findOne({ email: req.session.email }, function(err, user) {
            productModel.findOne({ _id: req.params._id }, function(err, pro) {
                productModel.find({}, function(err, pros) {
                    arriveModel.findOne({ _id: req.params._id }, function(err, arr) {
                        reviewModel.find({}, function(err, cmt) {
                            if (cmt || pro || user) {
                                res.render('detail_product', {
                                    dataCustomer: {
                                        id: req.session ? req.session.ma : false,
                                        name: req.session.hoten,
                                    },
                                    detail: pro || arr,
                                    random: pros,
                                    comment: cmt,

                                })
                            }
                        })
                    })
                })

            })
        });
    },
    logOut: function(req, res) {
        req.session.id = null;
        // res.json({ stt: true });
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if (err) {
                    return next(err);
                } else {

                    res.json({ stt: true });
                }
            });
        }
    },
    showBrandDetail: function(req, res) {
        userModel.findOne({ email: req.session.email }, function(err, user) {
            brandModel.findOne({ _id: req.params._id }, function(err, brand) {
                var ten = brand.tenTH;
                productModel.find({ tenTH: ten }, function(err, pro) {
                    if (pro || brand || user) {

                        res.render('brand_detail', {
                            dataCustomer: {
                                id: req.session ? req.session.ma : false,
                                name: req.session.hoten,
                            },
                            detail_brand: brand,
                            brand_product: pro,
                        })
                    }

                })
            })
        });
    },

    searchProduct: function(req, res) {

        var key_search = req.query.key;
        // userModel.findOne({}, function(err, users) {
        productModel.find({}, function(err, pro) {
                if (pro) {
                    var pros = [];
                    pros = pro;
                }
                var result = pros.filter((user) => {
                    return user.tenSP.toLowerCase().indexOf(key_search.toLowerCase()) !== -1;
                })

                res.render('search', {
                    dataCustomer: {
                        id: req.session ? req.session.ma : false,
                        name: req.session.hoten,
                    },
                    timkiem: result
                })
            })
            // productModel.find({}, function(err, pro) {
            //     if (pro) {
            //         var pros = [];
            //         pros = pro;
            //     }
            //     var result = pros.filter((user) => {
            //         return user.tenTH.toLowerCase().indexOf(key_search.toLowerCase()) !== -1;
            //     })

        //     if (users) {
        //         res.render('search', {
        //             dataCustomer: {
        //                 id: req.session ? req.session.ma : false,
        //                 name: req.session.hoten,
        //             },
        //             timkiem: result
        //         })
        //     }
        // })

        // });
    },

    addComment: function(req, res) {
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();


        res.json({ stt: true });


        db.collection('reviews').insertOne({
            hoten: req.session.hoten,
            idSP: req.body._id,
            ngayreview: date,
            noidung: req.body.commentData,
            anhreview: req.body.hinhanh
        })


    },
    addOrder: function(req, res) {
        const mailKH = req.body.email;
        const mailData = req.body.productConfirm;

        const name = req.body.name;
        const sdt = req.body.sdt;
        const diachi = req.body.address;

        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        sendMail(mailKH, mailData, name, sdt, diachi);
        res.json({ stt: true });


        const cartItems = JSON.parse(req.body.cartItems);


        db.collection('orders').insertOne({
            idKH: req.session.ma,
            tenKH: req.body.name,
            ngaylap: date,
            trangthai: "Đang giao hàng",
            tongtien: req.body.total
        })

        db.collection('orderdetails').insertOne({
            tongtien: req.body.total,
            month: today.getMonth() + 1,
            data: cartItems,
        })

    },

}
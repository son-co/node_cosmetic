const { json } = require("express");
const mongoose = require("mongoose");

const orderModel = require("../models/order.model");
const adminModel = require("../models/admin.model");
const userModel = require("../models/customer.model");
const productModel = require("../models/product.model");
const brandModel = require("../models/brand.model");
const orderdetailModel = require("../models/orderdetail.model");

//------------------------------
var mongo = require('mongodb').MongoClient;
const db = mongoose.connection;
var url = 'mongodb+srv://SonToong:abc@cluster0.9noex.mongodb.net/databaseWeb?retryWrites=true&w=majority';



module.exports = {
    //thêm sản phẩm vào mongodatabase
    showDataAdmin: async(request, response) => {

        var doanhthu = [];
        var TKSP = [];
        var n = [];
        var m = [];
        orderdetailModel.find({}, function(err, data1) {
            //Lấy thông tin số tiền theo tháng
            var arr = data1.filter(a => {
                var arr1 = new Array(a);
                return arr1;

            })
            for (var i = 0; i < arr.length; i++) {
                m[i] = arr[i].month;
            }
            m = m.reduce(function(accumulator, element) {
                if (accumulator.indexOf(element) === -1) {
                    accumulator.push(element)
                }
                return accumulator
            }, []);
            for (var i = 0; i < m.length; i++) {
                n[i] = 0;
                for (var j = 0; j < arr.length; j++) {
                    if (m[i] == arr[j].month) {
                        n[i] += parseInt(arr[j].tongtien);
                    }
                }
                doanhthu.push({
                    thang: m[i],
                    tongtien: n[i]
                })
            }
            // ----------------------------------------------------------   

            var mang = [];
            for (var i = 0; i < arr.length; i++) {
                mang[i] = arr[i].data;
            }
            console.log(mang)




            TKSP.push({
                tenSP: "SON",
                sl: 10
            }, {
                tenSP: "Kem",
                sl: 15
            }, {
                tenSP: "Sữa",
                sl: 8
            }, {
                tenSP: "Bút",
                sl: 80
            })

            response.render('admin', {
                doanhthu: doanhthu,
                TKSP: TKSP
            });

        })
    },
    addProductSubmit: async(request, response) => {
        const products = new productModel(request.body);

        try {
            await products.save();
            response.redirect('sanpham');
        } catch (error) {
            response.status(500).send(error);
        }

    },
    //đưa  dữ liệu vào trang sản phẩm của admin
    showProductAdmin: async(request, response) => {

        try {
            productModel.find({}, function(err, products) {
                response.render('sanpham', {
                    product: products
                })
            });

        } catch (error) {
            response.status(500).send(error);
        }
    },
    //Sửa sản phẩm
    editProduct: function(req, res) {
        productModel.findOne({ _id: req.params._id }, function(err, pro) {
            if (pro) {
                res.render('edit_form_product', { sanpham: pro });
            }
        });

    },
    editProductSubmit: function(req, res) {
        var item = {
            // idTH: req.body.idTH,
            tenTH: req.body.tenTH,
            idSP: req.body.idSP,
            tenSP: req.body.tenSP,
            hinhanh: req.body.hinhanh,
            chitiet: req.body.chitiet,
            rate: req.body.rate,
            gia: req.body.gia,
            status: req.body.status

        }
        const product = new productModel(req.body);
        productModel.findOne({ _id: req.params._id }, function(err, kq) {
            if (kq) {
                productModel.updateMany({ _id: req.params._id }, { $set: item },
                    function(err, result) {
                        if (result) {
                            console.log('Updated');
                            db.close;
                            res.status(200).redirect("/sanpham");
                        }
                    })

            }
        })


    },
    //Xóa sản phẩm
    deleteProduct: function(request, response) {
        var id = request.params._id;
        mongo.connect(url, function(err, db) {
            productModel.deleteOne({ _id: id }, function(err, result) {
                if (result) {
                    console.log('Item Delete');
                    db.close;
                    response.status(200).redirect("/sanpham");
                }

            });

        });
    },

    //thêm tài khoản của admin
    addAcountAdmin: async(request, response) => {
        const accountAdmin = new adminModel(request.body);
        try {
            await accountAdmin.save();
        } catch (error) {
            response.status(500).send(error);
        }

    },
    //hiển thị thoong tin tài khaonr của admin
    showAccountAdmin: async(request, response) => {
        const accountAdmin = await adminModel.find({});

        try {
            response.send(accountAdmin);
        } catch (error) {
            response.status(500).send(error);
        }
    },

    //thêm  tài khoản của khách hàng
    addAcountCustomer: async(request, response) => {
        const accountCustomer = new userModel(request.body);
        try {
            await accountCustomer.save();

        } catch (error) {
            response.status(500).send(error);
        }

    },
    //hiển thị thông tin tài khoản khách hàng
    showAccountCustomer: async(request, response) => {

        try {
            userModel.find({}, function(err, user) {
                response.render('admin_customer', {
                    customer: user
                })
            });
        } catch (error) {
            response.status(500).send(error);
        }
    },
    // Thêm thông tin thương hiệu
    addBrand: async(request, response) => {
        const brand = new brandModel(request.body);
        try {
            await brand.save();
            response.redirect('admin_brand');

        } catch (error) {
            response.status(500).send(error);
        }

    },
    //hiển thị thông tin thương hiệu
    showBrand: async(request, response) => {

        try {
            brandModel.find({}, function(err, brand) {
                response.render('admin_brand', {
                    brand: brand
                })
            });
        } catch (error) {
            response.status(500).send(error);
        }
    },
    //Xóa thương hiệu
    deleteBrand: function(request, response) {
        var id = request.params._id;
        mongo.connect(url, function(err, db) {
            brandModel.deleteOne({ _id: id }, function(err, result) {
                if (result) {
                    console.log('Item Delete');
                    db.close;
                    response.status(200).redirect("/admin_brand");
                }

            });

        });
    },
    //Sửa thương hiện
    editBrand: function(req, res) {
        brandModel.findOne({ _id: req.params._id }, function(err, brand) {
            if (brand) {
                res.render('edit_form_brand', { thuonghieu: brand });
            }
        });

    },
    editBrandSubmit: function(req, res) {
        var item = {
            tenTH: req.body.tenTH,
            logo: req.body.logo,
            mota: req.body.mota

        }
        const brands = new brandModel(req.body);
        brandModel.findOne({ _id: req.params._id }, function(err, kq) {
            if (kq) {
                brandModel.updateMany({ _id: req.params._id }, { $set: item },
                    function(err, result) {
                        if (result) {
                            console.log('Updated');
                            db.close;
                            res.status(200).redirect("/admin_brand");
                        }
                    })

            }
        })


    },

    //Xóa khách hàng
    deleteCustomer: function(request, response) {
        mongo.connect(url, function(err, db) {
            userModel.deleteOne({ _id: request.params._id }, function(err, result) {
                if (result) {
                    console.log('Item Delete');
                    db.close
                    response.status(200).redirect("/admin_customer");
                }

            });

        });
    },
    //Xóa đơn hàng
    deleteOrder: function(request, response) {
        mongo.connect(url, function(err, db) {
            orderModel.deleteOne({ _id: request.params._id }, function(err, result) {
                if (result) {
                    console.log('Item Delete');
                    db.close;
                    response.status(200).redirect("/admin_order");
                }

            });

        });
    },
    showOrderAdmin: async(request, response) => {

        try {
            orderModel.find({}, function(err, order) {
                response.render('admin_order', {
                    order: order
                })
            });
        } catch (error) {
            response.status(500).send(error);
        }
    },

}
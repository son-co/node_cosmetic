const mongoose = require("mongoose");

module.exports = {
    adminModel: mongoose.model("Admin", new mongoose.Schema({
            user: {
                type: String,
                require: true
            },
            password: {
                type: String,
                required: true
            }
        })

    ),
    userModel: mongoose.model("Customer", new mongoose.Schema({
            id: {
                type: String,
                require: true
            },
            hoten: {
                type: String,
                required: true
            },
            ngaysinh: {
                type: String,
                require: true
            },
            email: {
                type: String,
                required: true
            },
            diachi: {
                type: String,
                require: true
            },
            matkhau: {
                type: String,
                required: true
            }

        })

    ),
    productModel: mongoose.model("product", new mongoose.Schema({
            idTH: {
                type: String,
                required: true,
            },
            idSP: {
                type: String,
                required: true,
            },
            tenSP: {
                type: String,
                default: 0,
            },
            hinhanh: {
                type: String,
                required: true
            },
            chitiet: {
                type: String,
                required: true
            },
            rate: {
                type: String,
                required: true
            },
            gia: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                required: true,
            }
        })

    ),
    bestseller: mongoose.model("bestseller", new mongoose.Schema({
            idTH: {
                type: String,
                required: true,
            },
            idSP: {
                type: String,
                required: true,
            },
            tenSP: {
                type: String,
                default: 0,
            },
            hinhanh: {
                type: String,
                required: true
            },
            chitiet: {
                type: String,
                required: true
            },
            rate: {
                type: String,
                required: true
            },
            gia: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                required: true,
            }
        })

    ),
    rate: mongoose.model("rate", new mongoose.Schema({
        idSP: {
            type: String,
            required: true,
        },
        hinhanh: {
            type: String,
            required: true,
        },
        tenSP: {
            type: String,
            required: true,
        }
    })),
    newarrive: mongoose.model("newarrive", new mongoose.Schema({
            idTH: {
                type: String,
                required: true,
            },
            idSP: {
                type: String,
                required: true,
            },
            tenSP: {
                type: String,
                default: 0,
            },
            hinhanh: {
                type: String,
                required: true
            },
            chitiet: {
                type: String,
                required: true
            },
            rate: {
                type: String,
                required: true
            },
            gia: {
                type: Number,
                required: true
            },
            status: {
                type: String,
                required: true,
            }
        })

    ),
    brands: mongoose.model("brand", new mongoose.Schema({
        idTH: {
            type: String,
            required: true,
        },
        tenTH: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true
        }
    }))
}

// {
//     "idSP":"5",
//     "tenSP": "son",
//     "hinhanh":"logo.png",
//     "chitiet": "abc",
//     "rate":"abc",
//     "gia": 10000,
//     "status": "conhang"
// }
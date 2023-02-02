const express = require("express");
const app = express();


//-----------------
const {
    showDataAdmin,
    showProductAdmin,
    addProductSubmit,
    addAcountAdmin,
    showAccountCustomer,
    addBrand,
    showBrand,
    deleteBrand,
    editBrand,
    editBrandSubmit,
    deleteCustomer,
    deleteOrder,
    editProduct,
    editProductSubmit,
    deleteProduct,
    showOrderAdmin
} = require('../controller/data_admin.js');

//-----------Show database
app.get("/admin", showDataAdmin);
app.get("/admin_customer", showAccountCustomer);
app.get("/sanpham", showProductAdmin);
app.get("/admin_brand", showBrand);
app.get("/admin_order", showOrderAdmin);


//---Customer action
app.get("/admin_customer/delete/:_id", deleteCustomer);

//---product action
app.post("/sanpham", addProductSubmit);
app.get("/edit_form_product/:_id", editProduct);
app.post("/edit_form_product/:_id", editProductSubmit);
app.get("/sanpham/delete/:_id", deleteProduct);
app.get("/admin_brand/delete/:_id", deleteBrand);
app.get("/admin_order/delete/:_id", deleteOrder);



//---Account action
app.post("/add_account_admin", addAcountAdmin);

//---Brand action
app.post("/admin_brand", addBrand);
app.get("/edit_form_brand/:_id", editBrand);
app.post("/edit_form_brand/:_id", editBrandSubmit);
//-----------------index
const {
    showData,
    showDetailProduct,
    logOut,
    showBrandDetail,
    searchProduct,
    addOrder,
    addComment,
} = require('../controller/data.js');
//----------------LogIn
app.get("/", showData);
app.post("/logOut", logOut);
app.get("/product/:_id", showDetailProduct);
app.get("/brand/:_id", showBrandDetail);
app.get("/search/", searchProduct);

//----------------review
app.post("/detail_product", addComment);
//-Order Action
app.post("/end", addOrder);


module.exports = app;
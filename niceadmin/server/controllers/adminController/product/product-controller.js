const Product = require("../../../model/product-model")
const Category = require("../../../model/category-model")
const fs = require("fs")
const path = require("path")

const getAllproduct = async(req,res) => {
    try {
        const categoryData =  await Category.find({product_id:null})
        // console.log(categoryData);
         
         



        // const changleboolean = await Category.findOne({_id:req.params.id})
        // await Category.findByIdAndUpdate({_id:changleboolean.product_id},{toView:false,todelete:true})


        res.render("Layout", { body: "Product/AddProduct",data:categoryData });
    } catch (error) {
        console.log(error);
    }
    
   
}


const addproductCategory = async(req,res) => {
    try {
        // console.log(req.body,"dfbadsf");
        // console.log(req.file);
        // const {category_name,product_name,product_price,product_description,child_category_name} = req.body
        // console.log(category_name,product_name,product_price,product_description,child_category_name);


        const image = req.file.filename;

        const productCategory = new Product({
            categories:req.body.categories,
            product_name:req.body.product_name,
            // child_category_name,
            product_price:req.body.product_price,
            image,
            product_description:req.body.product_description
        })
        await productCategory.save()
        res.redirect("/admin/user/product/add-product")
    } catch (error) {
        console.log("Error while adding Product category Name",error);
    }
}

const selectSubCategoryData = async(req,res) => {
    try {
        const { parentID } = req.query;
        const childrens = await Category.find({ product_id: parentID });

        res.json(childrens);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
}

const viewProductsAdded = async (req,res) => {
    try {
        const viewproduct = await Product.find()
        res.render("Layout", { body: "Product/ViewProduct",data:viewproduct });
    } catch (error) {
        console.log("error while displaying added products",error);
    }
}

const deleteproduct = async(req,res) => {
    try {
        const _id = req.params.id;

        const deleteImage = await Product.findOne({_id:_id})

        // console.log("Image name to be deleted",deleteImage.image);

        if (deleteImage.image) {
            fs.unlink(path.join(__dirname, '../../../uploads', deleteImage.image), (err) => {
                if (err) {
                    console.error("Error while deleting the image", err);
                    return;
                }
                console.log("Image deleted successfully");
            });
        } else {
            console.log("No Such Image Exists");
        }
       
        // await Product.findByIdAndDelete(_id)
    //    console.log("Image to be deleted",deleteImage);
       
        res.redirect("/admin/user/product/view-product")  
        console.log("Product deleted successfull");
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async(req,res) => {
    try {
        const _id = req.params.id
        const getPro = await Product.findOne({_id:_id})

        // console.log("Product to be updated",getPro);
         
        // const getCAt = await Category.find({_id:getPro.category_name})
        // console.log("Product in category data",getCAt);
  
        // console.log([getPro,getCAt]);
        
        res.render("Layout", { body: "Product/EditProduct",data:getPro});
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async(req,res) => {
    try {
        const _id = req.params.id
        // console.log(req.body.product_name,req.body.product_price);
        // console.log(_id);
        if(req.file)
            {

                const deleteImage = await Product.findOne({_id:_id})

                console.log("Image name to be Updated",deleteImage);
        
                if (deleteImage.image) {
                    fs.unlink(path.join(__dirname, '../../../uploads', deleteImage.image), (err) => {
                        if (err) {
                            console.error("Error while deleting the image", err);
                            return;
                        }
                        console.log("Image Updated successfully");
                    });
                } else {
                    console.log("No Such Image Exists");
                }


                 await  Product.findByIdAndUpdate({_id},{product_name:req.body.product_name,product_price:req.body.product_price,product_description:req.body.product_description,image:req.file.filename});
                return res.redirect("/admin/user/product/view-product");
            }
          
          
         
        
         
        
        
          await Product.findByIdAndUpdate({_id},{product_name:req.body.product_name,product_price:req.body.product_price,product_description:req.body.product_description});
        
          console.log("Product Updated Successfully");
          return res.redirect("/admin/user/product/view-product");
       
       
    } catch (error) {
        console.log("Error while updating Product",error);
    }
}

module.exports = {getAllproduct,addproductCategory,selectSubCategoryData,viewProductsAdded,deleteproduct,getProduct,updateProduct}
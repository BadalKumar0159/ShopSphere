import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Function for add product
const addProduct = async (req, res) => {
    try {
        //Multer separates text fields and file fields from multipart/form-data and 
        //places them into req.body and req.file / req.files.

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const img1 = req.files.image1 && req.files.image1[0];
        const img2 = req.files.image2 && req.files.image2[0];
        const img3 = req.files.image3 && req.files.image3[0];
        const img4 = req.files.image4 && req.files.image4[0];

        const images = [img1, img2, img3, img4].filter((item) => item !== undefined);

        //upload images to cloudinary and get back their urls
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url;
            }
            ))

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Function for removing product 
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Fucntion for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addProduct, removeProduct, singleProduct, listProducts };
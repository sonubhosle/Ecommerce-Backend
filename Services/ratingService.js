const Rating = require('../Models/ratingModel');
const productService = require('../Services/productService');



const createRating = async (req,user) =>{

    const product = await productService.findProductById(req.productId);

    const rating = new Rating({
        product:product._id,
        user:user._id,
        rating:req.rating,
        createdAt:new Date(),
    })

    return await rating.save();

}


const getAllRatings = async (productId) =>{

    return await Rating.find({product:productId});
    
}



module.exports = {createRating,getAllRatings}
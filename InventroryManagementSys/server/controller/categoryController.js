import Category from "../model/categorySchema.js";

///////////////Add Category///////////////////////////

export const addCategory=async(req,res)=>{
    
    try {
        const { categoryname } = req.body;
        const newCategory= new Category({categoryname,products:[]});
        await newCategory.save();
        res.status(200).json({mg:'New Category saved successfully :',category})

    } catch (error) {
        res.status(500).json({mg:'Error while adding the Category :',error})
    }
} 
///////////////Update Category///////////////////////////
export const updateCategory = async (req, res, next) => {
    const { categoryname } = req.body;
    const categoryId = req.params.id;
    let category;
    try {
        category = await Category.findByIdAndUpdate(categoryId, {categoryname});
    } catch (err) {
      return console.log(err);
    }
    if (!category) {
      return res.status(500).json({ message: "Unable To Update The Category" });
    }
    return res.status(200).json({ category });
  };
///////////////Delete Category///////////////////////////
  
export const deleteCategory = async (req, res, next) => {
    const id = req.params.id;
  
    let category;
    try {
        category = await Post.findById(id);
        
        await category.delete()

       return res.status(200).json('category deleted successfully');
    } catch (error) {
        return res.status(500).json(error)
    }

    // if (!category) {
    //   res.status(400).json({ message: "Unable To Delete category" });
    // }
    // res.status(200).json({ message: "Successfully Deleted" });
  };
///////////////Get Category by name///////////////////////////
export const getCategoryIdByName = async (req, res, next) => {
    const {categoryname}=req.body;
    
    let category;
    try {
        category = await Category.findOne({categoryname});
    } catch (err) {
      return console.log(err);
    }
    if (!category) {
      return res.status(404).json({ message: "No category found by given name" });
    }
    return res.status(200).json(category._id);
  };
///////////////Get all Categories///////////////////////////
export const getAllCategories = async (req, res, next) => {
    let categories;
    try {
        categories = await Category.find().populate("products");
    } catch (err) {
      return console.log(err);
    }
    if (!categories) {
      return res.status(404).json({ message: "No categories Found" });
    }
    return res.status(200).json({ categories });
  };
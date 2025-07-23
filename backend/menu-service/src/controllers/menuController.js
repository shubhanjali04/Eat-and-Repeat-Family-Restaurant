//This File handles CRUD operations for menu items.


import MenuItem from '../model/menuModel.js'

// Get all menu items
export const getAllItems = async (req,res) => {
    try {
     const items = await MenuItem.find()
     res.status(200).json({message: 'Menu items fetched successfully',items})   
    } catch (error) {
        res.status(500).json({message:'Server error',error})
    }
}

// Get single menu item by ID
export const getItemById = async (req,res) => {
    try {
        const item = await MenuItem.findById(req.params.id)
        if(!item){
           return res.status(404).json({message: 'item not found'})
        }
        res.status(200).json(item)    
    } catch (error) {
        res.status(500).json({message:'Server error',error})
    }
}

// Add new item
export const addItem = async (req,res) => {
    try {

        console.log("---- Add Item API Hit ----")
        console.log("req.body:", req.body)
        console.log("req.file:", req.file)

        const {name , price , category, description} = req.body

        const newItem = new MenuItem ({
         name,
         price,
         category,
         description,
         image:req.file ? `/uploads/${req.file.filename}` : null
    })
        const savedItem = await newItem.save()

        res.status(201).json({message: 'item added successfully',item:savedItem})    
    } catch (error) {
        res.status(400).json({message:'Invalid Data',error})
    }
}

// Update menu item
export const updateItem = async (req,res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true,
            
            }
        )
        if (!updatedItem) return res.status(404).json({message: 'Item not found'})
            res.status(200).json({message:'Updated Successfully',item:updatedItem})
    } catch (error) {
        console.error("Update error:",error)
        res.status(500).json({message: 'Error updating new item', error:error.message || error})
    }
}

// Delete menu item
export const deleteItem = async (req,res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id)
        if (!deletedItem) return res.status(404).json({message: 'Item not found'})
            res.status(200).json({message: 'Item deleted successfully', item : deletedItem})
    } catch (error) {
        res.status(500).json({message: 'Error deleting item', error})
    }
}
import express, { Router } from 'express'
import { getAllItems , addItem , updateItem , deleteItem, getItemById } from '../controllers/menuController.js'
import upload from '../middleware/upload.js'



const router = express.Router()

//router.post('/upload',upload.single('image'),(res,req) => {
   // res.status(200).json({message:'Image uploaded successfully',file:req.file})
//})

router.get('/',getAllItems)

router.get('/:id',getItemById)

router.post('/',addItem)

router.put('/:id',updateItem)

router.delete('/:id',deleteItem)

router.post('/with-image', upload.single('image'),addItem)

export default router
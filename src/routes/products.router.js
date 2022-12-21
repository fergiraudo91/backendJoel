import { Router } from "express";
import FileManager from "../manager/fileManager.js";

const fileManager = new FileManager('products.json')
const router = Router();
// const products = [];

router.get('/', async (req, res) => {
    const products = await fileManager.get()
    let limit = req.query.limit
    if (!limit) res.send({products})
    else {
        const prodLimit = [];
        if(limit > products.length) limit = products.length;
        for(let index = 0; index < limit; i++) {
            prodLimit.push(products[index]);
        }
    res.send({prodLimit})
    }
})

router.post('/', async (req, res) => {
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const addProduct = await fileManager.add(title, description, price, thumbnails, code, stock, category, status)
    res.send(addProduct)
})

router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const {title, description, price, thumbnails, code, stock, category, status} = req.body
    const updateProduct = await fileManager.updateById(title, description, price, thumbnails, code, stock, category, status)
    res.send(updateProduct)
})

router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteProduct = await fileManager.deleteById(id)
    res.send(deleteProduct)
})

export default router;
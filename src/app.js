import express from 'express';
import productRouter from './routes/products.router.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public'))
app.use('/api/products', productRouter)

app.listen(8080, () => {
    console.log('Servidor funcionando en puerto 8080...');
})
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import productRouter from './routes/products.router.js';



const app = express();

const httpServer = app.listen(8080, () => {
    console.log('Server listening on port 8080...');
});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.static(__dirname + '/public/'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    req.io = socketServer;
    next();
});
app.use('/api/products', productRouter);

socketServer.on('connection', socket =>{
    console.log(socket.id);
    socket.on('msg_front', message => console.log(message));
    socket.emit('msg_back', 'Conectando al servicio, Bienvenido al backend.');
})



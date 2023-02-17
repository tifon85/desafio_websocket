
import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import { ProductManager } from './productManager.js'

const app = express ()
const PORT = 8080

const productManager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/public' ,express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Escuchando puerto: ', PORT);
})

httpServer.on

const socketServer = new Server(httpServer)

let productos

socketServer.on('connection', async socket => {
  console.log('Nuevo cliente conectado')
  try {
      productos = await productManager.getProducts()
      socket.emit('mensajeServer', productos)
  } catch (error) {
      console.log(error)
  }

  socket.on('product', async data => {
    
    const   {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail
    } = data
    data.status = true
    console.log('data: ', data)

      if (!title || !description || !code || !price || !stock || !category) {
          console.log('Debe completar todos los campos');
      }else{
          try {
              await productManager.addProduct(data)
              let datos = await productManager.getProducts()
              socketServer.emit('productoAgregado', datos)
          } catch (error) {
              console.log(error)
          }
      }
  })

  socket.on('deleteProduct', async data => {
      try {
          await productManager.deleteProduct(data)
          let datos = await productManager.getProducts()
          socketServer.emit('productoEliminado', datos)
      } catch (error) {
          console.log(error)
      }
  })
})

/*app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Listo, app escuchando puerto: ', PORT);
})*/
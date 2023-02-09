
import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'

const app = express ()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Listo, app escuchando puerto: ', PORT);
})
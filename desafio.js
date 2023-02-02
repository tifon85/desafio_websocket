
const fs = require('fs')

class ProductManager{
    constructor(ruta){
        this.path=ruta
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        let productos = await this.getProducts()
        let yaEsta = productos.find(item => item.code == code)
        try{
            if(!yaEsta){
                const producto = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                if(productos.length == 0){ 
                    producto.id=1
                }else{
                    producto.id=productos[productos.length-1].id + 1
                }
                await fs.promises.writeFile(this.path, JSON.stringify(productos, '\t'), 'utf-8')
                return 'El producto ya fue agregado'
            }else{
                return 'El producto ya existe'
            }
        }catch (error) {
            console.log(error)
        }
    }

    getProducts = async () => {
        try{
            if(!fs.existsSync(this.path)){
                await fs.promises.writeFile(this.path, '[]', 'utf-8')
            }
            let dataProductos = await fs.promises.readFile(this.path, 'utf-8')
            let productos = JSON.parse(dataProductos)
            return productos
        }catch (error) {
            console.log(error)
        }
    }

    getProductById = async (id) => {
        let productos = await this.getProducts()
        let yaEsta = productos.find(item => item.id == id)
        try{
            if(yaEsta){
                return yaEsta
            }else{
                return 'No se encontró el producto'
            }
        }catch (error){
            console.log(error)
        }
        
    }

    updateProduct = async (id, productoActualizado) => {
        let productos = await this.getProducts()
        let index = await productos.findIndex(product => product.id === id)
        try{
            if(index === -1){
                return 'No se encontró el producto a actualizar'
            }
            productos[index] = { ...productoActualizado, id: productos[index].id }
            fs.promises.writeFile(this.path, JSON.stringify(productos, null,'\t'))
            console.log('Producto actualizado en la base de datos');
        }catch (error){
            console.log(error)
        }
    }

    deleteProduct = async (id) => {
        let productos = await this.getProducts()
        let index = await productos.findIndex(product => product.id === id)
        try{
            if(index === -1){
                return 'No se encontró el producto a actualizar'
            }
            productos.splice(index, 1)
            fs.promises.writeFile(this.path, JSON.stringify(productos, null,'\t'))
            console.log('Producto eliminado de la base de datos');
        }catch (error){
            console.log(error)
        }
    }

}

const products = new ProductManager('./Productos.json')
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwa', 12))
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwi', 12))
//console.log(products.getProducts())
//console.log(products.getProductById(1))
//console.log(products.updateProduct(2, {title: 'asd2', description: 'dsa2', price: '14.43', thumbnail: 'ert2', code: 'qwa2', stock: 24} ))
//console.log(products.deleteProduct(2))

const app = express()
const PORT = 8080

app.get('/products', async (req, res)=>{
    const {limit} = req.query
    try{
        const data = await products.getProducts()
        limit ? res.send(date.filter(product => product.id <= limit)) : res.send(data)
    }catch (error){
        console.log(error)
    }
})

app.get('/products/:pid', async (req, res)=>{
    const {pid} = req.params
    let productos = await products.getProducts()
    let producto = productos.find(product => product.id === pid)
    if(!producto) return 'No existe el producto'
    res.send(producto)
})
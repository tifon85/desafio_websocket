
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
                if(productos == 0){ 
                    producto.id=1
                }else{
                    producto.id=productos[productos.length-1].id + 1
                }
                await fs.promises.writeFile(this.path, JSON.stringify(productos), 'utf-8')
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
            let dataProductos = await fs.promises.readFile(this.path, 'utf-8')
            let productos = JSON.parse(dataProductos)
            return productos
        }catch (error) {
            console.log(error)
        }
    }

    getProductById = async (id) => {
        let productos = await this.getProducts()
        let yaEsta = productos.filter(item => item.id == id)
        if(yaEsta){
            return yaEsta
        }else{
            return 'No se encontró el producto'
        }
    }

}

const products = new ProductManager('./Productos.json')
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwe', 12))
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwa', 12))
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwi', 12))
//console.log(products.getProducts())
//console.log(products.getProductById(3))
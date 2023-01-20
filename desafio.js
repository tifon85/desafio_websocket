
class ProductManager{
    constructor(){
        this.productos=[]
    }

    addProduct = (title,description,price,thumbnail,code,stock) => {
        let yaEsta = this.productos.find(item=> item.code == code)
        if(!yaEsta){
            const producto = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            if(this.productos == 0){ 
                producto.id=1
            }else{
                producto.id=this.productos[this.productos.length-1].id + 1
            }
            this.productos = [...this.productos, producto]
            //console.log(this.productos)
            return 'El producto ya fue agregado'
        }else{
            return 'El producto ya existe'
        }
    }

    getProducts = () => {
        return this.productos
    }

    getProductById = (id) => {
        let yaEsta = this.productos.filter(item => item.id == id)
        if(yaEsta){
            return yaEsta
        }else{
            return 'No se encontró el producto'
        }
    }

}


const products = new ProductManager()
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwe', 12))
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwa', 12))
//console.log(products.addProduct('asd', 'dsa', '14.23', 'ert', 'qwi', 12))
//console.log(products.getProducts())
//console.log(products.getProductById(3))

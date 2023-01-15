
class ProductManager {
    constructor(){
        this.productos=[]
    }

    addProduct = (title,description,price,thumbnail,code,stock) => {
        let yaEsta = productos.find(item=> item.code == code)
        if(!yaEsta){
            const producto = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.productos = [...this.productos, producto]
            if(this.productos === 0){
                producto.id=1
            }else{
                producto.id=this.productos[this.productos.length-1].id + 1
            }
        }
    }

    getProducts = () => this.productos

    getProductById = (id) => this.productos.filter(item => item.id == id)

}

const ProductManager = new ProductManager()
//console.log(ProductManager.getProducts())
//console.log(ProductManager.getProductById(id))
//ProductManager.addProduct('asd', 'dsa', '14.23', 'ert', 'qwe', 12)
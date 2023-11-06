const express = require('express')
const fs = require('fs')

const app = express()

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/products', (req, res) => {
    const products = readProductsJson('./products.json')
    //res.send("Productos")
    res.render('products',{
        productsList: products.products
    })
})

app.listen(4000, ()=>{
    console.log('Server is running')
})

function readProductsJson(path){
    let products = JSON.parse(fs.readFileSync(path))
    console.log(products)
    return products
}
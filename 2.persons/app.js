const express = require('express')
const fs = require('fs')
const moment = require('moment'); // require


const app = express()

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/persons', (req, res) => {
    writeAccessFile('./access.json')
    let persons = readPersonsJson('./persons.json')
    persons = persons.persons.filter( (person) => {
        const personAgeInDays = person.age * 365
        return personAgeInDays > 5475
    } )
    //res.send("Productos")
    res.render('persons',{
        personsList: persons
    })
})

app.listen(3001, ()=>{
    console.log('Server is running')
})

function readPersonsJson(path){
    let persons = JSON.parse(fs.readFileSync(path))
    console.log(persons)
    return persons
}

function writeAccessFile( path ){
    //Leer contenido de archivo y guardarlo en variable
    let access = JSON.parse(fs.readFileSync(path))
    access.access_list.push( moment().format('YYYY/MM/DD HH:mm') )
    //Escribir el nuevo contenido al archivo
    fs.writeFileSync( path, JSON.stringify(access) )
}
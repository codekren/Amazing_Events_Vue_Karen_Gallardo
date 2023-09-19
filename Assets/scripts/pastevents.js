import { printCard, printCategory, filtrosCruzados } from '../modules/funciones.js'
const $contCards= document.getElementById('contCards') //html
const $contCategoria=document.getElementById('form')
const $check= document.getElementById('form')
const $search= document.getElementById('input-cont')
const $contSearch=document.getElementById('contSearch')
const URL_API= 'https://mindhub-xj03.onrender.com/api/amazing'


let checkCategoria
let past
let urlDetails="./details.html"
fetch(URL_API)
.then(response=> response.json())
.then (data => {past=data.events.filter(evento=>evento.date<data.currentDate)
checkCategoria= [...new Set (past.map(evento=>evento.category))]      
printCard(past,$contCards,urlDetails)
printCategory(checkCategoria,$contCategoria,urlDetails) 
})

.catch(err => console.log(err))

$check.addEventListener('change',()=>{
    const returnCruzados=filtrosCruzados(past,$search)
    printCard(returnCruzados, $contCards,urlDetails)})

$contSearch.addEventListener('click',()=>{
    const returnCruzados=filtrosCruzados(past,$search)
    printCard(returnCruzados,$contCards,urlDetails)})




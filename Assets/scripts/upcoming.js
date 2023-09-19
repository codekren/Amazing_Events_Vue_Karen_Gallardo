import { printCard, printCategory, filtrosCruzados } from '../modules/funciones.js'
const $contCards= document.getElementById('contUp') 
const $contCategoria=document.getElementById('form')
const $check= document.getElementById('form')
const $search= document.getElementById('input-cont')
const $contSearch=document.getElementById('contSearch')
const URL_API= 'https://mindhub-xj03.onrender.com/api/amazing'


let checkCategoria
let up
let urlDetails="./details.html"
fetch(URL_API)
.then(response=> response.json())
.then (data => {up=data.events.filter(evento=>evento.date>data.currentDate)
checkCategoria= [...new Set (up.map(evento=>evento.category))]      
printCard(up,$contCards,urlDetails)
printCategory(checkCategoria,$contCategoria) 
})

.catch(err => console.log(err))
$check.addEventListener('change',()=>{
    const returnCruzados=filtrosCruzados(up,$search)
    printCard(returnCruzados, $contCards,urlDetails)
   })
$contSearch.addEventListener('click',()=>{
const returnCruzados=filtrosCruzados(up,$search)
printCard(returnCruzados,$contCards,urlDetails)})









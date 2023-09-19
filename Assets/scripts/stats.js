
import {imprimirTablas} from '../modules/funciones.js'
const URL_API= 'https://mindhub-xj03.onrender.com/api/amazing'

let eventos
let datos
let eventoPast
let eventoUp
fetch (URL_API)
.then(response =>response.json())
.then(data=>{
    eventos=data.events
    datos=data
    eventoPast= eventos.filter(evento=>evento.date<datos.currentDate)    
    eventoUp=eventos.filter(evento=>evento.date>datos.currentDate)
    masAsistencia(eventoPast)
    menorAsistencia (eventoPast)
    masCapacidad(eventos)
    imprimirPrimeraTabla()
    imprimirTablas(eventoUp,"UpComing","tabla2")
    imprimirTablas(eventoPast,"PastEvents","tabla3")
   
})
.catch(err => console.log (err))

function masAsistencia (eventoPast){
let mayorAsistencia=0
let eventoMayorAsistencia 
    for(let evento of eventoPast){    
    let asistencia =(evento.assistance*100/evento.capacity)
    if(asistencia> mayorAsistencia){
        mayorAsistencia = asistencia
        eventoMayorAsistencia=evento
    }    
}
return eventoMayorAsistencia
}
function menorAsistencia (eventoPast){
    let menorAsistencia=0
    let eventoMenorAsistencia  
    for(let evento of eventoPast){    
    let asistencia = (evento.assistance*100/evento.capacity)
    if(menorAsistencia==0 || asistencia < menorAsistencia){
        menorAsistencia = asistencia
        eventoMenorAsistencia=evento
    }    
}
return eventoMenorAsistencia

}
function masCapacidad(eventos){
    let masCapacidad=0
    let eventoCapacidad  
    for(let evento of eventos){    
    if(evento.capacity > masCapacidad){
        masCapacidad = evento.capacity
        eventoCapacidad=evento
    }    
}
return eventoCapacidad
}
function imprimirPrimeraTabla(){
    let conMayorAsistencia = masAsistencia(eventoPast)
    let conMenorAsistencia = menorAsistencia(eventoPast)
    let conMasCapacidad = masCapacidad(eventos)

    let template= `
    <td class="p-1 text-center">${conMayorAsistencia.name} with ${((conMayorAsistencia.assistance*100)/conMayorAsistencia.capacity).toFixed(1)}%</td>
    <td class="p-1 text-center">${conMenorAsistencia.name} with ${((conMenorAsistencia.assistance*100)/(conMenorAsistencia.capacity)).toFixed(1)}%</td>
    <td class="p-1 text-center">${conMasCapacidad.name} with ${((conMasCapacidad.capacity).toLocaleString())}</td>`
    
    document.getElementById("tabla1").innerHTML = template  
}














































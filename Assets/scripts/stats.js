const { createApp } = Vue

  createApp({
    data() {
      return {
        datos:[],
        eventos:[],          
        eventosPast:[], 
        eventosUp:[], 
 
        
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response=> response.json())
        .then((data)=> { 
        this.eventos= data.events
        const fecha= data.currentDate
        this.eventosPast=this.eventos.filter(evento=>evento.date<fecha)
        this.eventosUp=this.eventos.filter(evento=>evento.date>fecha)   
    }) 

    .catch(err => console.log(err))

},
methods:{
    masAsistencia (){
        let mayorAsistencia=0
        let eventoMayorAsistencia 
            for(let evento of this.eventosPast){    
            let asistencia =(evento.assistance*100/evento.capacity)
            if(asistencia> mayorAsistencia){
                mayorAsistencia = asistencia
                eventoMayorAsistencia=evento
            }    
        }
        return eventoMayorAsistencia
    },
    menorAsistencia (){
                let menorAsistencia=0
                let eventoMenorAsistencia  
                for(let evento of this.eventosPast){    
                let asistencia = (evento.assistance*100/evento.capacity)
                if(menorAsistencia==0 || asistencia < menorAsistencia){
                    menorAsistencia = asistencia
                    eventoMenorAsistencia=evento
                }    
            }
            return eventoMenorAsistencia
        },
    masCapacidad(){
                let masCapacidad=0
                let eventoCapacidad  
                for(let evento of this.eventos){    
                if(evento.capacity > masCapacidad){
                    masCapacidad = evento.capacity
                    eventoCapacidad=evento
                }    
            }
            return eventoCapacidad
            },

    porcentajeMayorAsistencia(){
                return ((this.masAsistencia().assistance*100)/this.masAsistencia().capacity).toFixed(1)                               
    },

    porcentajeMenorAsistencia(){
                return  ((this.menorAsistencia().assistance*100)/this.menorAsistencia().capacity).toFixed(1)                
    },
    conMasCapacidad(){
              return  ((this.masCapacidad().capacity).toLocaleString())                
    },

    imprimirTablas(array){
    
        let categorias=Array.from(new Set(array.map(evento=>evento.category)))
        let revenues=[]
        let ofAsistencia = []
        for (let categoria of categorias){
            let capacidad = 0
            let total = 0
            let estimado = 0
            for (let evento of array){          
                   if(evento.category == categoria){                
                    total += ((evento.estimate)||(evento.assistance)) * evento.price 
                    estimado += ((evento.estimate)||(evento.assistance))
                    capacidad += evento.capacity                            
                }            
            }
            revenues.push(total)  
            ofAsistencia.push(estimado*100/capacidad)                
        }
        return {categorias:categorias, revenues:revenues , ofAsistencia:ofAsistencia}
    },
    

},
beforeUpdate(){
    console.log("usted está aquí")

},
computed:{

    

}

}).mount('#app')

















































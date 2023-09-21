const { createApp } = Vue

  createApp({
    data() {
      return {   
        eventos:[],    
        checkCategoria:[],
        inputSearchValue:"",
        filtrados:[],
        checkedValue:[],
        filtroCheck:[],
        filtrarPorSearchCruzado:[],
        eventosPast:[],        
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response=> response.json())
        .then((data)=> { 
        this.eventos= data
        this.eventosPast=this.eventos.events.filter(evento=>evento.date<this.eventos.currentDate)
        let aux=this.eventosPast.map(evento=>evento.category)
        this.checkCategoria= this.soloCategorias(aux)
        this.filtrados=this.eventosPast        
    }) 

    .catch(err => console.log(err))
    },
    methods:{
       
        filtrarPorSearch(){
           
          return this.eventosPast.filter(evento=>evento.name.toUpperCase().includes(this.inputSearchValue.toUpperCase()))
          
         
        },
        soloCategorias(array){
            return Array.from( new Set (array))
        },
        filtroPorCheck(){
            if (this.checkedValue ==0){
                return this.filtrarPorSearchCruzado
            }
           return this.filtrarPorSearchCruzado.filter(evento=> this.checkedValue.includes(evento.category))
          
        },
        filtroCruzado(){
            
           this.filtrarPorSearchCruzado= this.filtrarPorSearch()
           const filtrarporCheckCruzado= this.filtroPorCheck()
           this.filtrados=filtrarporCheckCruzado
           
        }
               

    },
    beforeUpdate(){
        console.log("usted está aquí")

    },
    computed:{

        

    }
  }).mount('#app')








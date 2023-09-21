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
        
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response=> response.json())
        .then((data)=> { 
        this.eventos= data.events
        let aux=this.eventos.map(evento=>evento.category)
        this.checkCategoria= this.soloCategorias(aux)
        this.filtrados=this.eventos        
           
        
    }) 

    .catch(err => console.log(err))
    },
    methods:{
        filtrarPorSearch(){
           
          return this.eventos.filter(evento=>evento.name.toUpperCase().includes(this.inputSearchValue.toUpperCase()))
          
         
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













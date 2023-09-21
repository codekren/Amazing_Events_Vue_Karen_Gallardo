const { createApp } = Vue

  createApp({
    data() {
      return {
        datos:[],
        eventos:[], 
        idEvents:null, 
        parametro:null,
        evento:{},        
        
      }
    },

    created(){
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then(response=> response.json())
        .then((data)=> { 
        this.eventos= data.events
        this.datos=data
        this.parametro=location.search
        let params= new URLSearchParams (this.parametro) 
        this.idEvents =params.get("parametro") 
        this.evento=this.eventos.find(detalle=>detalle._id==this.idEvents)
     
        
    }) 

    .catch(err => console.log(err))

},
methods:{
    
    


},
beforeUpdate(){
    console.log("usted está aquí")

},
computed:{    

}

}).mount('#app')


  

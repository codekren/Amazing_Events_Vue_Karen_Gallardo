

const URL_API= 'https://mindhub-xj03.onrender.com/api/amazing'

let parametro=location.search

let params= new URLSearchParams (parametro) 

let idEvents =params.get("parametro") 

let cardDetails=document.getElementById("contDetails")

let eventos
let evento
let datos
let fecha
fetch(URL_API)
.then(response=> response.json())
.then (data => { 
  datos=data
  eventos=datos.events 
  evento=eventos.find(detalle=>detalle._id==idEvents)
  fecha=datos.currentDate
  crearCardDetail(cardDetails,evento,fecha)

})

.catch(err => console.log(err))

function crearCardDetail(cardDetails,eventos,fecha){
  if(evento.date<fecha){
  cardDetails.innerHTML +=`
  <div class="row d-flex justify-content-center ">
      <div class="col-md-4 d-flex align-items-center  p-2 border-opacity-50 ">
        <img src="${eventos.image}" class="img-fluid object-fit-cover border rounded-start p-2 " alt="food_fair">
      </div>
      <div class="col-md-4 ">
        <div class="card-body  p-2 ">
          <h5 class="card-title  "> ${eventos.name}</h5>
          <p class="card-text">  Date: ${eventos.date}</p>
          <p class="card-text">  Description: ${eventos.description}</p>
          <p class="card-text">  Category:${eventos.category}</p> 
          <p class="card-text">  Place: ${eventos.place}</p> 
          <p class="card-text">  Capacity: ${eventos.capacity}</p> 
          <p class="card-text">  Assistance:${eventos.assistance} </p>
          <p class="card-text"> Price:$ ${eventos.price}</p>             
        </div>
      </div>
  </div
  `
}else {
  cardDetails.innerHTML +=`
  <div class="row d-flex justify-content-center  ">
      <div class="col-md-4 d-flex align-items-center  p-2 border-opacity-50 ">
        <img src="${eventos.image}" class="img-fluid object-fit-cover border rounded-start p-2 " alt="food_fair">
      </div>
      <div class="col-md-4 ">
        <div class="card-body  p-2 ">
          <h5 class="card-tittle "> ${eventos.name}</h5>
          <p class="card-text">  Date: ${eventos.date}</p>
          <p class="card-text">  Description: ${eventos.description}</p>
          <p class="card-text">  Category:${eventos.category}</p> 
          <p class="card-text">  Place: ${eventos.place}</p> 
          <p class="card-text">  Capacity: ${eventos.capacity}</p> 
          <p class="card-text">  Estimate:${eventos.estimate} </p>
          <p class="card-text"> Price:$ ${eventos.price}</p>             
        </div>
      </div>
  </div
  `
}
}

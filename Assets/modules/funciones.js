
export function createCard (events,urlDetails){
    return  `<div class="col d-flex justify-content-center pt-2 pb-2"> 
                  <div class="card text-center mb-3 border border-success p-2 mb-2 border-opacity-75" style="width: 16rem;">
                      <img src="${events.image}" class="card-img-top p-2 imgcard" alt="costume_party">
                      <div class="card-body d-flex flex-column justify-content-between">
                          <h5 class="card-title">${events.name}</h5>
                          <p class="card-text"> ${events.description}</p>
                          <div class=" d-flex justify-content-between align-items-center bg-body-secondary">
                            <p class="mb-0">$${events.price}</p>
                            <a href="${urlDetails}?parametro=${events._id}" class="btn btn-primary me-md">Details</a>
                          </div>  
                      </div>
                  </div>
            </div>`            
}

export function printCard (data,contain,urlDetails){
    if(data.length>0){        
        let frontcard=""
        for (let evento of data) {    
           frontcard+=createCard (evento, urlDetails)   
        }
        contain.innerHTML=frontcard} 
    else{ contain.innerHTML= `<div class= "d-flex justify-content-center mt-5"> 
            <h5  class=" text-center" > Please,try other option</h5>
            </div> `

    }
}

export function createCategory(Categoria){
    return` <div class="form-check form-check-inline">
                <label class="form-check-label " for="inlineCheckbox_${Categoria}">${Categoria}</label>
                <input class="form-check-input " type="checkbox" id="inlineCheckbox_${Categoria}" value="${Categoria}">        
            </div>`
}

export function printCategory(arraySoloCategoria,contain){
    let frontbox=""
    for (let categoria of arraySoloCategoria) {    
       frontbox+=createCategory (categoria)         
    }    
    contain.innerHTML+=frontbox
}

export function filtradoCheck(data){
    const checked=document.querySelectorAll("input[type='checkbox']:checked")
    const arrayChecked=Array.from(checked).map(checkbox=> checkbox.value)
    const seleccion= data.filter(evento => arrayChecked.includes(evento.category))
    console.log(seleccion)
    if(seleccion.length>0){
        return seleccion
    }
    else{ return data }
}

export function filtradoSearch (data,$search) {           
        let selecSearch=data.filter(elemento=>elemento.name.toUpperCase().includes($search.value.toUpperCase()))
        if(selecSearch.length>0){
            return selecSearch
        }else { return [ ] 
        }             
}
 
export function filtrosCruzados(data,$search){
   const arrayFiltradosChecked=filtradoCheck(data)
   const arrayFiltradosSearch= filtradoSearch(arrayFiltradosChecked,$search)
   return arrayFiltradosSearch
}


export function imprimirTablas(array,titulo,tablas){
    
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

    let template = `
  <tr>  
    <th colspan="4" class="text-center text-bg-secondary p-0">${titulo} events statistics by category</th>
  </tr>
  <tr class="text-center">
    <th class="p-0 ">Categories</th>
    <th class="p-0 ">Revenues</th>
    <th class="p-0 ">Porcentage of assistance</th>          
  </tr>`
        
  for (let i = 0; i < categorias.length; i++){
            template += ` 
        
        <tr class="text-center" >  
         <td class="p-1">${categorias[i]}</td>
         <td class="p-1">$ ${revenues[i].toLocaleString()}</td>
         <td class="p-1">${ofAsistencia[i].toFixed(2)}%</td>
        </tr>              
             
            `
        }
        document.getElementById(`${tablas}`).innerHTML = template
    
    }

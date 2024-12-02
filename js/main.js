 // Reemplaza con tu URL
 const databaseURL = 'https://landing-98bb9-default-rtdb.firebaseio.com/usuarios.json'; 

 document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
      
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
  
      // Obtén los datos del formulario
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto
  
      // Agrega la fecha con la zona horaria de Ecuador
      data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });
  
      // Realiza la petición POST con fetch
      fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
          'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`); // Si la respuesta no es exitosa, lanzamos un error
        }
        return response.json(); // Procesa la respuesta como JSON
      })
      .then(result => {
        alert('Agradecemos tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces');
        form.reset(); // Resetea el formulario después de enviar
      })
      .catch(error => {
        console.error(error); // Muestra el error en la consola para depuración
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Muestra un mensaje de error al usuario
      });
    });
});

let sendData = () => {  
     // Obtén los datos del formulario
     const formData = new FormData(form);
     const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto

     // new Date().toLocaleString( locales, options )
     data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

     // Realiza la petición POST con fetch
    fetch(databaseURL, {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json(); // Procesa la respuesta como JSON
    })
    then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()

        // Recuperación de datos
        getData()
    })

    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}


  let getData = async () => {  

    try {

        // Realiza la petición fetch a la URL de la base de datos
        const response = await fetch(databaseURL, {
            method: 'GET'
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
        }

        // Convierte la respuesta en formato JSON
        const data = await response.json();

        if(data != null) {

            // Cuente el número de suscriptores registrados por fecha a partir del objeto data
            let countSuscribers = new Map()

            if (Object.keys(data).length > 0) {
                for (let key in data) {
       
                    let { email, saved } = data[key]
                       
                    let date = saved.split(",")[0]
                       
                    let count = countSuscribers.get(date) || 0;
                    countSuscribers.set(date, count + 1)
                }
            }
            // END

            // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
            if (countSuscribers.size > 0) {

                subscribers.innerHTML = ''
       
                let index = 1;
                for (let [date, count] of countSuscribers) {
                    let rowTemplate = `
                        <tr>
                            <th>${index}</th>
                            <td>${date}</td>
                            <td>${count}</td>
                        </tr>`
                    subscribers.innerHTML += rowTemplate
                    index++;
                }
            }
            // END

        }

      } catch (error) {
        // Muestra cualquier error que ocurra durante la petición
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
      }

}


let ready = () => { 
	
    console.log('DOM está listo')

    // Recuperación de datos
    getData();
}



let loaded = ( eventLoaded ) => {
    
    let myform = document.getElementById('form');
    
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); 
        
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;
        
        if (emailText.length === 0) {
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
            
            emailElement.focus()

            return;
        }
        
     	//Llamada a la función sendData()
     	sendData();

    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)

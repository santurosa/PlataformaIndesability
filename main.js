/********************************* CREAMOS LOS USUARIOS ***********************************/
class Usuario {
    constructor(usuario, nombre, apellido, mail, password) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.password = password;
    }
}

const usuarios = [];
admin = new Usuario("admin", "Santiago", "Rosa", "info@indesability.com", "Indesability2023");
usuarios.push(admin);

/************************************* INICIAR SECCION ***************************************/

const logIn = document.getElementById("logIn");

// Iniciar sección mediante el LocalStorage
function sesionStorage() {
    let verificacion = localStorage.getItem("usuario");
    if (verificacion) {
        let usuarioBuscado = usuarios.find(ingreso => ingreso.usuario === verificacion);
        let nombre = usuarioBuscado.nombre;
        logIn.innerHTML = `<a id="logIn" class="d-flex" href="html/perfil.html">Hola, ${nombre}</a>`;
    }
};

sesionStorage();

// Iniciar sección mediante el botón
logIn.addEventListener("click", () => {
    Swal.fire({
        imageUrl: "img/Logotipo_web_azul.png",
        html: ` <input type="text" id="usuario" class="swal2-input" placeholder="Usuario o correo eléctronico">
                <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: "Iniciar sección",
        confirmButtonColor: "blue",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        backdrop: "blue",
    }).then((result) => {
        if (result.isConfirmed) {
            let usuario = document.getElementById("usuario").value;
            let password = document.getElementById("password").value;
            // Si quiero enviarle a otra página
            if ((usuarios.find(ingreso => ingreso.usuario === usuario)) || (usuarios.find(ingreso => ingreso.mail === usuario)) && (usuarios.find(ingreso => ingreso === password))) {
                let usuarioBuscado = usuarios.find(ingreso => ingreso.usuario === usuario);
                let nombre = usuarioBuscado.nombre;
                Toastify({
                    text: `¡Bienvenido de nuevo, ${nombre}!`,
                    duration: 3000,
                    gravity: "bottom",
                    position: "right",
                    style: {
                        background: "blue",
                    }
                }).showToast();
                logIn.innerHTML = `<a class="btnBlanco d-flex" type="buton" href="html/perfil.html">Hola, ${nombre}</a>`
                localStorage.setItem("usuario", usuario);
            }
            else {
                Toastify({
                    text: "Usuario o contraseña incorrectos. Intente de nuevo.",
                    duration: 5000,
                    gravity: "bottom",
                    position: "right",
                    style: {
                        background: "red",
                    }
                }).showToast();
            }
        }
    })
})

/**************************************** BUSCADOR ******************************************/

const resultados = document.getElementById("resultados");
const busqueda = document.getElementById("busqueda");

if(busqueda.value === ""){
    resultados.innerHTML = `<div class="busque">
                                <div clas="lupa">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-search lupa" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-center">Busque por nombre el lugar que deasea calificar o informarse con respecto a su accesibilidad para personas con discapacidad.</p>
                                </div>
                            </div>
                            `
};

function initMap() {


    
    // Inicializar el servicio Places de Google Maps
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));
    let centro = sydney = new google.maps.LatLng(-34.618144, -58.390077);
    const map = new google.maps.Map(document.getElementById('map'), {center: centro, zoom: 17});

    const buscar = () => {
        resultados.innerHTML = '';
        const texto = busqueda.value.toLowerCase();

        // Verificar si no hay texto en el campo de búsqueda
        if (texto === '') {
            resultados.innerHTML = `<div class="busque">
                                        <div clas="lupa">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-search lupa" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="text-center">Busque por nombre el lugar que deasea calificar o informarse con respecto a su accesibilidad para personas con discapacidad.</p>
                                        </div>
                                    </div>
        `
            return;
        }

        // Crear una solicitud de búsqueda a la API Places
        const request = {
            query: texto,
            fields: ['name', 'types', 'formatted_address', 'photos', 'geometry'],
        };

        // Realizar la búsqueda de lugares
        placesService.textSearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let place of results) {
                    // Obtener la foto del lugar (si está disponible)
                    let photoUrl = '';
                    if (place.photos && place.photos.length > 0) {
                        photoUrl = place.photos[0].getUrl();
                    } else{photoUrl = "https://dummyimage.com/400x870/000/fff";}

                    resultados.innerHTML += `
                                            <div class="card mb-3">
                                                <div class="row g-0">
                                                    <div class="col-md-4">
                                                        <div class="img-container">
                                                            <img src="${photoUrl}" class="img-fluid rounded-start" alt="${place.name}">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="card-body">
                                                            <h5 class="card-title">${place.name}</h5>
                                                            <p class="card-text">${place.types[0]}</p>
                                                            <p class="card-text">${place.formatted_address}</p>
                                                            <div class="flex-d">
                                                                <button type="button" class="btn btn-primary">Ver más</button>
                                                                <button type="button" class="btn btn-primary btnCalificar">Calificar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                }
            } else {
                resultados.innerHTML = `<div class="busque">
                                            <div class="x">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-center">No se ha encontrado ningun resultado a "${busqueda.value}".</p>
                                            </div>
                                        </div>
            `;
            }
        });
    };

    busqueda.addEventListener('keyup', buscar);
}

/************************************** AGREGAR LUGAR ********************************************/

btnMas = document.getElementById("btnMas");
btnMas.addEventListener("click", () => {
    window.location.href = "html/agregar.html";
});

/************************************** CALIFICAR LUGAR ********************************************/

const btnCalificar = document.querySelectorAll(".btnCalificar");

const buscador = document.getElementById("buscador");

const circulos = document.getElementsByClassName("circulo");
console.log(btnCalificar)

btnCalificar.forEach((boton) => {
    boton.addEventListener("click", () => {
        buscador.innerHTML = `
                            <a href="index.html" class="volver"> <  Volver </a>
                            <p> Califica al lugar entre 1 y 5 puntos: </p>
                            <div id="calificacion">
                                <i class="bi bi-circle-fill circulo" dadta-value="1"></i>
                                <i class="bi bi-circle-fill circulo" dadta-value="2"></i>
                                <i class="bi bi-circle-fill circulo" dadta-value="3"></i>
                                <i class="bi bi-circle-fill circulo" dadta-value="4"></i>
                                <i class="bi bi-circle-fill circulo" dadta-value="5"></i>
                            </div>
                            <div class="mb-3">
                                <label for="resenaIngresada" class="form-label">Escribe tu reseña sobre el lugar:</label>
                                <textarea class="form-control" id="resenaIngresada" placeholder="Reseña del lugar..." rows="3" required></textarea>
                            </div>
                            <button class="btn btn-primary text-center" id="calificacionIngresada">Enviar</button>
                        `

        let puntosIngresados = 1;

        function calificar(index) {
            puntosIngresados = index + 1;
            for (let i = 0; i < circulos.length; i++) {
                if (i <= index) {
                    circulos[i].classList.add("calificado");
                } else {
                    circulos[i].classList.remove("calificado");
                }
            }
        }

        for (let i = 0; i < circulos.length; i++) {
            circulos[i].addEventListener("click", (function (index) {
                return function () {
                    calificar(index);
                };
            })(i));
        }

        const resenaIngresada = document.getElementById("resenaIngresada");
        const calificacionIngresada = document.getElementById("calificacionIngresada");

        calificacionIngresada.addEventListener("click", () => {
            let usuario = localStorage.getItem("usuario");
            let lugarIngresado = document.getElementById("lugarIngresado");
            calificacion = new CalificacionLugar(usuario, lugarIngresado, puntosIngresados, resenaIngresada.value);
            calificaciones.push(calificacion);
            console.log(calificacion)
        })
    })
})

/************************************** RAMPAS ********************************************/


fetch("rampas-caba.json")
  .then(response => response.json())
  .then(data => {
    // Crea el mapa
    const mapOptions = {
      center: { lat: data[0].Y, lng: data[0].X },
      zoom: 17,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Agrega los marcadores
    data.forEach(rampa => {
      const location = new google.maps.LatLng(rampa.Y, rampa.X);

      const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        },
      });

      // Información del marcador
      const infoWindow = new google.maps.InfoWindow({
        content: `<strong>Rampa</strong><br><strong>Calle:</strong> ${rampa.CALLE}<br><strong>Altura:</strong> ${rampa.ALTURA}`,
      });

      // Muestra la información al hacer clic en el marcador
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });

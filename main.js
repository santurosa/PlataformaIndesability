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
const botonera = document.getElementById("botonera");

// Iniciar sección mediante el LocalStorage
function sesionStorage() {
    let verificacion = localStorage.getItem("usuario");
    if (verificacion) {
        let usuarioBuscado = usuarios.find(ingreso => ingreso.usuario === verificacion);
        let nombre = usuarioBuscado.nombre;
        logIn.innerHTML = `<a id="logIn" class="d-flex btnBlanco" href="html/perfil.html">Hola, ${nombre}</a>`;
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
                botonera.innerHTML = `<a class="d-flex btnBlanco" type="buton" href="html/perfil.html">Hola, ${nombre}</a>
                                      <button class="btnBlanco d-flex" type="buton" id="btnMas">Agragar lugar</button>
                                      <button class="btnBlanco d-flex" type="buton" id="verRampas">Ver rampas</button>`
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

if (busqueda.value === "") {
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
    let centro = new google.maps.LatLng(-34.618144, -58.390077);
    const map = new google.maps.Map(document.getElementById('map'), { center: centro, zoom: 17 });

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
                    } else { photoUrl = "https://dummyimage.com/400x870/000/fff"; }

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
                                                            <p class="card-text categoria">${place.types[0]}</p>
                                                            <p class="card-text direccion">${place.formatted_address}</p>
                                                            <div class="flex-d">
                                                                <button type="button" class="btn btn-primary">Ver más</button>
                                                                <button type="button" class="btn btn-primary btnCalificar">Calificar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;

                    const verMas = document.querySelectorAll(".verMas");
                    verMas.forEach((boton) => {
                        boton.addEventListener("click", () => {
                            const cardBody = boton.closest(".card-body");
                            const lugar = cardBody.querySelector(".card-title").textContent;
                            const categoria = cardBody.querySelector(".categoria").textContent;
                            const direccion = cardBody.querySelector(".direccion").textContent;
                            verLugar(lugar, categoria, direccion);
                        });
                    });

                    const btnCalificar = document.querySelectorAll(".btnCalificar");
                    btnCalificar.forEach((boton) => {
                        boton.addEventListener("click", () => {
                            const cardBody = boton.closest(".card-body");
                            const lugar = cardBody.querySelector(".card-title").textContent;
                            calificarLugar(lugar);
                        });
                    });
                };
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

/************************************** CALIFICAR LUGAR ********************************************/

const DateTime = luxon.DateTime;

class CalificacionLugar {
    constructor(fecha, usuario, lugar, calificacion, resena) {
        this.fecha = fecha;
        this.usuario = usuario;
        this.lugar = lugar;
        this.calificacion = calificacion;
        this.resena = resena;
    }
}
const calificaciones = [];

function calificarLugar(lugarCalificado) {
    const circulos = document.getElementsByClassName("circulo");
    const buscador = document.getElementById("buscador");

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
        // Emprolijamos los datos
        let usuario = localStorage.getItem("usuario");
        let fecha = new Date();
        const fechaIngresada = fecha.toLocaleString(DateTime.DATETIME_FULL);
        // Obtenemos las calificaciones existentes del localStorage
        let calificaciones = localStorage.getItem("calificaciones");
        calificaciones = calificaciones ? JSON.parse(calificaciones) : [];
        // Pusheamos la calificación
        let calificacion = new CalificacionLugar(fechaIngresada, usuario, lugarCalificado, puntosIngresados, resenaIngresada.value);
        calificaciones.push(calificacion);
        // Guardamos las calificaciones actualizadas en el localStorage
        let calificacionesJSON = JSON.stringify(calificaciones);
        localStorage.setItem("calificaciones", calificacionesJSON);
        // Notificamos y volvemos al index
        Toastify({
            text: `¡Gracias por calificar a ${lugarCalificado}!`,
            duration: 3000,
            gravity: "bottom",
            position: "left",
            style: {
                background: "blue",
            }
        }).showToast();
        setTimeout(() => { window.location.href = "index.html"; }, 3000);
    });
};

/************************************** RAMPAS ********************************************/

const verRampas = document.getElementById("verRampas");

verRampas.addEventListener("click", () => {
    fetch("json/rampas-caba.json")
        .then(response => response.json())
        .then(data => {
            // Crea el mapa
            const mapOptions = {
                center: { lat: data[0].Y, lng: data[0].X },
                zoom: 17,
            };
            let centro = new google.maps.LatLng(-34.618144, -58.390077);
            const map = new google.maps.Map(document.getElementById('map'), { center: centro, zoom: 17 });

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
    verRampas.innerHTML = `<button id="ocultarRampas" class="btnAzul">Ocultar Rampas</button>`
    const ocultarRampas = document.getElementById("ocultarRampas");

    ocultarRampas.addEventListener("click", () => {
        window.location.href = "index.html"
    });

})
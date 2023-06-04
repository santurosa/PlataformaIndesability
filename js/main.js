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

/************************************* REGISTRARSE ***************************************/

const registrarse = document.getElementById("registrarse");
registrarse.addEventListener("click", () => {
    Swal.fire({
        imageUrl: "img/Logotipo_web_azul.png",
        html: `  <label for="nombre">Nombre</label><br>
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" required><br>
    
        <label for="apellido">Apellido</label><br>
        <input type="text" id="apellido" class="swal2-input" placeholder="Apellido" required><br>
    
        <label for="usuario">Usuario</label><br>
        <input type="text" id="usuario" class="swal2-input" placeholder="Creá tu nombre de usuario" required><br>
    
        <label for="correo">Correo Electrónico</label><br>
        <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico" required><br>
    
        <label for="contrasena">Contraseña</label><br>
        <input type="password" id="password" class="swal2-input" placeholder="Creá tu contraseña" required><br>`,
        confirmButtonText: "Registrarse",
        confirmButtonColor: "blue",
        showCancelButton: true,
        backdrop: "blue",
    }).then((result) => {
        if (result.isConfirmed) {
            let usuariosJSON = localStorage.getItem("usuarios");
            usuariosJSON = usuariosJSON ? JSON.parse(usuariosJSON) : [];
            let nombre = document.getElementById("nombre").value;
            let apellido = document.getElementById("apellido").value;
            let usuario = document.getElementById("usuario").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let nuevoUsuario = new Usuario(usuario, nombre, apellido, email, password);
            usuarios.push(nuevoUsuario);
            usuariosJSON = JSON.stringify(usuarios);
            console.log(usuariosJSON)
            localStorage.setItem("usuarios", usuariosJSON);
            localStorage.setItem("usuario", usuario);
        }
        Toastify({
            text: `¡Bienvenido de nuevo, ${nombre.value}!`,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "blue",
            }
        }).showToast();
    })
})
/************************************* INICIAR SECCION ***************************************/

const logIn = document.getElementById("logIn");
const botonCuenta = document.getElementById("botonCuenta");

// Iniciar sección mediante el LocalStorage
function sesionStorage() {
    let verificacion = localStorage.getItem("usuario");
    const usuariosJSON = localStorage.getItem("usuarios");
    const usuarios = JSON.parse(usuariosJSON);
    if (verificacion) {
        const usuarioVerificado = (usuarios.find(ingreso => ingreso.usuario === verificacion)) || (usuarios.find(ingreso => ingreso.mail === verificacion));
        let nombre = usuarioVerificado.nombre;
        logIn.remove();
        botonCuenta.innerHTML = `<a class="btnBlanco d-flex" href="html/perfil.html">Hola, ${nombre}</a>`;
    }
};

sesionStorage();

// Iniciar sección mediante el botón
logIn.addEventListener("click", () => {
    Swal.fire({
        imageUrl: "img/Logotipo_web_azul.png",
        html: ` <input type="text" id="usuario" class="swal2-input" placeholder="Usuario">
                <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: "Iniciar sección",
        confirmButtonColor: "blue",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        backdrop: "blue",
    }).then((result) => {
        if (result.isConfirmed) {
            const usuariosJSON = localStorage.getItem("usuarios");
            const usuarios = JSON.parse(usuariosJSON);
            let usuario = document.getElementById("usuario").value;
            let password = document.getElementById("password").value;
            const usuarioVerificado = (usuarios.find(ingreso => ingreso.usuario === usuario)) || (usuarios.find(ingreso => ingreso.mail === usuario));
            if (usuarioVerificado && (usuarios.find(ingreso => ingreso.password === password))) {
                let nombre = usuarioVerificado.nombre;
                localStorage.setItem("usuario", usuario);
                Toastify({
                    text: `¡Bienvenido de nuevo, ${nombre}!`,
                    duration: 2000,
                    gravity: "bottom",
                    position: "right",
                    style: {
                        background: "blue",
                    }
                }).showToast();
                setTimeout(() => {
                    window.location.href = "index.html";
                    botonera.innerHTML = `<a class="d-flex btnBlanco" type="buton" href="html/perfil.html">Hola, ${nombre}</a>`
                }, 3000);

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

/**************************************** CALIFICACIÓN LUGAR ******************************************/
function promedioCalificacion(lugar) {
    const calificacionesRecuperadas = localStorage.getItem("calificaciones");
    const calificacionesRecupderadasJSON = JSON.parse(calificacionesRecuperadas);
    const calificacionesLugar = calificacionesRecupderadasJSON.filter((calificacion) => calificacion.lugar === lugar);
    let suma = 0;
    if (calificacionesLugar.length > 0) {
        for (let i = 0; i < calificacionesLugar.length; i++) {
            suma += calificacionesLugar[i].calificacion;
        }
        const promedioCalificaciones = suma / calificacionesLugar.length;
        return promedioCalificaciones.toFixed(1);
    } else { return 0.0.toFixed(1) };
}
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
                                    <p class="text-center">Busque por nombre el lugar que desea calificar o informarse con respecto a su accesibilidad para personas con discapacidad.</p>
                                </div>
                            </div>
                            `
};

let placesService;
let map;

function initMap() {
    const mapa = document.getElementById('map')
    // Inicializar el servicio Places de Google Maps
    placesService = new google.maps.places.PlacesService(document.createElement('div'));
    let centro = new google.maps.LatLng(-34.618144, -58.390077);
    map = new google.maps.Map(mapa, { center: centro, zoom: 17 });


    // Crear el botón Ver Rampas
    let boton = document.createElement("button");
    boton.classList.add("btnAzul");
    boton.id = "verRampas";
    boton.innerText = "Ver Rampas";
    // Agregar el botón Ver Rampas
    mapa.appendChild(boton);
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.appendChild(boton);
    mapa.appendChild(overlay);
    // Posicionar el botón Ver Rampas
    const verRampas = document.getElementById("verRampas");
    verRampas.addEventListener("click", () => {agregarRampas(boton)});

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
                                            <p class="text-center">Busque por nombre el lugar que desea calificar o informarse con respecto a su accesibilidad para personas con discapacidad.</p>
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
                                                            <p>${promedioCalificacion(place.name)} <i class="bi bi-circle-fill" style= "color: blue;"></i></p>
                                                            <p class="card-text categoria">${place.types[0]}</p>
                                                            <p class="card-text direccion">${place.formatted_address}</p>
                                                            <div class="flex-d">
                                                                <button type="button" class="btn btn-primary verMas">Ver más</button>
                                                                <button type="button" class="btn btn-primary btnCalificar">Calificar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                    // Mostramos la ubicacion del primer resultado
                    const firstPlace = results[0];
                    const location = firstPlace.geometry.location;
                    const marker = new google.maps.Marker({
                        position: location,
                        map: map,
                    });
                    map.setCenter(location);
                    const verMas = document.querySelectorAll(".verMas");
                    verMas.forEach((boton) => {
                        boton.addEventListener("click", () => {
                            const cardBody = boton.closest(".card");
                            const lugar = cardBody.querySelector(".card-title").textContent;
                            const categoria = cardBody.querySelector(".categoria").textContent;
                            const direccion = cardBody.querySelector(".direccion").textContent;
                            const imgContainer = cardBody.querySelector(".img-container");
                            const img = imgContainer.querySelector("img").getAttribute("src");
                            verLugar(lugar, categoria, direccion, img);
                            // Mostrar la ubicación del lugar en el mapa
                            mostrarUbicacionEnMapa(lugar);
                        });
                    });

                    const btnCalificar = document.querySelectorAll(".btnCalificar");
                    btnCalificar.forEach((boton) => {

                        boton.addEventListener("click", () => {
                            let verificacion = localStorage.getItem("usuario");
                            if(isNaN(verificacion)){
                                const cardBody = boton.closest(".card-body");
                                const lugar = cardBody.querySelector(".card-title").textContent;
                                calificarLugar(lugar);
                            } else{
                                Swal.fire({
                                    text: "Tenes que iniciar sección o registrarte para calificar lugares.", 
                                    confirmButtonText: "Aceptar",
                                    confirmButtonColor: "blue",
                                })
                            }
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
};

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
            duration: 2000,
            gravity: "bottom",
            position: "left",
            style: {
                background: "green",
            }
        }).showToast();
        setTimeout(() => { window.location.href = "index.html"; }, 2000);
    });
};

/************************************** VER MÁS ********************************************/
function verLugar(lugar, categoria, direccion, img) {
    const calificacionesRecuperadas = localStorage.getItem("calificaciones");
    const calificacionesRecupderadasJSON = JSON.parse(calificacionesRecuperadas);
    const calificacionesLugar = calificacionesRecupderadasJSON.filter((calificacion) => calificacion.lugar === lugar);
    calificacionesLugar.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const contenedorTarjetas = document.createElement("div");
    if (calificacionesLugar.length > 0) {
        calificacionesLugar.forEach((item) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("card", "w-200", "mb-3");
            tarjeta.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.usuario}</h5>
                    <p>${item.calificacion} <i class="bi bi-circle-fill" style= "color: blue;"></i></p>
                    <p>${item.fecha}</p>
                    <p class="card-text">${item.resena}.</p>
                </div>
            `;
            contenedorTarjetas.appendChild(tarjeta);
        });
    } else {
        const tarjeta = document.createElement("div");
        tarjeta.innerHTML = `
            <div class="ningunaCalificacion">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="triste bi bi-emoji-frown-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
                </svg>
                <p class="text-center">${lugar} todavía no ha sido calificado. ¡Podes ser el primero en hacerlo!</p>
            </div>
            `
        contenedorTarjetas.appendChild(tarjeta);
    }
    buscador.innerHTML = `
            <a href="index.html" class="volver"> <  Volver </a>
            <img src="${img}" class="imgVerMas img-fluid rounded-start" alt="${lugar}">
            <h1>${lugar}</h1>
            <p>${categoria}</p>
            <p>${direccion}</p>
            <h2>Calificaciones</h2>
        `;
    buscador.appendChild(contenedorTarjetas);
}
function mostrarUbicacionEnMapa(lugar) {
    // Crear una solicitud de búsqueda a la API Places para obtener la ubicación del lugar
    const request = {
        query: lugar,
        fields: ['geometry'],
    };

    // Realizar la búsqueda de lugares
    placesService.textSearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const location = results[0].geometry.location;
            const marker = new google.maps.Marker({
                position: location,
                map: map,
            });
            map.setCenter(location);
        }
    });
};

/************************************** RAMPAS ********************************************/

function agregarRampas() {
    fetch("json/rampas-caba.json")
        .then(response => response.json())
        .then(data => {
            // Crea el mapa
            const mapOptions = {
                center: { lat: data[0].Y, lng: data[0].X },
                zoom: 17,
            };
            let centro = new google.maps.LatLng(-34.618144, -58.390077);
            const mapa = document.getElementById("map");
            const map = new google.maps.Map(mapa, { center: centro, zoom: 17 });

            // Crear el botón Ver Rampas
            let boton = document.createElement("button");
            boton.classList.add("btnAzul");
            boton.id = "ocultarRampas";
            boton.innerText = "Ocultar Rampas";
            boton.addEventListener("click", () => { window.location.href = "index.html"; });
            // Agregar el botón Ver Rampas
            mapa.appendChild(boton);
            let overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.appendChild(boton);
            mapa.appendChild(overlay);

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
};

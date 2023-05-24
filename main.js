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
        html: `<img src="img/Logotipo web azul.png" alt="Logo  de Indesability">
                <input type="text" id="usuario" class="swal2-input" placeholder="Usuario o correo eléctronico">
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
                logIn.innerHTML = `<a class="btnBlanco d-flex" type="buton" id="logIn" href="html/perfil.html">Hola, ${nombre}</a>`
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

const buscar = () => {
    resultados.innerHTML = '';
    const texto = busqueda.value.toLowerCase();
    for (let lugar of lugares) {
        let nombre = lugar.nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            resultados.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://dummyimage.com/400x870/000/fff" class="img-fluid rounded-start" alt="${lugar.nombre}">
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" id="lugarIngresado">${lugar.nombre}</h5>
                        <p class="card-text"><small class="text-body-secondary">${lugar.categoria}</small></p>
                        <p class="card-text">${lugar.accesibilidad}.</p>
                        <div class="flex-d">
                            <button type="button" id="verMas" class="btn btn-primary">Ver más</button>
                            <button type="button" class="btn btn-primary btnCalificar">Calificar</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>`
        }
    }
    if (resultados.innerHTML === '') {
        resultados.innerHTML = `<p class="noEncontrado">Lugar no encontrado</p>`;
    }
}

busqueda.addEventListener('keyup', buscar);
buscar();

/************************************** AGREGAR LUGAR ********************************************/

btnMas = document.getElementById("btnMas");
btnMas.addEventListener("click", () => {
    window.location.href = "html/agregar.html";
});

/************************************** CALIFICAR LUGAR ********************************************/

const btnCalificar = document.getElementsByClassName("btnCalificar");

const buscador = document.getElementById("buscador");

const circulos = document.getElementsByClassName("circulo");

btnCalificar.addEventListener("click", () => {
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


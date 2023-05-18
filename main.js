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
        logIn.innerHTML = `<button class="d-flex" type="buton">Hola, ${nombre}</button>`;
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
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://dummyimage.com/400x870/000/fff" class="img-fluid rounded-start" alt="${lugar.nombre}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${lugar.nombre}</h5>
                  <p class="card-text"><small class="text-body-secondary">${lugar.categoria}</small></p>
                  <p class="card-text">${lugar.accesibilidad}.</p>
                  <button type="button" id="btnCalificar" class="btn btn-primary">Calificar</button>
                </div>
              </div>
            </div>
          </div>`
        }
    }
    if (resultados.innerHTML === '') {
        resultados.innerHTML = `<p class="noEncontrado" >Producto no encontrado</p>`;
    }
}

busqueda.addEventListener('keyup', buscar);
buscar();

/************************************** AGREGAR LUGAR ****************************************/

// Datos agregados

const nombreIngresado = document.getElementById("nombreIngresado");
const categoriaIngresada = document.getElementById("categoriaIngresada");
const calleIngresada = document.getElementById("calleIngresada");
const alturaIngresada = document.getElementById("alturaIngresada");
const descripcionIngresada = document.getElementById("descripcionIngresada");
const imagenIngresada = document.getElementById("imagenIngresada");

// Le damos dinamica a los botones

btnMas = document.getElementById("btnMas");
btnMas.addEventListener("click", () => {
    window.location.href = "html/agregar.html";
});

lugarIngresado = document.getElementById("lugarIngresado");
lugarIngresado.addEventListener("click", () => {
    if (lugares.find(ingresado => ingresado.nombre === nombreIngresado)) {
        Swal.fire({
            html: "El lugar que esta intentando cargar ya existe.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "red",
            showCancelButton: true,
        })
    } else {
        agregarLugar();
        Swal.fire({
            html: "Se ha agregado correctamente a ${nombreIngresado} en la Plataforma.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "blue",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "index.html";
            };
        });
    };
});


// Función

function agregarLugar() {
    if (isNaN(altura)) { altura = "S/N"; };
    direccionIngresada = `${calleIngresada} N° ${alturaIngresada}`;
    let lugar = new Lugar(nombreIngresado, categoriaIngresada, descripcionIngresada, imagenIngresada);
    lugares.push(lugar);

};
/* BOTÓN CERRAR SESIÓN */

const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    Toastify({
        text: `¡Hasta luego! Cerrando sesión...`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "blue",
        }
    }).showToast();
    setTimeout(() => { window.location.href = "../index.html"; }, 3000);
})

/* BIENVENIDA AL USUARIO */

const bienvenidaUsuario = document.getElementById("bienvenidaUsuario");

let usuarioActivo = localStorage.getItem("usuario");
const usuariosJSON = localStorage.getItem("usuarios");
const usuarios = JSON.parse(usuariosJSON);

function BucarUsuario(usuarioActivo) {
    const usuarioBuscado = usuarios.find(usuario => usuario.usuario === usuarioActivo);
    if (usuarioBuscado) {
        return usuarioBuscado.nombre;
    }
}
bienvenidaUsuario.textContent = `¡Hola, ${BucarUsuario(usuarioActivo)}!`;

/* MIS CALIFICACIONES */

function mostrarCalificaciones() {
    const misCalificacionesDiv = document.getElementById("misCalificaciones");
    let calificaciones = localStorage.getItem("calificaciones");
    calificaciones = calificaciones ? JSON.parse(calificaciones) : [];

    const calificacionesUsuario = calificaciones.filter(calificacion => calificacion.usuario === usuarioActivo);

    if (calificacionesUsuario.length > 0) {
        const cardsHTML = calificacionesUsuario.map(calificacion => `
        <div class="card mb-3" style="max-width: 100%;">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${calificacion.lugar}</h5>
                <p class="card-text">${(calificacion.calificacion).toFixed(1)} <i class="bi bi-circle-fill" style= "color: blue;"></i></p>
                <p class="card-text">${calificacion.fecha}</p>
                <p class="card-text">${calificacion.resena}</p>
              </div>
            </div>
          </div>
        </div>
      `);

        misCalificacionesDiv.innerHTML = cardsHTML.join('');
    } else {
        misCalificacionesDiv.innerHTML = `
        <div class="ningunaCalificacionPerfil">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="tristePerfil bi bi-emoji-frown-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
        </svg>
        <p class="text-center">Todavía no has realizado ninguna calificación.</p>
        <button class="btnAzul" onclick="window.location.href = '../index.html';">¡Ir a calificar!</button>
    </div>
      `;
    }
};

mostrarCalificaciones();

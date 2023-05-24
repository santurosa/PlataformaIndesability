/************************************** AGREGAR LUGAR ****************************************/

// Datos agregados

const nombreIngresado = document.getElementById("nombreIngresado");
const categoriaIngresada = document.getElementById("categoriaIngresada");
const calleIngresada = document.getElementById("calleIngresada");
let alturaIngresada = document.getElementById("alturaIngresada");
const descripcionIngresada = document.getElementById("descripcionIngresada");
const imagenIngresada = document.getElementById("imagenIngresada");

// Le damos dinamica a los botones

lugarIngresado = document.getElementById("lugarIngresado");
lugarIngresado.addEventListener("click", () => {
    if(nombreIngresado === "" || categoriaIngresada === "" || calleIngresada === "" || descripcionIngresada === "" || imagenIngresada === undefined){
        Swal.fire({
            html: "Debe completar todos los campos requeridos.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "red",
            showCancelButton: true,
        })
    } if (lugares.find(ingresado => ingresado.nombre === nombreIngresado)) {
        Swal.fire({
            html: "El lugar que esta intentando cargar ya existe.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "red",
            showCancelButton: true,
        })
    }
    else {
        agregarLugar();
        Swal.fire({
            html: `Se ha agregado correctamente a ${nombreIngresado.value} en la Plataforma.`,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "blue",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../index.html";
            };
        });
    };
});

// Función

function agregarLugar() {
    if (alturaIngresada.value === "") { alturaIngresada = "S/N"; };
    const direccionIngresada = `${calleIngresada.value} N° ${alturaIngresada.value}`;
    let lugar = new Lugar(nombreIngresado.value, categoriaIngresada.value, direccionIngresada, descripcionIngresada.value, imagenIngresada.value);
    lugares.push(lugar);
    localStorage.setItem
}
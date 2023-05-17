/* LUGARES */

// Class Lugares

class Lugar {
    constructor(nombre, categoria, direccion, accesibilidad, imagen) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.direccion = direccion;
        this.accesibilidad = accesibilidad;
        this.imagen = imagen;
    }
};

// Lugares

const lugares = [
    {
        nombre: "Restaurante El Sabor Argentino",
        categoria: "Restaurante",
        direccion: "Av. Corrientes 123, Buenos Aires",
        accesibilidad: "El restaurante cuenta con rampas de acceso, puertas amplias y baños adaptados. Ofrece una variedad de platos típicos argentinos, como asado y empanadas."
    },
    {
        nombre: "Escuela Primaria La Esperanza",
        categoria: "Educación",
        direccion: "Calle Rivadavia 456, Buenos Aires",
        accesibilidad: "La escuela cuenta con rampas de acceso, ascensores y aulas adaptadas. Ofrece educación inclusiva y programas de apoyo para estudiantes con discapacidad."
    },
    {
        nombre: "Hotel Gran Buenos Aires",
        categoria: "Hotel",
        direccion: "Avenida 9 de Julio 789, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El hotel cuenta con habitaciones adaptadas, ascensores espaciosos y personal capacitado para asistir a personas con discapacidad. Ofrece servicios de lujo y comodidad para los huéspedes."
    },
    {
        nombre: "Museo de Arte Contemporáneo",
        categoria: "Museo",
        direccion: "Avenida Figueroa Alcorta 234, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El museo cuenta con entradas sin barreras, ascensores, baños adaptados y señalización inclusiva. Exhibe una amplia colección de arte contemporáneo de renombrados artistas argentinos e internacionales."
    },
    {
        nombre: "Oficina de Gobierno Central",
        categoria: "Oficina",
        direccion: "Calle Balcarce 1010, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. La oficina cuenta con rampas de acceso, puertas automáticas y espacios de trabajo adaptados. Proporciona servicios gubernamentales esenciales a los ciudadanos de manera inclusiva."
    },
    {
        nombre: "Plaza de Mayo",
        categoria: "Plaza",
        direccion: "Av. Rivadavia y Bolívar, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. La plaza cuenta con rampas de acceso, senderos accesibles y bancos adaptados. Es un lugar histórico y emblemático de Buenos Aires, conocido por sus manifestaciones y eventos culturales."
    },
    {
        nombre: "Teatro Colón",
        categoria: "Teatro",
        direccion: "Calle Cerrito 628, Buenos Aires",
        accesibilidad: "-"
    },
    {
        nombre: "Cafetería La Esquina",
        categoria: "Cafetería",
        direccion: "Calle Armenia 345, Buenos Aires",
        accesibilidad: "-"
    },
    {
        nombre: "Librería El Sabio",
        categoria: "Librería",
        direccion: "Av. Santa Fe 789, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. La librería cuenta con rampas de acceso, estanterías a una altura adecuada y personal dispuesto a brindar asistencia. Ofrece una amplia selección de libros en diferentes géneros."
    },
    {
        nombre: "Centro Cultural La Morada",
        categoria: "Centro Cultural",
        direccion: "Calle Honduras 234, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El centro cultural cuenta con entradas sin barreras, ascensores y baños adaptados. Ofrece una variedad de eventos culturales, como exposiciones, conciertos y talleres."
    },
    {
        nombre: "Cine Estrella",
        categoria: "Cine",
        direccion: "Av. Corrientes 1010, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El cine cuenta con espacios reservados para sillas de ruedas, sistemas de audio descriptivo y subtítulos para personas con discapacidad auditiva. Proyecta una amplia selección de películas de diferentes géneros."
    },
    {
        nombre: "Gimnasio Activo",
        categoria: "Gimnasio",
        direccion: "Calle Callao 456, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El gimnasio cuenta con rampas de acceso, máquinas adaptadas y personal capacitado para asistir a personas con discapacidad. Ofrece una variedad de clases y equipos para mantenerse en forma."
    },
    {
        nombre: "Parque de las Rosas",
        categoria: "Parque",
        direccion: "Av. Sarmiento y Av. del Libertador, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El parque cuenta con senderos accesibles, áreas de descanso adaptadas y baños adaptados. Es un lugar ideal para disfrutar de la naturaleza, hacer ejercicio y pasar tiempo al aire libre."
    },
    {
        nombre: "Hospital San Lucas",
        categoria: "Hospital",
        direccion: "Av. Pueyrredón 789, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El hospital cuenta con rampas de acceso, pasillos amplios y ascensores adaptados. Brinda servicios médicos de calidad y atención especializada a personas con discapacidad."
    },
    {
        nombre: "Centro de Convenciones Palermo",
        categoria: "Centro de Convenciones",
        direccion: "Av. Cerviño 234, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El centro de convenciones cuenta con entradas sin barreras, salas adaptadas y servicios de apoyo para personas con discapacidad. Es un lugar ideal para conferencias, exposiciones y eventos corporativos."
    },
    {
        nombre: "Zoológico El Paraíso",
        categoria: "Zoológico",
        direccion: "Av. 9 de Julio 101",
        accesibilidad: "El zoológico cuenta con senderos accesibles, áreas con acceso a sillas de ruedas y baños adaptados. Ofrece una variedad de animales y actividades educativas.",
    },
    {
        nombre: "Museo de Historia Natural",
        categoria: "Museo",
        direccion: "Av. Rivadavia 2020, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El museo cuenta con rampas de acceso, ascensores y exhibiciones adaptadas. Ofrece una amplia colección de fósiles, animales y objetos históricos."
    },
    {
        nombre: "Oficina de Turismo",
        categoria: "Oficina",
        direccion: "Av. Florida 456, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. La oficina cuenta con rampas de acceso, mostradores adaptados y personal capacitado en atención inclusiva. Proporciona información y asistencia turística a visitantes."
    },
    {
        nombre: "Teatro Coliseo",
        categoria: "Teatro",
        direccion: "Av. Libertad 789, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. El teatro cuenta con espacios reservados para sillas de ruedas, servicios de audio descriptivo y baños adaptados. Presenta una variedad de obras de teatro, conciertos y espectáculos."
    },
    {
        nombre: "Biblioteca Nacional",
        categoria: "Biblioteca",
        direccion: "Agüero 2502, Buenos Aires",
        accesibilidad: "Accesible para personas con discapacidad. La biblioteca cuenta con rampas de acceso, espacios de lectura adaptados y materiales accesibles. Alberga una extensa colección de libros, documentos y recursos bibliográficos."
    },
];

/* CALIFICACIONES LUGARES */

// Class CalificacionLugar

class CalificacionLugar {
    constructor(usuario, lugar, calificacion, resena) {
        this.usuario = usuario;
        this.lugar = lugar;
        this.calificacion = calificacion;
        this.resena = resena;
    }
};

// Calificaciones lugares

const calificaciones = [
    {
        usuario: "juanperez76",
        lugar: "Restaurante El Sabor Argentino",
        calificacion: 4,
        resena: "Excelente comida y ambiente, pero podría mejorar la accesibilidad con más espacio entre las mesas.",
        fecha: new Date("2023-05-16T09:30:00")
    },
    {
        usuario: "marialopez23",
        lugar: "Restaurante El Sabor Argentino",
        calificacion: 5,
        resena: "Me encantó la comida y el servicio. Además, el lugar cuenta con accesibilidad para personas con discapacidad.",
        fecha: new Date("2023-05-15T14:45:00")
    },
    {
        usuario: "pedrogomez99",
        lugar: "Escuela Primaria La Esperanza",
        calificacion: 5,
        resena: "Una escuela ejemplar en términos de inclusión. Las instalaciones son totalmente accesibles y el personal es amable y comprometido.",
        fecha: new Date("2023-05-14T10:20:00")
    },
    {
        usuario: "lauramartinez",
        lugar: "Escuela Primaria La Esperanza",
        calificacion: 4,
        resena: "Buena experiencia en esta escuela. Sin embargo, sería beneficioso contar con más recursos para actividades extracurriculares inclusivas.",
        fecha: new Date("2023-05-16T11:05:00")
    },
    {
        usuario: "carloslopez",
        lugar: "Hotel Gran Buenos Aires",
        calificacion: 3,
        resena: "El hotel tiene habitaciones cómodas, pero la accesibilidad podría mejorarse en los baños y en algunos espacios comunes.",
        fecha: new Date("2023-05-13T16:55:00")
    },
    {
        usuario: "ana_rodriguez",
        lugar: "Hotel Gran Buenos Aires",
        calificacion: 4,
        resena: "El personal del hotel fue muy atento y servicial. Aunque hay algunas barreras de accesibilidad, en general, tuve una buena estadía.",
        fecha: new Date("2023-05-16T08:10:00")
    },
    {
        usuario: "julian_gonzalez",
        lugar: "Museo de Arte Contemporáneo",
        calificacion: 5,
        resena: "Increíble museo con una amplia variedad de obras. Además, está muy bien adaptado para personas con discapacidad.",
        fecha: new Date("2023-05-15T13:25:00")
    },
    {
        usuario: "sofia_martinez",
        lugar: "Museo de Arte Contemporáneo",
        calificacion: 4,
        resena: "El museo cuenta con obras fascinantes, aunque algunos espacios pueden resultar estrechos para personas con movilidad reducida.",
        fecha: new Date("2023-05-14T09:40:00")
    },
    {
        usuario: "juanperez76",
        lugar: "Oficina de Gobierno Central",
        calificacion: 4,
        resena: "El servicio en la oficina fue eficiente. Sin embargo, sería positivo contar con personal capacitado específicamente en atención a personas con discapacidad.",
        fecha: new Date("2023-05-16T09:15:00")
    },
    {
        usuario: "marialopez23",
        lugar: "Oficina de Gobierno Central",
        calificacion: 3,
        resena: "Me gustaría que la oficina tuviera una mejor señalización para orientar a personas con discapacidad visual.",
        fecha: new Date("2023-05-15T11:30:00")
    },
    {
        usuario: "pedrogomez99",
        lugar: "Plaza de Mayo",
        calificacion: 5,
        resena: "Un lugar icónico y accesible para todos. Me encanta visitar la plaza y disfrutar de su belleza y su historia.",
        fecha: new Date("2023-05-14T17:20:00")
    },
    {
        usuario: "lauramartinez",
        lugar: "Plaza de Mayo",
        calificacion: 4,
        resena: "Buena accesibilidad en la plaza, pero sería beneficioso contar con más áreas de descanso para personas con discapacidad.",
        fecha: new Date("2023-05-16T12:40:00")
    },

    {
        usuario: "carloslopez",
        lugar: "Edificio Público Libertad",
        calificacion: 4,
        resena: "El edificio tiene buenas instalaciones y accesibilidad para personas con discapacidad. Sin embargo, algunos ascensores requieren mantenimiento.",
        fecha: new Date("2023-05-13T14:50:00")
    },
    {
        usuario: "ana_rodriguez",
        lugar: "Edificio Público Libertad",
        calificacion: 5,
        resena: "Excelente accesibilidad en todo el edificio. El personal también es muy amable y atento.",
        fecha: new Date("2023-05-16T10:05:00")
    },
    {
        usuario: "julian_gonzalez",
        lugar: "Universidad Nacional",
        calificacion: 4,
        resena: "Buen ambiente académico y accesibilidad en la mayoría de las instalaciones. Algunos salones requieren mejoras en cuanto a espacio y mobiliario.",
        fecha: new Date("2023-05-15T12:30:00")
    },
    {
        usuario: "sofia_martinez",
        lugar: "Universidad Nacional",
        calificacion: 5,
        resena: "Una universidad inclusiva con docentes comprometidos. La accesibilidad en las aulas y espacios comunes es excelente.",
        fecha: new Date("2023-05-14T11:15:00")
    },
    {
        usuario: "juanperez76",
        lugar: "Parque Central",
        calificacion: 5,
        resena: "Hermoso parque con amplios caminos accesibles. Cuenta con áreas de descanso y servicios adaptados para personas con discapacidad.",
        fecha: new Date("2023-05-16T15:20:00")
    },
    {
        usuario: "marialopez23",
        lugar: "Parque Central",
        calificacion: 4,
        resena: "El parque es muy agradable y ofrece opciones de recreación inclusivas. Sería beneficioso contar con más señalización informativa.",
        fecha: new Date("2023-05-15T16:45:00")
    },
    {
        usuario: "pedrogomez99",
        lugar: "Teatro Principal",
        calificacion: 4,
        resena: "Buena accesibilidad en el teatro, pero sería positivo contar con más opciones de asientos adaptados para personas con discapacidad.",
        fecha: new Date("2023-05-14T18:10:00")
    },
    {
        usuario: "lauramartinez",
        lugar: "Teatro Principal",
        calificacion: 5,
        resena: "Excelentes producciones teatrales y accesibilidad para personas con discapacidad en todas las áreas del teatro.",
        fecha: new Date("2023-05-16T13:35:00")
    },
];

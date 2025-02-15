const MAX_PERMITIDO = 55;
const CANTIDAD_PERSONA_MESA = 10;
const arraySectores = ["el salón interior", "el patio delantero", "el sector V.I.P.", "cualquier sector"];
const arrayHorarios = [8, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 22];
let cantidad_persona_confirmada = 0; // variable global

// Función para obtener el nombre y apellido del cliente
// Y verifica que no sea vacio.
function obtenerNombre() {
    let nombre = ""; // variable local
    let apellido = ""; // variable local

    do {
        nombre = prompt("Ingrese su nombre:");
        apellido = prompt("Ingrese su apellido:");
        if (nombre.length == 0 || apellido.length == 0){
            alert("⚠️ El nombre o el apellido NO deben ser vacios.");
        }        
    } while (nombre.length == 0 || apellido.length == 0); 
    return apellido + " " + nombre; 
}

// Función que recibe como argumento el mensaje a mostrar en el momento de ingresar un dato. 
// Y verifica que el dato ingresado sea un tipo de dato numérico.
const obtenerNumero = (mensaje) => {
    let numero; // Definimos una variable local
    do {
        numero = parseFloat(prompt(mensaje));
        // Verificamos que la variable 'numero' tenga un valor númerico
        if(isNaN(numero) || numero < 1) {
            alert("⚠️Por favor, ingrese un número válido.");
        }
    } while(isNaN(numero));
    return numero; // Solo devolvemos un número válido
}

// Función para seleccionar un sector del restaurante
// Se verifica que el nro de sector sea correcto, es decir, dentro del rango entre 1 y 4
function seleccionarSector() {
    let sectorIngresado; // variable local
    do {
        alert("Sectores disponibles:\n" + arraySectores.map((sector, index) => `${index + 1}. ${sector}`).join("\n"));
        sectorIngresado = obtenerNumero("Ingrese el número del sector:");
        if (sectorIngresado < 1 || sectorIngresado > arraySectores.length) {
            alert("⚠️ Por favor, ingrese un número de sector válido.");
        }
    } while (sectorIngresado < 1 || sectorIngresado > arraySectores.length);
    return arraySectores[sectorIngresado - 1];
}

// Función para seleccionar un horario
function seleccionarHorario() {
    let horarioIngresado; // variable local
    do {
        alert("Seleccionar el horario deseado:\n" + arrayHorarios.map((horario, index) => `${index + 1}. ${horario}:00 hs`).join("\n"));
        horarioIngresado = obtenerNumero("Ingrese el número del horario:");
        if (horarioIngresado < 1 || horarioIngresado > arrayHorarios.length) {
            alert("⚠️ Por favor, ingrese un número de horario válido.");
        }
    } while (horarioIngresado < 1 || horarioIngresado > arrayHorarios.length);
    return arrayHorarios[horarioIngresado - 1];
}

// Función para validar la cantidad de personas
function validarCantidadPersonas() {
    let cantidadPersonas; // variable local
    do {
        cantidadPersonas = obtenerNumero("Ingrese la cantidad de personas:");
        if (cantidadPersonas > CANTIDAD_PERSONA_MESA) {
            alert(`⚠️ Lo sentimos, el límite por mesa es de ${CANTIDAD_PERSONA_MESA} personas.`);
        } 
    } while (cantidadPersonas > CANTIDAD_PERSONA_MESA || cantidadPersonas > MAX_PERMITIDO);
    return cantidadPersonas;
}

// Función principal que invocara a las otras funciones 
function iniciarReserva() {    
    const nombreCliente = obtenerNombre();
    const quiereReservar = confirm(`Bienvenido ${nombreCliente}!\n¿Desea realizar una reserva?`);

    if (quiereReservar) {
        const sector = seleccionarSector();
        const horario = seleccionarHorario();
        const cantidadPersonas = validarCantidadPersonas();

        // Confirmación de la reserva
        const confirmacion = confirm(`Dato de la reserva:\n
        Nombre: ${nombreCliente}\n
        Sector: ${sector}\n
        Horario: ${horario}:00 hs\n
        Cantidad de personas: ${cantidadPersonas}\n\n
        ¿Confirmar reserva?`);

        if (confirmacion) {
            alert("✅ Reserva confirmada. ¡Gracias por elegirnos!");
            cantidad_persona_confirmada += cantidadPersonas;
            console.log("Cantidad de personas que confirmaron la reserva:", cantidad_persona_confirmada);            
        } else {
            alert("❌ Reserva cancelada.");
        }
    } else {
        alert("🧑🏽‍🍳 Hasta la próxima!");
    }
}

// Iniciar el proceso de reserva del restaurante
// Si aun hay lugar disponible
if (cantidad_persona_confirmada <= MAX_PERMITIDO){
    iniciarReserva();
} else {
    alert(`⚠️ Lo sentimos, el límite total del restaurante es de ${MAX_PERMITIDO} personas.`);
}

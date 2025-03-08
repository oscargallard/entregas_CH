const MAX_PERMITIDO = 50; // Capacidad máxima del restaurante
const CANTIDAD_PERSONA_MESA = 10; // Máximo permitido por mesa
let totalPersonas = 0; // Variable para calcular el total de personas reservadas

// Función para cargar reservas desde localStorage
function cargarReservas() {
  const listaReservas = document.getElementById("lista-reservas");
  const reservationForm = document.getElementById("reservationForm");

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  listaReservas.innerHTML = ""; // Limpiar lista

  reservas.forEach((reserva, index) => {
    totalPersonas += reserva.personas; // Sumar las personas de cada reserva
    const li = document.createElement("li");
    li.textContent = `Reserva ${index + 1}: ${reserva.nombre} ${
      reserva.apellido
    }, ${reserva.personas} personas, ${reserva.sector}, ${
      reserva.horario
    }:00 hs`;
    listaReservas.appendChild(li);
  });

  // Mostrar mensaje si se alcanza la capacidad máxima del restaurante
  if (totalPersonas >= MAX_PERMITIDO) {
    document.getElementById("mensaje").textContent =
      "⚠️ El restaurante ha alcanzado su capacidad máxima.";
    reservationForm.style.display = "none"; // Deshabilitar el formulario
  } else {
    reservationForm.style.display = "block"; // Habilitar el formulario
  }
}

// Función para guardar una reserva en localStorage
function guardarReserva(reserva) {
  try {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
  } catch (error) {
    console.error("Error al guardar reserva:", error);
    document.getElementById("mensaje").textContent =
      "⚠️ Ocurrió un error al guardar la reserva.";
  }
}

// Manejador de envío del formulario
document
  .getElementById("reservationForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim();
    const apellido = document.getElementById("apellido")?.value.trim();
    const personas = parseInt(document.getElementById("personas")?.value);
    const sector = document.getElementById("sector")?.value;
    const horario = document.getElementById("horario")?.value;

    // Validar campos obligatorios
    if (!nombre || !apellido || isNaN(personas) || !sector || !horario) {
      document.getElementById("mensaje").textContent =
        "⚠️ Por favor, completa todos los campos.";
      return;
    }

    // Validar máximo permitido por mesa
    if (personas > CANTIDAD_PERSONA_MESA) {
      document.getElementById(
        "mensaje"
      ).textContent = `⚠️ Lo sentimos, el límite por mesa es de ${CANTIDAD_PERSONA_MESA} personas.`;
      return;
    }

    // Calcular el total de personas reservadas hasta ahora
    const reservasActuales = JSON.parse(localStorage.getItem("reservas")) || [];
    const totalPersonas = reservasActuales.reduce(
      (total, reserva) => total + reserva.personas,
      0
    );

    // Validar capacidad máxima del restaurante
    if (totalPersonas + personas > MAX_PERMITIDO) {
      document.getElementById(
        "mensaje"
      ).textContent = `⚠️ Lo sentimos, el restaurante solo tiene capacidad para ${
        MAX_PERMITIDO - totalPersonas
      } personas más.`;
      return;
    }

    // Crear objeto de reserva
    const nuevaReserva = {
      nombre,
      apellido,
      personas,
      sector,
      horario,
    };

    // Guardar la reserva y recargar la lista
    guardarReserva(nuevaReserva);
    cargarReservas();

    // Mostrar mensaje de éxito
    document.getElementById("mensaje").textContent =
      "✅ Reserva confirmada. ¡Gracias por elegirnos!";
    document.getElementById("reservationForm").reset(); // Limpiar el formulario
  });

// Llamar a cargarReservas()
cargarReservas();

var cuentas = [
    { nombre: "Jimena", email: "jimena@example.com", saldo: 200, password: "1234" },
    { nombre: "Santiago", email: "santiago@example.com", saldo: 290, password: "abcd" },
    { nombre: "Raul", email: "raul@example.com", saldo: 67, password: "5678" }
  ];
  
  var cuentaSeleccionada = null;
  
  // Función para iniciar sesión con validación por correo y contraseña
  function iniciarSesion() {
      var email = document.getElementById("emailInput").value;
      var password = document.getElementById("passwordInput").value;
      var errorMensaje = document.getElementById("loginError");
  
      cuentaSeleccionada = cuentas.find(cuenta => cuenta.email === email);
      if (!cuentaSeleccionada) {
        errorMensaje.innerText = "Correo no encontrado.";
    } else if (cuentaSeleccionada.password !== password) {
        errorMensaje.innerText = "Contraseña incorrecta. Intente de nuevo.";
    } else {
        errorMensaje.innerText = "";
        mostrarMenuOperaciones();
    }
}

// Función para mostrar el menú de operaciones cuando el usuario inicia sesión correctamente
function mostrarMenuOperaciones() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("menuSection").style.display = "block";
    // Mostrar los botones de operaciones
    document.getElementById("consultarSaldoBtn").style.display = "inline-block";
    document.getElementById("ingresarMontoBtn").style.display = "inline-block";
    document.getElementById("retirarMontoBtn").style.display = "inline-block";
}

// Función para mostrar el saldo
function mostrarSaldo() {
    var mensaje = document.getElementById("menuMessage");
    mensaje.innerText = (`Tu saldo actual es: $${cuentaSeleccionada.saldo}`);
}

// Función para mostrar la opción de ingresar dinero
function mostrarIngreso() {
    mostrarSeccionOperaciones("Ingresar Monto", ingresarMonto);
}
// Función para mostrar la opción de retirar dinero
function mostrarRetiro() {
    mostrarSeccionOperaciones("Retirar Monto", retirarMonto);
}

// Función reutilizable para mostrar la sección de operaciones
function mostrarSeccionOperaciones(accion, funcionConfirmar) {
    document.getElementById("menuSection").style.display = "none";
    document.getElementById("operacionesSection").style.display = "block";
    document.getElementById("confirmarOperacion").innerText = accion;
    document.getElementById("confirmarOperacion").onclick = funcionConfirmar;
}

// Función para ingresar dinero con validación de límite
function ingresarMonto() {
    var monto = Number(document.getElementById("montoInput").value);
    var mensaje = document.getElementById("operacionMensaje");
    if (monto <= 0 || (cuentaSeleccionada.saldo + monto) > 990) {
        mensaje.innerText = "Monto no válido. El saldo no puede exceder $990.";
    } else {
        cuentaSeleccionada.saldo += monto;
        mensaje.innerText = (`Has ingresado $${monto}. Tu nuevo saldo es: $${cuentaSeleccionada.saldo}.`);
    }

    limpiarYRegresarMenu();
}

// Función para retirar dinero con validación de saldo mínimo
function retirarMonto() {
    var monto = Number(document.getElementById("montoInput").value);
    var mensaje = document.getElementById("operacionMensaje");

    if (monto <= 0 || (cuentaSeleccionada.saldo - monto) < 10) {
        mensaje.innerText = "Monto no válido. El saldo no puede ser menor a $10.";
    } else {
        cuentaSeleccionada.saldo -= monto;
        mensaje.innerText = (`Has retirado $${monto}. Tu nuevo saldo es: $${cuentaSeleccionada.saldo}.`);
    }

    limpiarYRegresarMenu();
}

// Función para limpiar la entrada de monto y regresar al menú principal
function limpiarYRegresarMenu() {
    document.getElementById("montoInput").value = "";
    document.getElementById("operacionesSection").style.display = "none";
    document.getElementById("menuSection").style.display = "block";
}
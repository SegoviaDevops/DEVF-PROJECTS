var cuentas = [
    { nombre: "Jimena", saldo: 200, password: "1234" },
    { nombre: "Santiago", saldo: 290, password: "abcd" },
    { nombre: "Raul", saldo: 67, password: "5678" }
  ];
  
  var cuentaSeleccionada = null;
  
  // Función para iniciar sesión
  function iniciarSesion() {
      var seleccion = document.getElementById("cuentaSeleccionada").value;
      var password = document.getElementById("passwordInput").value;
      var errorMensaje = document.getElementById("loginError");
  
      cuentaSeleccionada = cuentas[seleccion];
  
      if (cuentaSeleccionada.password === password) {
          errorMensaje.innerText = "";
          document.getElementById("loginSection").style.display = "none";
          document.getElementById("menuSection").style.display = "block";
      } else {
          errorMensaje.innerText = "Contraseña incorrecta. Intente de nuevo.";
      }
  }
  // Función para mostrar el saldo
function mostrarSaldo() {
    var mensaje = document.getElementById("menuMessage");
    mensaje.innerText = (`Tu saldo actual es: $${cuentaSeleccionada.saldo}`);
}

// Función para mostrar el ingreso de dinero
function mostrarIngreso() {
    mostrarSeccionOperaciones("Ingresar Monto", ingresarMonto);
}

// Función para mostrar el retiro de dinero
function mostrarRetiro() {
    mostrarSeccionOperaciones("Retirar Monto", retirarMonto);
}
// Mostrar la sección de ingreso/retiro con el botón correcto
function mostrarSeccionOperaciones(accion, funcionConfirmar) {
    document.getElementById("menuSection").style.display = "none";
    document.getElementById("operacionesSection").style.display = "block";
    document.getElementById("confirmarOperacion").innerText = accion;
    document.getElementById("confirmarOperacion").onclick = funcionConfirmar;
}

// Función para ingresar dinero
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

// Función para retirar dinero
function retirarMonto() {
    var monto = Number(document.getElementById("montoInput").value);
    var mensaje = document.getElementById("operacionMensaje");

    if (monto <= 0 || (cuentaSeleccionada.saldo - monto) < 10) {
        mensaje.innerText = "Monto no válido. El saldo no puede ser menor a $10.";
    } else {(`Has retirado $${monto}. Tu nuevo saldo es: $${cuentaSeleccionada.saldo}.`);
    }
    limpiarYRegresarMenu();
}

// Función para limpiar la entrada de monto y regresar al menú principal
function limpiarYRegresarMenu() {
    document.getElementById("montoInput").value = "";
    document.getElementById("operacionesSection").style.display = "none";
    document.getElementById("menuSection").style.display = "block";
}
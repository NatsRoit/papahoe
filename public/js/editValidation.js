window.onload = function(){

//para ubicar el cursor en el campo nombre de una
let formulario = document.querySelector(".formulario");
formulario.nombre.focus();

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  let errors = [];

  let nombre = document.querySelector("#nombre");
  let apellido = document.querySelector("#apellido");
  let usuario = document.querySelector("#usuario");
  let email = document.querySelector("#email");
  let province = document.querySelector("#province");
  let country = document.querySelector("#country");
  let direccion = document.querySelector("#direccion");
  let localidad = document.querySelector("#localidad");
  let codigoPostal = document.querySelector("#codigoPostal");
  let telefono = document.querySelector("#telefono");
  let imagen = document.querySelector('#avatar')

  //VALIDACION NOMBRE
  if (nombre.value == "" || nombre.value.length < 3) {
    errors.push(
      "El campo Nombre no puede estar vacío y debe tener más de dos caracteres"
    );
    nombre.classList.add("is-invalid");
  } else {
    nombre.classList.add("form-input");
    nombre.classList.remove("is-invalid");
  }

  //VALIDACION APELLIDO
  if (apellido.value == "" || apellido.value.length < 2) {
    errors.push("El campo Nombre no puede estar vacío y debe tener más de dos caracteres");
    apellido.classList.add("is-invalid");
  } else {
    apellido.classList.add("form-input");
    apellido.classList.remove("is-invalid");
  }

  //VALIDACION USUARIO
  if (usuario.value == "" || usuario.value.length < 2) {
    errors.push("El campo Usuario no puede estar vacío y debe tener más de dos caracteres");
    usuario.classList.add("is-invalid");
  } else {
    usuario.classList.add("form-input");
    usuario.classList.remove("is-invalid");
  }

  //VALIDACION EMAIL

   if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    email.classList.add("is-invalid");
    errors.push("El email tiene que ser válido");
  } else {
    
    email.classList.add("form-input");
    email.classList.remove("is-invalid");
  }

 

  //VALIDACION PROVINCE
  if (province.value == "") {
    errors.push("El campo Provincia no puede estar vacío");
    province.classList.add("is-invalid");
  } else {
    province.classList.add("form-input");
    province.classList.remove("is-invalid");
  }

  //VALIDACION COUNTRY
  if (country.value == "") {
    errors.push("El campo País no puede estar vacío");
    country.classList.add("is-invalid");
  } else {
    country.classList.add("form-input");
    country.classList.remove("is-invalid");
  }

  //VALIDACION DIRECCION
  if (direccion.value == "") {
    errors.push("El campo Dirección no puede estar vacío");
    direccion.classList.add("is-invalid");
  } else {
    direccion.classList.add("form-input");
    direccion.classList.remove("is-invalid");
  }

  //VALIDACION LOCALIDAD
  if (localidad.value == "") {
    errors.push("El campo localidad no puede estar vacío");
    localidad.classList.add("is-invalid");
  } else {
    localidad.classList.add("form-input");
    localidad.classList.remove("is-invalid");
  }

  //VALIDACION CP
  if (codigoPostal.value == "") {
    errors.push("El campo Código Postal no puede estar vacío");
    codigoPostal.classList.add("is-invalid");
  } else {
    codigoPostal.classList.add("form-input");
    codigoPostal.classList.remove("is-invalid");
  }

  //VALIDACION TELEFONO
  if (telefono.value == "") {
    errors.push("El campo Teléfono no puede estar vacío");
    telefono.classList.add("is-invalid");
  } else {
    telefono.classList.add("form-input");
    telefono.classList.remove("is-invalid");
  }

  //VALIDACION IMAGEN
  
    if(imagen.files > 0){
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif|.svg|.tiff|.webp)$/i;    
    if(!allowedExtensions.exec(imagen.value) ){        
        errors.push('Las extensiones permitidas son .jpeg/.jpg/.png/.gif/.svg/.tiff/.webp');      
        imagen.classList.add("is-invalid");
    }
    
    else{
      imagen.classList.add("form-input");
      imagen.classList.remove("is-invalid");
    }
  }
  else {
    
    imagen.classList.remove("invalid-input");
    imagen.classList.add("valid-input");
    imagen.valid = true;
  }

  
   
  // ERRORES
  let ulErrors = document.querySelector(".errores");

  // ulErrors.innerHTML = '';
  if (errors.length > 0) {
    //e.preventDefault();

    ulErrors.innerHTML = "";
    for (let i = 0; i < errors.length; i++) {
      ulErrors.innerHTML += `<li > ${errors[i]} </li> `;
    }
    Swal.fire({
        icon: 'error',
        title: 'No surfeaste la ola!',
        text: 'Revisa los campos!',
       // footer: '<a href="">Why do I have this issue?</a>'
      })
  } else {
    ulErrors.innerHTML = "";
    Swal.fire({
      icon: "success",
      title: "Edición correcta",
      showConfirmButton: false,
      timer: 1000,
      
    });

    formulario.submit();
    // NECESITAMOS DIRIGIR A LA API DE USERSconst fetchResponse = await fetch()
  }
});
}
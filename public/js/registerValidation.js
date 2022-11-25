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
  let password = document.querySelector("#password");
  let confirmPassword = document.querySelector("#confirm_password");
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

  //VALIDACION PASSWORD
  if (password.value == "" || password.value.length < 8) {
    errors.push("El campo Password no puede estar vacío y tiene que tener al menos 8 caracteres");
    password.classList.add("is-invalid");
  } else {
    password.classList.add("form-input");
    password.classList.remove("is-invalid");
  }

  //VALIDACION CONFIRMPASSWORD
  if (confirmPassword.value == "") {
    errors.push("Tenés que cofirmar tu password");
    confirmPassword.classList.add("is-invalid");
  } else if (password.value != confirmPassword.value) {
    errors.push("Las contraseñas deben ser iguales");
    confirmPassword.classList.add("is-invalid");
  } else {
    confirmPassword.classList.add("form-input");
    confirmPassword.classList.remove("is-invalid");
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
      title: "Te has registrado correctamente",
      showConfirmButton: false,
      timer: 1000,
      
    });

    formulario.submit();
    // NECESITAMOS DIRIGIR A LA API DE USERSconst fetchResponse = await fetch()
  }
});
}

/*window.onload = function(){
  
  let nombre = document.querySelector("#nombre");
  let apellido = document.querySelector("#apellido");
  let usuario = document.querySelector("#usuario");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let confirmPassword = document.querySelector("#confirm_password");
  let province = document.querySelector("#province");
  let country = document.querySelector("#country");
  let direccion = document.querySelector("#direccion");
  let localidad = document.querySelector("#localidad");
  let codigoPostal = document.querySelector("#codigoPostal");
  let telefono = document.querySelector("#telefono");
  let imagen = document.querySelector('#avatar')


  //para ubicar el cursor en el campo nombre de una
  let formulario = document.querySelector(".formulario");
  formulario.nombre.focus();
  
    //VALIDACION NOMBRE
    nombre.valid = false;
    nombre.addEventListener("focus", function () {
      nombre.classList.remove("invalid-input");
      nombre.classList.remove("valid-input");
    })

    nombre.addEventListener("blur", function () {
      if (nombre.value == "") {
        nombre.previousElementSibling.innerHTML = "El campo Nombre no puede estar vacío!";
        nombre.classList.add("invalid-input");
      } else if (nombre.value.length < 2) {
        nombre.previousElementSibling.innerHTML = "Debe tener al menos 2 caracteres";
        nombre.classList.remove("valid-input");
        nombre.classList.add("invalid-input");
      } else {
        nombre.previousElementSibling.innerHTML = "";
        nombre.classList.remove("invalid-input");
        nombre.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + nombre.value + "</h2>"
        nombre.valid = true;
      }
    });


    //VALIDACION APELLIDO
    apellido.valid = false;
    apellido.addEventListener("focus", function () {
      apellido.classList.remove("invalid-input");
      apellido.classList.remove("valid-input");
      
    })

    apellido.addEventListener("blur", function () {
      if (apellido.value == "") {
        apellido.previousElementSibling.innerHTML = "El campo Apellido no puede estar vacío!";
        apellido.classList.add("invalid-input");
      } else if (apellido.value.length < 2) {
        apellido.previousElementSibling.innerHTML = "Debe tener al menos 2 caracteres";
        apellido.classList.remove("valid-input");
        apellido.classList.add("invalid-input");
      } else {
        apellido.previousElementSibling.innerHTML = "";
        apellido.classList.remove("invalid-input");
        apellido.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + apellido.value + "</h2>"
        apellido.valid = true;
      }
    });
  
    //VALIDACION USUARIO
    usuario.valid = false;
    usuario.addEventListener("focus", function () {
      usuario.classList.remove("invalid-input");
      usuario.classList.remove("valid-input");
      
    })
    usuario.addEventListener("blur", function () {
      if (usuario.value == "") {
        usuario.previousElementSibling.innerHTML = "El campo Usuario no puede estar vacío";
        usuario.classList.add("invalid-input");
      } else if (usuario.value.length < 2) {
        usuario.previousElementSibling.innerHTML = "Debe tener al menos 2 caracteres";
        usuario.classList.remove("valid-input");
        usuario.classList.add("invalid-input");

      } else {
        usuario.previousElementSibling.innerHTML = "";
        usuario.classList.remove("invalid-input");
        usuario.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + usuario.value + "</h2>"
        usuario.valid = true;
      }
    });
  
    //VALIDACION EMAIL
    email.valid = false;
    email.addEventListener("focus", function () {
      email.classList.remove("invalid-input");
      email.classList.remove("valid-input");     
    })

    email.addEventListener("blur", function () {
      if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        email.previousElementSibling.innerHTML = "Debes indicar un email valido!";
        email.classList.add("invalid-input");
      } else if (email.value.length < 3) {
        email.previousElementSibling.innerHTML = "El campo Email no puede estar vacío";
        email.classList.remove("valid-input");
        email.classList.add("invalid-input");
      } else {
        email.previousElementSibling.innerHTML = "";
        email.classList.remove("invalid-input");
        email.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + email.value + "</h2>"
        email.valid = true;
      }
    });
  
    if(password != null){
      //VALIDACION PASSWORD
      password.valid = false;
      password.addEventListener("focus", function () {
        password.classList.remove("invalid-input");
        password.classList.remove("valid-input");     
      })

      password.addEventListener("blur", function () {
        if (password.value == "") {
          password.previousElementSibling.innerHTML = "El campo Contraseña no puede estar vacío!";
          password.classList.add("invalid-input");
        } else if (password.value.length < 8) {
          password.previousElementSibling.innerHTML = "Debe tener al menos 8 caracteres";
          password.classList.remove("valid-input");
          password.classList.add("invalid-input");
        } else {
          password.previousElementSibling.innerHTML = "";
          password.classList.remove("invalid-input");
          password.classList.add("valid-input");
          // namePreview.innerHTML = "<h2>" + password.value + "</h2>"
          password.valid = true;
        }
      });
    }
    if(confirmPassword != null){
      //VALIDACION CONFIRMPASSWORD
      confirmPassword.valid = false;
      confirmPassword.addEventListener("focus", function () {
        confirmPassword.classList.remove("invalid-input");
        confirmPassword.classList.remove("valid-input");     
      })

      confirmPassword.addEventListener("blur", function () {
        if (confirmPassword.value !== password.value) {
          confirmPassword.previousElementSibling.innerHTML = "Confirma tu Contraseña";
          confirmPassword.classList.remove("valid-input");
          confirmPassword.classList.add("invalid-input");
        } else {
          confirmPassword.previousElementSibling.innerHTML = "";
          confirmPassword.classList.remove("invalid-input");
          confirmPassword.classList.add("valid-input");
          // namePreview.innerHTML = "<h2>" + confirmPassword.value + "</h2>"
          confirmPassword.valid = true;
        }
      });
    }

    //VALIDACION PROVINCE
    province.valid = false;
    province.addEventListener("focus", function () {
      province.classList.remove("invalid-input");
      province.classList.remove("valid-input");
      
    })

    province.addEventListener("blur", function () {
      if (province.value == "") {
        province.previousElementSibling.innerHTML = "El campo Provincia no puede estar vacío!";
        province.classList.add("invalid-input");
      } else {
        province.previousElementSibling.innerHTML = "";
        province.classList.remove("invalid-input");
        province.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + province.value + "</h2>"
        province.valid = true;
      }
    });
  
    //VALIDACION COUNTRY
    country.valid = false;
    country.addEventListener("focus", function () {
      country.classList.remove("invalid-input");
      country.classList.remove("valid-input");
      
    })

    country.addEventListener("blur", function () {
      if (country.value == "") {
        country.previousElementSibling.innerHTML = "El campo Pais no puede estar vacío!";
        country.classList.add("invalid-input");
      } else {
        country.previousElementSibling.innerHTML = "";
        country.classList.remove("invalid-input");
        country.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + country.value + "</h2>"
        country.valid = true;
      }
    });
  
    //VALIDACION DIRECCION
    direccion.valid = false;
    direccion.addEventListener("focus", function () {
      direccion.classList.remove("invalid-input");
      direccion.classList.remove("valid-input");
      
    })

    direccion.addEventListener("blur", function () {
      if (direccion.value == "") {
        direccion.previousElementSibling.innerHTML = "El campo Direccion no puede estar vacío!";
        direccion.classList.add("invalid-input");
      } else {
        direccion.previousElementSibling.innerHTML = "";
        direccion.classList.remove("invalid-input");
        direccion.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + direccion.value + "</h2>"
        direccion.valid = true;
      }
    });
  
    //VALIDACION LOCALIDAD
    localidad.valid = false;
    localidad.addEventListener("focus", function () {
      localidad.classList.remove("invalid-input");
      localidad.classList.remove("valid-input");
      
    })

    localidad.addEventListener("blur", function () {
      if (localidad.value == "") {
        localidad.previousElementSibling.innerHTML = "El compa Localidad no puede estar vacío!";
        localidad.classList.add("invalid-input");
      } else {
        localidad.previousElementSibling.innerHTML = "";
        localidad.classList.remove("invalid-input");
        localidad.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + localidad.value + "</h2>"
        localidad.valid = true;
      }
    });
    //VALIDACION CP
    codigoPostal.valid = false;
    codigoPostal.addEventListener("focus", function () {
      codigoPostal.classList.remove("invalid-input");
      codigoPostal.classList.remove("valid-input");      
    })

    codigoPostal.addEventListener("blur", function () {
      if (codigoPostal.value == "") {
        codigoPostal.previousElementSibling.innerHTML = "El campo Codigo Postal no puede estar vacío!";
        codigoPostal.classList.add("invalid-input");
      } else {
        codigoPostal.previousElementSibling.innerHTML = "";
        codigoPostal.classList.remove("invalid-input");
        codigoPostal.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + codigoPostal.value + "</h2>"
        codigoPostal.valid = true;
      }
    });
    

    //VALIDACION TELEFONO
    telefono.valid = false;
    telefono.addEventListener("focus", function () {
      telefono.classList.remove("invalid-input");
      telefono.classList.remove("valid-input");     
    })

    telefono.addEventListener("blur", function () {
      if (telefono.value == "") {
        telefono.previousElementSibling.innerHTML = "El campo Teléfono no puede estar vacío!";
        telefono.classList.add("invalid-input");
      } else if (telefono.value.length < 3) {
        telefono.previousElementSibling.innerHTML = "El telefono debe tener mas de 3 caracteres";
        telefono.classList.remove("valid-input");
        telefono.classList.add("invalid-input");
      } else {
        telefono.previousElementSibling.innerHTML = "";
        telefono.classList.remove("invalid-input");
        telefono.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + telefono.value + "</h2>"
        telefono.valid = true;
      }
    });
    
    if(imagen.files > 0){
      //VALIDACION IMAGEN              
      imagen.valid = false;
      imagen.addEventListener("focus", function () {
        imagen.classList.remove("invalid-input");
        imagen.classList.remove("valid-input");
        
      })
      var allowedExtensions = /(.jpg|.jpeg|.png|.gif|.svg|.tiff|.webp)$/i; 
      imagen.addEventListener("blur", function () {
        if(!allowedExtensions.exec(imagen.value) ){{
          imagen.previousElementSibling.innerHTML = "Solo se permiten extensiones .jpg .jpeg .png .gif .svg .tiff .webp";
          imagen.classList.add("invalid-input");
        } 
        } else {
          imagen.previousElementSibling.innerHTML = "";
          imagen.classList.remove("invalid-input");
          imagen.classList.add("valid-input");
          // namePreview.innerHTML = "<h2>" + imagen.value + "</h2>"
          imagen.valid = true;
        }
      });
    }

     
    // ERRORES
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      let formularioElements = document.querySelector(".formulario").elements;
      let isInvalid = [];
        for (let i = 0; i < formularioElements.length; i++) {
          let formularioField = formularioElements[i]
          if (formularioField.hasOwnProperty("valid") && !formularioField.valid) {
            isInvalid.push(formularioField);
            formularioField.classList.add("invalid-input");
          }
        };
      //  console.log(isInvalid)
        if (isInvalid.length > 0) {
          for (let i = isInvalid.length -1; i >= 0; i--) {
            // window.scrollTo({top:0, behavior:'smooth'});
            isInvalid[i].focus();
          }              
        } else {
          formulario.submit();          
        }
    });
  }*/
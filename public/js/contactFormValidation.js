window.onload = function(){
  
    let email = document.querySelector("#email");
    let mensaje = document.querySelector("#mensaje");
     
    //para ubicar el cursor en el campo email
    let formulario = document.querySelector(".formulario");
    formulario.email.focus();
    
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
    
      //VALIDACION TEXT-AREA
      mensaje.valid = false;
      mensaje.addEventListener("focus", function () {
        mensaje.classList.remove("invalid-input");
        mensaje.classList.remove("valid-input");
        
      })
  
      mensaje.addEventListener("blur", function () {
        if (mensaje.value == "") {
          mensaje.previousElementSibling.innerHTML = "Dejanos tu mensaje!";
          mensaje.classList.add("invalid-input");
        } else {
          mensaje.previousElementSibling.innerHTML = "";
          mensaje.classList.remove("invalid-input");
          mensaje.classList.add("valid-input");
          // namePreview.innerHTML = "<h2>" + mensaje.value + "</h2>"
          mensaje.valid = true;
        }
      });
                
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
          if (isInvalid.length > 0) {
            for (let i = isInvalid.length -1; i >= 0; i--) {
              // window.scrollTo({top:0, behavior:'smooth'});
              isInvalid[i].focus();
            }              
         
                    
          }formulario.submit();  
      });
    }
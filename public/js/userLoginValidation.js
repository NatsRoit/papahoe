window.addEventListener("load", function () {
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let eye = document.querySelector("#pass-eye");
  let oops = document.querySelector(".auth-error-message");

    let emailReg = /^(\w|\.|-)+?@(\w|-)+?\.\w{2,4}($|\.\w{2,4})$/gim;
    let passwordReg = /{8,50}$/; // 8 caracteres: Al menos 1 MAY o 1 min, y 1 número 0 un caracter especial

    let form = document.querySelector("form");
    // form.email.focus();

// VALIDACIÓN EMAIL
email.valid = false;
email.addEventListener("focus", function () {
  let errMsg = this.parentElement.parentElement.querySelector("#errMsg");
    email.classList.remove("invalid-input");
    email.classList.remove("valid-input");
    errMsg.innerHTML = "";
});

email.addEventListener("blur", function () {
let errMsg = this.parentElement.querySelector("#errMsg");
   // console.log(email.value.match(emailReg))
    if (email.value == "") {
        errMsg.innerHTML = "Tenés que proporcionar un email";
        email.classList.add("invalid-input");
    } else if (!email.value.match(emailReg)) {
        errMsg.innerHTML = "Parece que ese email no es válido";
        email.classList.remove("valid-input");
        email.classList.add("invalid-input");
    } else {
        errMsg.innerHTML = "";
        email.classList.remove("invalid-input");
        email.classList.add("valid-input");
        email.valid = true;
        email.value = email.value + " ";
    }
});

// VALIDACIÓN PASSWORD
password.valid = false;
password.addEventListener("focus", function () {
  let errMsg = this.parentElement.parentElement.querySelector("#errMsg");
    password.classList.remove("invalid-input");
    password.classList.remove("valid-input");
    errMsg.innerHTML = "";
    eye.classList.remove("hidden")
    eye.style.right = "0.85rem";
});

password.addEventListener("blur", function () {
let errMsg = this.parentElement.parentElement.querySelector("#errMsg");
    if (password.value == "") {
      errMsg.innerHTML = "Tenés que proporcionar una contraseña";
      password.classList.add("invalid-input");
    }
    else if (password.value.length < 8) {
      errMsg.innerHTML = "Recordá que la contraseña tiene al menos 8 caracteres";
      password.classList.add("invalid-input");
    // else if (!password.value.match(passwordReg)) {
    //     errMsg.innerHTML = "Parece que esa contraseña no es válida";
    //     password.classList.remove("valid-input");
    //     password.classList.add("invalid-input");
    }
  });
    password.addEventListener("input", function () {
      let errMsg = this.parentElement.parentElement.querySelector("#errMsg");
      if (!password.value == "") {
          errMsg.innerHTML = "";
          password.classList.remove("invalid-input");
          password.classList.add("valid-input");
          password.style.backgroundImage = "none";
          password.valid = true;
      }
});

// PASSWORD VISIBILITY
eye.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        eye.style.opacity = "100%"
    } else {  
        password.type = "password";
        eye.style.opacity = "40%"
    }
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formElements = document.querySelector("#formulario").elements;
    let isInvalid = [];
    for (let i = 0; i < formElements.length; i++) {
      let formField = formElements[i]
      if (formField.hasOwnProperty("valid") && !formField.valid) {
        isInvalid.push(formField);
       // console.log("hay campos con propiedad invalid")
          formField.classList.add("invalid-input");
      }
    };
    if (isInvalid.length > 0) {
     //   console.log("HAY hay campos con propiedad invalid???")
     //   console.log(isInvalid)
        for (let i = isInvalid.length -1; i >= 0; i--) {
          isInvalid[i].focus();
          oops.classList.remove("hidden")
        }
      } else {
        form.submit();
      }
  });
  
});

window.onload = function () {
    //CAPTURO TODOS LOS CAMPOS DEL FORMULARIO
    let prodName = document.querySelector("#nombreProd");
    let prodCategory = document.querySelector("#category_id");
    let prodSubcategory = document.querySelector("#subcategory_id");
    let prodBrand = document.querySelector("#brand_id");
    let prodPrice = document.querySelector("#price");
    let prodStock = document.querySelector("#stock");
    //checkbox!!!! Para if (is discounted)--------------
    let prodDiscount = document.querySelector("#isDiscounted");
    let discountValue = document.querySelector("#discount");
    // -------------------------------------------------
    let prodDescription = document.querySelector("#description");
    let prodFeatures = document.querySelector("#features");
    let prodImageAll = document.querySelectorAll(".prodImg");
    let prodImage1 = document.querySelector("#image1");
    let prodImage2 = document.querySelector("#imageGallery1");
    let prodImage3 = document.querySelector("#imageGallery2");
    let prodImage4 = document.querySelector("#imageGallery3");
    let prodImage5 = document.querySelector("#imageGallery4");
    let prodFins = document.querySelector("#fin_id");
    prodFins.disabled = true;
    let previewProdImg = document.querySelector("#previewProdImg");  
  
    // Los que no sé cómo resolver
    let prodColor = document.querySelector("#color_id");
    let prodTalle = document.querySelector("#talle");
    let sizeGroup = document.querySelector("#sizeGroup");
    let volGroup = document.querySelector("#volGroup");
  
    let namePreview = document.querySelector("#namePreview")
    let brandPreview = document.querySelector("#brandPreview")
    let priceCurrency = document.querySelector("#priceCurrency");
  
    //-------------------------------------------------------
  
    let form = document.querySelector(".formulario");
    prodName.focus();
  
  
    //VALIDACIONES IN-LINE (muestra mensajes de error antes de llegar al submit)
    //VALIDACIÓN NOMBRE PRODUCTO
    prodName.valid = false;
    prodName.addEventListener("focus", function () {
      prodName.classList.remove("invalid-input");
      prodName.classList.remove("valid-input");
      // prodName.previousElementSibling.innerHTML = "";
    })
  
    prodName.addEventListener("blur", function () {
      if (prodName.value == "") {
        prodName.previousElementSibling.innerHTML = "No te olvides de dar un nombre al producto!";
        prodName.classList.add("invalid-input");
      } else if (prodName.value.length < 5 || prodName.value.length > 25) {
        prodName.previousElementSibling.innerHTML = "El nombre debe tener entre 5 y 25 caracteres";
        prodName.classList.remove("valid-input");
        prodName.classList.add("invalid-input");
      } else {
        prodName.previousElementSibling.innerHTML = "";
        prodName.classList.remove("invalid-input");
        prodName.classList.add("valid-input");
        // namePreview.innerHTML = "<h2>" + prodName.value + "</h2>"
        prodName.valid = true;
      }
    });
  
    //VALIDACION CATEGORÍA PRODUCTO
    prodCategory.valid = false;
    prodCategory.addEventListener("focus", function () {
      prodCategory.classList.remove("invalid-input");
      prodCategory.classList.remove("valid-input");
      // prodCategory.previousElementSibling.innerHTML = "";
    });
  
    prodCategory.addEventListener("blur", function () {
      if (prodCategory.value == "") {
        prodCategory.previousElementSibling.innerHTML = "Seleccioná una categoría";
        prodCategory.classList.add("invalid-input");
      } else {
        prodCategory.previousElementSibling.innerHTML = "";
        prodCategory.classList.remove("invalid-input");
        prodCategory.classList.add("valid-input");
        prodCategory.valid = true;
      }
    });
  
    // Cuando tengamos la API, esta función desaparecerá...
    // Por ahora sirve para "popular" el menú SUBCATEGORÍA, de acuerdo a la CATEGORÍA elegida.
    prodCategory.addEventListener("change", function () {
      prodSubcategory.innerHTML = "";
      if (prodCategory.value == "1") {
        var optionArray = [ "|Subcategoría", "1|Shortboards", "2|Mid-Boards", "3|Longboards" ];
      } else if (prodCategory.value == "2") {
        var optionArray = ["|Subcategoría", "4|Fins", "5|Leg Ropes", "6|Tractions"];
      } else if (prodCategory.value == "3") {
        var optionArray = ["|Subcategoría", "7|Apparel", "8|Bags & Packs"];
      } else if (prodCategory.value == "4") {
        var optionArray = ["|Subcategoría", "9|Custom Board"];
      }
      for (let option in optionArray) {
        let clave_valor = optionArray[option].split("|");
        let newOption = document.createElement("option");
        newOption.value = clave_valor[0];
        newOption.innerHTML = clave_valor[1];
        prodSubcategory.options.add(newOption);
        prodSubcategory.options[0].disabled = true;
      }
  
      // Cuando cambia a categoría:Surfboards, aparecen las opciones para FinSystem
      if (prodCategory.value == "1") {
        prodFins.disabled = false;
        (prodFins.parentElement).classList.remove("visually-hidden");
      } else {
        prodFins.disabled = true;
        prodFins.value = "";
        (prodFins.parentElement).classList.add("visually-hidden");
      }
    });
  
      // if (prodCategory.value == "1"){
      //   sizeGroup.style.display = "none"
      //   volGroup.style.display = "block"
      // } else {
      //   sizeGroup.style.display = "block"
      //   volGroup.style.display = "none"
      // }
    
  
    //VALIDACION SUBCATEGORÍA PRODUCTO
    prodSubcategory.valid = false;
    prodSubcategory.addEventListener("focus", function () {
      prodSubcategory.classList.remove("invalid-input");
      prodSubcategory.classList.remove("valid-input");
      // prodSubcategory.previousElementSibling.innerHTML = "";
    });
  
    prodSubcategory.addEventListener("blur", function () {
      if (prodSubcategory.value == "" && prodCategory.value == "") {
        prodSubcategory.previousElementSibling.innerHTML = "Seleccioná <strong>categoría</strong> y subcategoría";
        prodSubcategory.classList.add("invalid-input");
      } else if (prodSubcategory.value == "") {
        prodSubcategory.previousElementSibling.innerHTML = "Seleccioná la subcategoría";
        prodSubcategory.classList.add("invalid-input");
      } else {
        prodSubcategory.previousElementSibling.innerHTML = "";
        prodSubcategory.classList.remove("invalid-input");
        prodSubcategory.classList.add("valid-input");
        prodSubcategory.valid = true;
      }
    });
  
  
    //VALIDACION FIN SETUP (sólo para categoría: Surfboards)
    prodCategory.value == "1"? prodFins.valid = false : prodFins.valid = true;
    prodFins.addEventListener("focus", function () {
      prodFins.classList.remove("invalid-input");
      prodFins.classList.remove("valid-input");
      // prodFins.previousElementSibling.innerHTML = "";
    });
  
    prodFins.addEventListener("blur", function () {
      if (prodFins.value == "") {
        prodFins.previousElementSibling.innerHTML = "Seleccioná el Fin Setup correspondiente";
        prodFins.classList.add("invalid-input");
      } else {
        prodFins.previousElementSibling.innerHTML = "";
        prodFins.classList.remove("invalid-input");
        prodFins.classList.add("valid-input");
        prodFins.valid = true;
      }
    });
  
    //VALIDACION MARCA PRODUCTO
    prodBrand.valid = false;
    prodBrand.addEventListener("focus", function () {
      prodBrand.classList.remove("invalid-input");
      prodBrand.classList.remove("valid-input");
      // prodBrand.previousElementSibling.innerHTML = "";
    });
  
    prodBrand.addEventListener("blur", function () {
      if (prodBrand.value == "") {
        prodBrand.previousElementSibling.innerHTML = "Seleccioná una marca";
        prodBrand.classList.add("invalid-input");
      } else {
        prodBrand.previousElementSibling.innerHTML = "";
        prodBrand.classList.remove("invalid-input");
        prodBrand.classList.add("valid-input");
        prodBrand.valid = true;
      }
    });
  
  
    //VALIDACION PRECIO PRODUCTO
    //Truco para seleccionar el verdadero input
    prodPrice.valid = false;
    // priceCurrency.addEventListener("click", ()=> {
    //   prodPrice.focus();
    // })
    prodPrice.addEventListener("focus", function () {
      prodPrice.classList.remove("invalid-input");
      prodPrice.classList.remove("valid-input");
      // prodPrice.parentElement.previousElementSibling.innerHTML = "";
    });
  
    prodPrice.addEventListener("keydown", function (e){
      if (e.key == "."){
        e.preventDefault()
      }
    });
  
    prodPrice.addEventListener("input", function (){
      if (this.value !== "") {
        // priceCurrency.value = newprodPrice(this.value);
        this.parentElement.previousElementSibling.innerHTML = "";
        this.classList.remove("invalid-input");
        this.classList.add("valid-input");
        // priceCurrency.style.backgroundColor = "#fafdfd"
        priceCurrency.style.opacity= "100%"
    } else {
      priceCurrency.value = newprodPrice(0);
    }
  });
  
    prodPrice.addEventListener("blur", function (){
      if (this.value == "") {
        this.parentElement.previousElementSibling.innerHTML = "No olvidés el precio!";
        this.classList.add("invalid-input");
        this.classList.remove("valid-input");
      } else if (prodPrice.value < 0) {
        this.parentElement.previousElementSibling.innerHTML = "Usá valores positivos";
        this.classList.remove("valid-input");
        this.classList.add("invalid-input");
      } else {
        this.parentElement.previousElementSibling.innerHTML = "";
        this.classList.remove("invalid-input");
        this.classList.add("valid-input");
        prodPrice.valid = true;
  
    }
  });
  // FUNCIÓN Q TRANSFORMA EL VALOR INGRESADO, EN VALOR $ARS
  // no sé si quizás haya que comentarla pq no sé cómo pasará el valor a la db
  function newprodPrice(value) {
    let valor =  value % 1 == 0 && value!=""? value.replace(".","").replace(",","").replace(`/\D/g`,"")*100: value * 100;
    const options = {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,};
    const result = new Intl.NumberFormat(["es-AR", "es"], options).format(parseFloat(valor)/100);
  return result;
  }
  
  
    //VALIDACIÓN STOCK PRODUCTO
    prodStock.valid = false;
    prodStock.addEventListener("focus", function () {
      prodStock.classList.remove("invalid-input");
      prodStock.classList.remove("valid-input");
      // prodStock.previousElementSibling.innerHTML = "";
    });
  
    prodStock.addEventListener("blur", function () {
      if (prodStock.value == "") {
        prodStock.previousElementSibling.innerHTML = "No olvidés indicar la cantidad!";
        prodStock.classList.add("invalid-input");
      } else if (prodStock.value < 0) {
        prodStock.previousElementSibling.innerHTML = "Debe ser un valor positivo!";
        prodStock.classList.remove("valid-input");
        prodStock.classList.add("invalid-input");
      } else {
        prodStock.previousElementSibling.innerHTML = "";
        prodStock.classList.remove("invalid-input");
        prodStock.classList.add("valid-input");
        prodStock.valid = true;
      }
    });
  
  
    //VALIDACIÓN DESCRIPCIÓN PRODUCTO
    prodDescription.valid = false;
    prodDescription.addEventListener("focus", function () {
      prodDescription.classList.remove("invalid-input");
      prodDescription.classList.remove("valid-input");
      // prodDescription.previousElementSibling.innerHTML = "";
    });
  
    prodDescription.addEventListener("blur", function () {
      if (prodDescription.value == "") {
        prodDescription.previousElementSibling.innerHTML = "Una buena descripción ayuda a mejorar las ventas!";
        prodDescription.classList.add("invalid-input");
      } else if (prodDescription.value.length > 1500 || prodDescription.value.length < 10) {
        prodDescription.previousElementSibling.innerHTML = "Menos es más... Probá a decirlo usando como mínimo 10 caracteres y como máximo 1500 caracteres!";
        prodDescription.classList.remove("valid-input");
        prodDescription.classList.add("invalid-input");
      } else {
        prodDescription.previousElementSibling.innerHTML = "";
        prodDescription.classList.remove("invalid-input");
        prodDescription.classList.add("valid-input");
        prodDescription.valid = true;
      }
    });
  
  
    //VALIDACIÓN CARACTERÍSTICAS PRODUCTO
    prodFeatures.valid = false;
    prodFeatures.addEventListener("focus", function () {
      prodFeatures.classList.remove("invalid-input");
      prodFeatures.classList.remove("valid-input");
      // prodFeatures.previousElementSibling.innerHTML = "";
    });
  
    prodFeatures.addEventListener("blur", function () {
      if (prodFeatures.value == "") {
        prodFeatures.previousElementSibling.innerHTML = "No olvides detallar las características";
        prodFeatures.classList.add("invalid-input");
      } else if (prodFeatures.value.length > 500 || prodFeatures.value.length < 10 ) {
        prodFeatures.previousElementSibling.innerHTML = "Menos es más... Probá a decirlo usando como mínimo 10 caracteres y como máximo 500 caracteres!";
        prodFeatures.classList.remove("valid-input");
        prodFeatures.classList.add("invalid-input");
      } else {
        prodFeatures.previousElementSibling.innerHTML = "";
        prodFeatures.classList.remove("invalid-input");
        prodFeatures.classList.add("valid-input");
        prodFeatures.valid = true;
      }
    });
  
  
  
    //VALIDACIÓN IMÁGENES PRODUCTO
    // Defino una variable para atrapar a cada uno de los botones que cargan la imagen
    for (let i = 0; i < prodImageAll.length; i++) {
      let inputImg = prodImageAll[i].querySelector("input");
      let imgErrMsg = document.querySelector("#imgErrMsg");
      inputImg.valid = false;
     // console.log(inputImg);
     // console.log(inputImg.files);
     // console.log(inputImg.valid);
  
    // Defino la función que se desencadenará al onfocus cada uno de esos botones"
    inputImg.addEventListener("focus", function (e) {
      let imgContainer = this.parentElement;
      imgContainer.classList.remove("invalid-input");
      imgContainer.classList.remove("valid-input");
    });
  
    // Defino la función que se desencadenará al onblur el campo del input"
    inputImg.addEventListener("blur", setInvalidClass);
    function setInvalidClass(e) {
      if (!hasFiles(prodImageAll)){
        // let imagenes = this.files;
          imgErrMsg.innerHTML = "Una imagen dice más que mil palabras... No olvides agregar al menos una!";
          for (const box of prodImageAll) {
            box.classList.remove("valid-input");
            box.classList.add("invalid-input");
          }
      } // DEBER'IA PONER AC'A UN ELSE__????
    }
  
      // Defino la función que se desencadenará al cambiar el value del input"file"
      inputImg.addEventListener("change", updateImageDisplay);
      function updateImageDisplay(e) {
        let preview = this.parentElement.querySelector("#imgPreview");
        let imagenes = this.files;
        let cancelCross = this.parentElement.querySelector(".cancelCross");
        let imgContainer = this.parentElement;
  
        if (imagenes.length === 0){
          while (!hasFiles(prodImageAll)) {
            imgErrMsg.innerHTML = "Una imagen dice más que mil palabras... No olvides agregar al menos una!";
            for (const box of prodImageAll) {
              box.classList.remove("valid-input");
              box.classList.add("invalid-input");
            }
          }
        } else { 
          for (let file of imagenes) {
            if (!validFileType(file)) {
              imgErrMsg.innerHTML = "Formato de archivo no válido.";
              imgContainer.classList.add("invalid-input");
              imgContainer.classList.remove("valid-input");
            } else {
              while (preview.childElementCount > 1 && preview.lastChild) {
                preview.removeChild(preview.lastChild);
              }
              preview.style.backgroundColor = "white";
              let image = document.createElement("img");
              image.src = URL.createObjectURL(file);
              preview.appendChild(image);
              
              cancelCross.style.display = "block"
              imgErrMsg.innerHTML = "";
              for (const box of prodImageAll) {
                box.classList.remove("invalid-input");
                box.classList.add("valid-input");
                inputImg.valid = true;
              }
          // SI SE CARGÓ UNA IMAGEN PRINCIPAL, mostrarla como preview del producto
              if (prodImageAll[0].lastElementChild.childElementCount > 1){
                previewProdImg.src = prodImageAll[0].lastElementChild.lastChild.src
              }
          }
        }
      }  // CARGO UNA IMG THUMBNAIL
      };
    }; // CIERRO EL LOOP QUE ATRAPABA LOS BOTONES DE CARGAR FOTO
  
  
  
    // AGREGO UN EVENTO A CADA cancelCross
    let cancelCross = document.querySelectorAll(".cancelCross")
    for (let i = 0; i < cancelCross.length; i++) {
      let cross = cancelCross[i];
      cross.addEventListener("click", cancelImagePreview);
    }
    function cancelImagePreview(e){
      let preview = this.parentElement.querySelector("img");
      let input = this.parentElement.parentElement.querySelector("input");        
      
      if (preview) {
        preview.parentElement.style.backgroundColor = ""
        preview.parentNode.removeChild(preview);
      }
      input.value = null
      this.style.display = "none"
      setInvalidClass()
    }  // CIERRO AGREGAR UN EVENTO A cancelCross
  
  
  function hasFiles(prodImageAll) {
    let uploadedFiles = [];
    for (let i = 0; i < prodImageAll.length; i++) {
      let preview = prodImageAll[i].lastElementChild.querySelector('img');
      let input = prodImageAll[i].querySelector("input");
      if (preview !== null || input.value !== "") {
        uploadedFiles.push(input.id)
      }}
      return uploadedFiles.length !== 0;
    };
  
    const fileTypes = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
    ];
  
    function validFileType(file) {
      return fileTypes.includes(file.type);
    }
  
  // FUNCIONES PARA "PRODUCTO ACTIVO"
  let prodActivo = document.querySelector(".prodActivo"); // div
  let prodActivoInput = prodActivo.querySelector("input"); // input

  prodActivoInput.addEventListener("click", toggleActivo)
  function toggleActivo(e) { 
    prodActivo.classList.toggle("activado")
  }
    
  
  //------------------------------------------------------------
  let formElements = document.querySelector(".formulario").elements;
  
  //console.log(prodImage1.value);
  //console.log(prodImage2.value);
  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].hasOwnProperty("valid") && formElements[i].value !== ""){
      formElements[i].valid = true
    }
  };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let formElements = document.querySelector(".formulario").elements;
      let isInvalid = [];
        for (let i = 0; i < formElements.length; i++) {
          let formField = formElements[i]
          if (formField === image1 ) { continue }
          if (formField === imageGallery1 ) { continue }
          if (formField === imageGallery2 ) { continue }
          if (formField === imageGallery3 ) { continue }
          if (formField === imageGallery4 ) { continue }
          if (formField.hasOwnProperty("valid") && !formField.valid) {
            isInvalid.push(formField);
            formField.classList.add("invalid-input");
          }
        };
       // console.log(isInvalid)
        if (isInvalid.length > 0) {
          for (let i = isInvalid.length -1; i >= 0; i--) {
            // window.scrollTo({top:0, behavior:'smooth'});
            isInvalid[i].focus();
          }
        } else {
          form.submit();
        }
    });
  } // ETIQUETA DE CIERRE
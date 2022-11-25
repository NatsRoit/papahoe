if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
    
console.log("acá estoy"); // Prueba para ver si conecta
    
    
async function fetchProducts() {
    const res = await fetch("http://localhost:3001/api/products/index", {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    });
    const info = await res.json();
    return info.data.products;
}

async function ready() {
const PRODUCTS = await fetchProducts();
console.log(PRODUCTS);

let plusBtn = document.getElementById("mas");
let minusBtn = document.getElementById("menos");
let importe = document.getElementById("prodPrice");
let importePrint = document.getElementById("prodPricePrint");
let inputCantidad = document.getElementById("input");
let totalPrecio = document.querySelector("#totalPrecio")
let totalCantidad = document.querySelector("#totalCantidad")
formatPrecio(importePrint)
totalCantidad.innerHTML = inputCantidad.value;
totalPrecio.innerHTML =  calcular(importe) 




// DIMENSIONES TALLES
let selDim = document.querySelector('#opcDim')
let dimensiones = document.querySelector ('#dimensiones')

selDim.addEventListener ('change', function () {
let dimensionElegida = selDim.options[selDim.selectedIndex];
dimensiones.innerHTML = dimensionElegida.text
})

// FINS
let selFins = document.querySelector('#opcFin') 
let fins = document.querySelector ('#fins')

selFins.addEventListener ('change', function () {
let finElegida = selFins.options[selFins.selectedIndex];
fins.innerHTML = finElegida.text
})

// COLORES
let selColor = document.querySelector('#opcCol') 
let color = document.querySelector ('#color')

selColor.addEventListener ('change', function () {
let colorElegido = selColor.options[selColor.selectedIndex];
color.innerHTML = colorElegido.text
})

// ACABADO
let selAcabado = document.querySelector('#opcAcab') 
let acabado = document.querySelector ('#acabado')

selAcabado.addEventListener ('change', function () {
let acabadoElegido = selAcabado.options[selAcabado.selectedIndex];
    if (acabadoElegido.text == "glossy") {
        acabado.innerHTML = acabadoElegido.text + `<br><span style="color: gray">(+ $2.500 ARS)</span>`
        acabado.style.textAlign = "right"
    } else if (acabadoElegido.text == "opaco"){
        acabado.innerHTML = acabadoElegido.text
    }
    sumarAcabado();
});


// CANTIDAD & PRECIO
plusBtn.addEventListener("click", function() {
    if (Math.sign(inputCantidad.value)!= 1 || Math.sign(inputCantidad.value) == 0) {  // Si es un número negativo, lo pone en 1
        inputCantidad.value = 1;
        totalCantidad.innerHTML = inputCantidad.value;
        totalPrecio.innerHTML = calcular(importe)
        formatPrecio(totalPrecio)
        sumarAcabado()

    } else if (Math.sign(inputCantidad.value)== 1 ){
        inputCantidad.value = Number(inputCantidad.value) + 1;
        totalCantidad.innerHTML =  inputCantidad.value;
        totalPrecio.innerHTML =  calcular(importe) 
        formatPrecio(totalPrecio)
        sumarAcabado()
        }
    });

minusBtn.addEventListener("click", function() {
    if (Math.sign(inputCantidad.value)== 1 && inputCantidad.value != 1) { // Si es un número negativo, o 1, bloquea la función restar
        inputCantidad.value = Number(inputCantidad.value) - 1;
        totalCantidad.innerHTML =  inputCantidad.value;
        totalPrecio.innerHTML = calcular(importe)
        formatPrecio(totalPrecio)
        sumarAcabado()
    } else {
        inputCantidad.value = 1;
        totalPrecio.innerHTML = calcular(importe)
        formatPrecio(totalPrecio)
        sumarAcabado()
    }
    }); 

// Función para calcular precio * cantidad
function calcular(x) {
    let precio = parseFloat(x.innerHTML)
    let cant = inputCantidad.value;
    return   precio * cant 
}

// Función para dar formato de dinero al resultado
function formatPrecio(n){
    n.innerHTML = new Intl.NumberFormat(["es-AR", "es"], {style: "currency", currency: "ARS"}).format(parseFloat(n.innerHTML))
}

// Función para sumar extras
function sumarAcabado() {
    let acabadoElegido = selAcabado.options[selAcabado.selectedIndex];
    let cant = inputCantidad.value;
    if (acabadoElegido.text == "glossy") {
        totalPrecio.innerHTML = calcular(importe) + 2500 * cant
        return formatPrecio(totalPrecio)
    } else if (acabadoElegido.text == "opaco"){
        totalPrecio.innerHTML = calcular(importe)
        return formatPrecio(totalPrecio)
    }
    }

// sumar.addEventListener("keyup", function() {
//     inputCantidad.value = Number(inputCantidad.value) + 1;
//     let totalPrecio = document.querySelector("#totalPrecio")
//     // console.log(calcular())
//     totalPrecio.innerHTML = calcular();
//     });

let modalButton = document.querySelector("#modalButton")
let modalMedidas = document.querySelector("#modalMedidas")
let span = document.querySelector("#closeModal");

modalButton.addEventListener("click", function(){
    // console.log(e.target);
    modalMedidas.style.display = "block";
})
span.onclick = function() {
    modalMedidas.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalMedidas) {
        modalMedidas.style.display = "none";
    }
};


};
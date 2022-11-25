window.addEventListener('load',()=>{

// SLIDER VOLUME CALCULATOR 
let range = document.querySelectorAll(".volumeRange")

for (let i = 0; i < range.length; i++) {
    let valBox = range[i].previousElementSibling
    range[i].addEventListener("input", function(e){
        if (this.list) {
            let opArray = Array.from(this.list.options)
            console.log(opArray[0].label)
            for (let i = 0; i < opArray.length; i++) {
                console.log(opArray[i].label)
                if (opArray[i].value == this.value) {
                    valBox.innerHTML =opArray[i].label
                }
            }
        } else {
        }
    })
}


let calcBtn = document.querySelector("#calcularVol")
console.log(calcBtn)

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (range[3].previousElementSibling.innerHTML == "Beginner"){
        Swal.fire({
            icon: "info",
            title: `90.31 Litros`,
            text: `Volumen recomendado para tu perfil de surfista`,
            // footer: `Soft waves:  56.31 Litros <br> Powerful waves:  53.63 Litros`,
            showConfirmButton: true,
            timer: 10000,
        })
    } else if (range[3].previousElementSibling.innerHTML == "Intermedio") {
        Swal.fire({
            icon: "info",
            title: `71.5 Litros`,
            text: `Volumen recomendado para tu perfil de surfista`,
            showConfirmButton: true,
            timer: 10000,
        })
    } else if ((range[3].previousElementSibling.innerHTML == "Avanzado" || range[3].previousElementSibling.innerHTML == "Experto") && range[0].value <= 70) {
        Swal.fire({
            icon: "info",
            title: `58.7 Litros`,
            text: `Volumen recomendado para tu perfil de surfista`,
            // footer: `Soft waves:  56.31 Litros <br> Powerful waves:  53.63 Litros`,
            showConfirmButton: true,
            timer: 10000,
        })
    } else {
        Swal.fire({
            icon: "info",
            title: `43.2 Litros`,
            text: `Volumen recomendado para tu perfil de surfista`,
            // footer: `Soft waves:  56.31 Litros <br> Powerful waves:  53.63 Litros`,
            showConfirmButton: true,
            timer: 10000,
        })
    }
})


})

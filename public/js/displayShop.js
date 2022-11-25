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
    // CAPTURO LOS ELEMENTOS QUE VOY A UTLIZAR
    let title = document.querySelector(".titulo-seccion-main")
    let searchInput = document.getElementById("search-form-input");
    let searchForm = document.getElementById("searchForm");
    let lupaIcon = document.getElementById("lupa-icon")
    let searchBox = document.querySelector("div.search-box")
    let saludo = document.getElementById("hola")

    const PRODUCTS = await fetchProducts();
    console.log(PRODUCTS);

    // El Objeto urlObject trae consigo la propiedad .get q me permitirá obtener el valor del queryString
    let urlObject = new URLSearchParams(location.search);
    let keywordValue = urlObject.get("keyword");
    let catValue = urlObject.get("cat")? urlObject.get("cat").replace(/\s/g,'').toLowerCase() : null;
    //-------------------------------------------
    console.log(location.search);
    console.log(urlObject.has("keyword"));
    console.log(keywordValue);
    console.log(catValue);
    //-------------------------------------------

    if (location.href.includes("product/all") && location.search == "") {
        displayProducts(PRODUCTS);
        title.innerHTML = "Todos los productos"
        //console.log(PRODUCTS);
    } else if (urlObject.has('keyword')) {
        filterProducts(keywordValue, PRODUCTS)
    } else if (urlObject.has('cat')) {
        let prodsByCat = PRODUCTS.filter(prod => prod.categoria.name.replace(/\s/g,'').toLowerCase() == catValue || prod.subcategoria.name.replace(/\s/g,'').toLowerCase() == catValue)
        title.innerHTML = 'Shop: ' + `${catValue}`
        displayProducts(prodsByCat);
        // let queryCat = cat.categoria.name
        // filterProducts(queryCat, PRODUCTS)
    } else {
    };

    if (location.href.includes("product/all") && urlObject.has('cat')) {
        let breadcrumb = document.querySelector(".breadcrumb");
        let productoShop = document.querySelectorAll(".producto-shop a")[0].href
        let productoShopNum = productoShop.substring(productoShop.lastIndexOf("/") + 1)
        // let categoria = PRODUCTS[productoShopNum].categoria.name
        // let subcategoria = PRODUCTS[productoShopNum].subcategoria.name
        let categoria = catValue
        console.log(PRODUCTS[productoShopNum]);
        console.log(subcategoria);
        console.log(categoria);
        console.log(catValue);
        console.log(subcategoria.toLowerCase());

        if (catValue == "surfboards" || catValue == "complementos" || catValue == "accesorios") {
            breadcrumb.innerHTML += `
            <li><a href="/product/all?cat=${catValue}">${catValue}</a></li>`
        } else {
            breadcrumb.innerHTML += `
            <li><a href="/product/all?cat=${categoria}">${categoria}</a></li>
            <li><a href="/product/all?cat=${catValue}">${catValue}</a></li>`
        }
    }

    lupaIcon.addEventListener("click", function(e) {
        console.log(e.target);
        // let searchForm = document.getElementById("searchForm");
        searchBox.classList.toggle("hidden")
    });

}



// ------------------- Declaración de Funciones utilizadas ------------------- 

function displayProducts(array) {
  let container = document.getElementById("prodsContainer");
  container.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    const prod = array[i];
    if (prod.active && prod.stock > 0) {
    container.innerHTML += `
            <div class="producto-shop">
                <a href="/product/detail/${prod.id}">
                    <div class="imagen-producto">
                        <div ${prod.discount != 0? "class='enOferta'": ""} >
                            <span>${prod.discount != 0? prod.discount + "%" : "" }</span>
                            <p>${prod.discount != 0? "OFF" : "" }</p>
                        </div>
                        <div class="complementos-img">
                            <img src="/img/${prod.image1}" alt="${prod.name}">
                        </div>
                    </div>
                </a>
                <a class="shop-wraper-info" href="/product/detail/${prod.id}">
                    <div class="detalle-producto">
                        <h2>${prod.name}</h2>
                        <p>${prod.marca.name}</p>
                    </div>
                    <div class="info-producto">
                        <p ${ prod.discount == 0? 'class="precio"':'class="precio precioOld"'}> ${parseFloat(prod.price).toLocaleString(["es-AR", "es"], {style: "currency", currency: "ARS"})} </p>
                        <p class="precio" style="font-weight:bold; color:#335cb1">${ prod.discount == 0? "" : parseFloat(prod.price - (prod.price * prod.discount)/100).toLocaleString(["es-AR", "es"], {style: "currency", currency: "ARS"})}</p>
                    </div>
                </a>
            </div>`
    } else if (prod.active && prod.stock <= 0){
        container.innerHTML += `
            <div class="producto-shop">
                <a href="/product/detail/${prod.id}">
                    <div class="imagen-producto">
                        <div class="complementos-img">
                            <img src="/img/${prod.image1}" alt="${prod.name}">
                        </div>
                    </div>
                </a>
                <a class="shop-wraper-info" href="/product/detail/${prod.id}">
                    <div class="detalle-producto">
                        <h2>${prod.name}</h2>
                        <p>${prod.marca.name}</p>
                    </div>
                    <div class="info-producto">
                        <p style="color: red">OUT OF STOCK</p>
                    </div>
                </a>
            </div>`
    } else {
        container.innerHTML += ``
    }
  }
}


function filterProducts(query, PRODUCTS) {
    title = document.querySelector(".titulo-seccion-main")
    keyword = query.replace(/\s/g,'')
    if (keyword == "") {
        title.innerHTML = `Todos los productos`
        displayProducts(PRODUCTS);
    } else {
        let filtered = PRODUCTS.filter(
        (prod) =>
            prod.name.replace(/\s/g,'').toLowerCase().includes(keyword.toLowerCase()) ||
            prod.description.replace(/\s/g,'_').toLowerCase().includes(keyword.toLowerCase()) ||
            prod.marca.name.replace(/\s/g,'').toLowerCase().includes(keyword.toLowerCase()) ||
            prod.categoria.name.replace(/\s/g,'').toLowerCase().includes(keyword.toLowerCase()) ||
            prod.subcategoria.name.replace(/\s/g,'').toLowerCase().includes(keyword.toLowerCase())
        );
        if (filtered.length > 0) {
            title.innerHTML = `Resultados para: ${keyword}`
            displayProducts(filtered);
        } else {
            let container = document.getElementById("prodsContainer");
            container.innerHTML = ``;
            title.innerHTML = `No se encontraron resultados`
            let span = document.createElement("span")
            title.append(span);
            span.innerHTML = "x";
            title.style.display = "flex";
            title.style.justifyContent = "space-between";
            span.style.margin = "0 100px 0 30px";
            span.style.fontSize = "50px";
            span.addEventListener("click", function(e){
                title.innerHTML = ``
                title.innerHTML = `Todos los productos`
                displayProducts(PRODUCTS);
            })
            
        }
    }
}

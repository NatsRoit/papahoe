if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

console.log("acá estoy"); // Prueba para ver si conecta

async function fetchProdShop() {
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
  const PRODUCTS = await fetchProdShop();
  listProducts(PRODUCTS)
  console.log(PRODUCTS);
  
  let prodStatus = document.querySelectorAll("#admactive");
  for (let i = 0; i < prodStatus.length; i++) {
    prodStatus[i].addEventListener("click", function(e) {
      let prodId = e.target.parentElement.parentElement.querySelector("#prodId").innerHTML
          // console.log(prodId)
      let thisProduct = PRODUCTS.find(el => el.id == prodId)
          console.log(thisProduct.active)
          console.log(e.target)
          
          if (thisProduct.active = true){
            thisProduct.active = false
            const body = {
              active: thisProduct.active,
              id: thisProduct.id
            }
            fetchResponse = async() => {
              const res = await fetch("/api/products/edit", {
                method: 'PATCH',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
              })
            }
          }
          console.log(thisProduct.active)
          console.log(e.target)
        })
    }


          // } else {
          //   thisProduct.active
          // }
          // console.log(thisProduct.active)
          // console.log(e.target)

// ------------------------------------------------------






//   // let res = await fetchResponse.json()

//   if (res.meta.status == 201) {
//     alert("Hello! I am an alert box!!")
// }
// else {
//     alert("Hello! LPMMMMM")
// }

// // })


// function toggleActive(PRODUCTS) {
//   PRODUCTS.find(el => el.id == this.parentElement.querySelector("#prodId").innerHTML)
//   for (let i = 0; i < array.length; i++) {
//       const prod = array[i];
//       console.log(this.parentElement);
//       console.log(this.parentElement.querySelector("#prodId").innerHTML);
//   }
// }


function listProducts(PRODUCTS) {
    let container = document.getElementById("adminContainer");
    container.innerHTML = ``;   
    
    for (let i = 0; i < PRODUCTS.length; i++) {
        const prod = PRODUCTS[i]
        container.innerHTML += `
        <tr>
            <td id="prodId" class="hidden" >${prod.id}</td>
            <td id="name">${prod.name}</td>
            <td id="cat">${prod.categoria.name}</td>
            <td id="subcat">${prod.subcategoria.name}</td>
            <td id="stock">${prod.stock}</td>
            <td id="price">${prod.price}</td>
            <td id="discount">${prod.discount != 0? prod.discount : "-"}</td>
            <td id="admactive">${prod.active == true?`<span class="prodActive"><i></i></span>` : `<span class="red prodActive"><i></i></span>`}</td>
            <td id="adm-view"><a href="/product/detail/${prod.id}"><i class="fa-regular fa-eye"></i></a></td>
            <td id="adm-edit"><a href="/admin/edit/${prod.id}"> <i class="fa-solid fa-pencil"></i></a></td>
            <td id="adm-delete">
              <form class="delete" action="/admin/delete/${prod.id}?_method=DELETE" method="POST">
                <button type="submit" id="borrarProducto"><i class="fa-solid fa-trash"></i></button>
              </form>
            </td>
        </tr>
        `;
    }
}
}

import React,{ useState, useEffect } from "react";

function LastProductInDb(){

    // Fetch PRODUCTS
    const [product,setProduct] = useState(["Cargando.."])
    async function fetchLastProducts() {       
        const response = await fetch('http://localhost:3001/api/products/list');        
        const productsArray = await response.json();            
        setProduct(productsArray.data)
    }
    useEffect(()=>{
        fetchLastProducts()
    },[])

    let last = Object.values(product).pop();        
    // console.log(last);

    return(
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Último producto ingresado</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid " style={{width: 20 +'rem'}} src={"http://localhost:3001/img/" + last.image1} alt={last.name}/>
                        </div>
                        <h2>{last.name}</h2>
                        <p>{last.description}</p>
                        <a className="btn btn-papahoe" target="_blank" rel="nofollow" href={"http://localhost:3001/product/detail/"+ last.id}>Ver detalle</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LastProductInDb;
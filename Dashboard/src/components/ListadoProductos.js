import React,{ useState, useEffect } from "react";

function ListadoProductos(){

    // Fetch PRODUCTS
    const [listadoProd,setProducts] = useState(["Cargando.."])
    async function ListadoProducto() {       
        const response = await fetch('http://localhost:3001/api/products/list');        
        const productsArray = await response.json()
        setProducts(productsArray.data)        
    }
	useEffect(()=>{
		ListadoProducto()
	},[])

    // console.log(listadoProd);


    return(
        <React.Fragment>
				    {/*<!-- PRODUCTS LIST -->*/}
					<div className='container-fluid'>
					<h1 className="h3 mb-2 text-gray-800">Listado completo de Productos</h1>
					
					{/*<!-- DataTales Example -->*/}
						<div className="card shadow mb-4">
							{/* <div className="card-body"> */}
								<div className="table-responsive">
									<table className="table" id="dataTable" width="100%" cellSpacing="0">
										<thead>
											<tr>
												<th>Id</th>
												<th>Nombre</th>
												<th>Precio</th>
												<th>Stock</th>
												<th>Publicado</th>
                                                <th>Activo</th>
                                                <th>Ver Producto</th>
											</tr>
										</thead>  
                                        <tbody>                                                               
                                        {
                                            listadoProd.map((elem,index)=>{
                                                
                                                let icono;
                                                let color;
                                                if (elem.active == true ){
                                                    icono = 'fa fa-check';
                                                    color = 'green'
                                                }else{
                                                    icono = 'fa fa-thin fa-times';
                                                    color = 'red'
                                                }
                                                return (
                                                    <React.Fragment>
                                                    <tr>
                                                        <td>{elem.id}</td>
                                                        <td>{elem.name}</td>                                  
                                                        <td>{elem.price}</td>
                                                        <td>{elem.stock}</td>
                                                        <td>{elem.brand_id}</td>
                                                        <td style={{color: color}}><i class={icono}></i></td>
                                                        <td>
                                                            <a target="_blank" href={'http://localhost:3001/product/detail/'+ elem.id}>Ver producto</a>
                                                        </td>
                                                    </tr>                                                      
                                                    </React.Fragment>
                                                )
                                            })
                                        }   
                                        </tbody>
									</table>
								</div>
							{/* </div> */}
						</div>
					</div>            
        </React.Fragment>
    )
}
export default ListadoProductos;
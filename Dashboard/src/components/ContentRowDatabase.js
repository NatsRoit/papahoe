import React,{ useState,useEffect } from "react";
import SmallCard from './SmallCard';


function ContentRowDatabase(){       
    
    // Fetch USERS
    const [users,setUsers] = useState(["Cargando..."])
    async function fetchUsers() {       
        const response = await fetch('http://localhost:3001/api/users/list');        
        const usersArray = await response.json()
        setUsers(usersArray.info.total)
    }
	useEffect(()=>{
		fetchUsers()
	},[])

    // Fetch PRODUCTS
    const [products,setProducts] = useState(["Cargando.."])
    const [productsStock,setStock] = useState(["Cargando.."])
    async function fetchProducts() {       
        const response = await fetch('http://localhost:3001/api/products/list');        
        const productsArray = await response.json()
        setProducts(productsArray.info.total)
        setStock(productsArray.data)
    }
	useEffect(()=>{
		fetchProducts()
	},[])

    let suma = 0;
    productsStock.forEach(element => {        
        suma = element.stock + suma;
    });
    // console.log(productsStock);


    let usersCard = {
        color: "papahoeBlueTec",
        titulo: "Usuarios en Database",
        valor: users,
        icono: "fas fa-user",
    }  
    
    let productsCard = {
        color: "papahoePink",
        titulo: "Productos en Database",
        valor: products,
        icono: "fa-solid fa-box-open",
    }    
    let stockCard = {
        color: "papahoeGreen",
        titulo: "Stock de Productos",
        valor: suma,
        icono: "fa-industry",
    }
    
    let cardProps = [usersCard, productsCard, stockCard];
    




    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cardProps.map((elem,index)=>{
                    return <SmallCard  {...elem}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )
}
export default ContentRowDatabase;
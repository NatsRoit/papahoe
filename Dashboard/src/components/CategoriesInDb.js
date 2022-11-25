import React,{ useState,useEffect } from "react";
import Category  from './Categories';


function CategoriesInDb(){

    // Fetch CATEGORIES
    const [categories,setCategories] = useState(["Cargando.."])
    async function fetchCategories() {       
        const response = await fetch('http://localhost:3001/api/products/categories');        
        const categoriesArray = await response.json()
        setCategories(categoriesArray.data)
    }
    useEffect(()=>{
        fetchCategories()
    },[])

  
    // categories.forEach(element => {
    //     console.log(element.name);
    // });


    return (
        <React.Fragment>
                {/*<!-- Categories in DB -->*/}
                <div className="col-lg-6 mb-4">						
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-gray-800">Categorías </h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {
                                    categories.map((category,index)=>{
                                        return  <Category  {...category}  key={index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
           
        </React.Fragment>
    )

}
export default CategoriesInDb;
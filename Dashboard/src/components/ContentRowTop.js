import React from 'react';
import CategoriesInDb from './CategoriesInDb';
import ContentRowDatabase from './ContentRowDatabase';
import LastProductInDb from './LastProductInDb';

function ContentRowTop(){
    return(
        <React.Fragment>
		
				<div className="container-fluid">			
					<ContentRowDatabase />
					<div className="row">						
						<LastProductInDb />
						<CategoriesInDb />	
					</div>
				</div>
			

        </React.Fragment>
    )

}
export default ContentRowTop;

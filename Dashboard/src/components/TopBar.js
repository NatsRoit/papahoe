import React from 'react';
import foto from '../assets/images/LOGO-PapaHoe-LogoWord-Negativo.png';

function TopBar(){
    return(
        <React.Fragment>
			
				<div className='topBar'>
				<nav className="navbar">
			
                    <div className='leftBar'>
                        <a href='http://localhost:3001/' target="_blanc"><img className="logo" src={foto} alt="Papa Hoe Logo" /></a>
						<h3>Admin Dashboard</h3>
                    </div>
					
					<ul className="navbar-nav ml-auto">

						{/*<!-- Nav Item - Alerts -->*/}
						<li className="nav-item dropdown no-arrow mx-1">
							<a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
								<i className="fas fa-bell fa-fw"></i>
								{/*<!-- Counter - Alerts -->*/}
								<span className="badge badge-danger badge-counter">1</span>
							</a>
						</li>

						{/*<!-- Nav Item - Messages -->*/}
						<li className="nav-item dropdown no-arrow mx-1">
							<a className="nav-link dropdown-toggle" href="/" id="messagesDropdown">
								<i className="fas fa-envelope fa-fw"></i>
								{/*<!-- Counter - Messages -->*/}
								<span className="badge badge-danger badge-counter">54</span>
							</a>
						</li>

						<div className="topbar-divider d-none d-sm-block"></div>

						{/*<!-- Nav Item - User Information -->*/}
						<li className="nav-item dropdown no-arrow">
							<div className='userAdmin'>				
								<span >Bienvenido!</span> 
								<span className='user'>Usuario Admin</span> 
							
								
							</div>
						</li>
						
						
			

					</ul>
           
				
				
						
					

				</nav>
				</div>
			

        </React.Fragment>
    )
}
export default TopBar;
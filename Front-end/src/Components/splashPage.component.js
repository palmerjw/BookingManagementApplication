import React from 'react';
import { Link } from "react-router-dom";
import City from "./city.component";


const SplashPage = ({user, manager, cities, onCityClick, props }) => {
	
	return(
			 <div className = 'splash-page'>
				<center>
				
				
				<ul style={{ listStyleType: "none" }}>
					{cities.map((newCity) => <City city={newCity} onClick={onCityClick} props={props} />)}
				</ul> 
				</center>
			</div>
		
	);
	
	
};

export default SplashPage
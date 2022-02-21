import React from 'react';

const Weather  = (props) => {

    return (<div className="container">
        <div className="cards">
            <h2>{props.city},{props.country}</h2>
            <h1 className='py-3'>
            <i className={props.icon}></i>
            </h1>
            <h4 className='py-2'>Tempreture</h4> <br></br><p>{props.celcius}c&deg;</p>
            {/*SHOW MAX AND MINTEMP*/}
            {minmaxTemp(props.min_temp,props.max_temp)}
            <h4 className='p-4'>Weather Description</h4><br></br>
            <p className='text-capitalize'>{props.desc}</p>
        </div>
    </div>  );
}

function minmaxTemp (min,max) {

    return(
        <p><span className="px-4">Min - {min}c&deg;</span>
        <span className="px-4">Max - {max}c&deg;</span>
        </p>
    );
}
 
export default Weather;
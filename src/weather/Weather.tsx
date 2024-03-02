import { useEffect, useState } from "react";
import { debounce, capitalize } from 'lodash';

import css from './Weather.module.css';

const apiKey = `0b446853f5d2578048559f7cb1c2cf69`;

interface WeatherData {
    coord: {
        lat: number;
        lon: number;
    },
    weather: {
        description: string; 
    }[],
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
    }
    wind: {
        speed: number;
        deg: number;
    }
}

export default function Weather () {
    const [ loading, setLoading ] = useState( true );
    const debouncedHandleLocationChange = debounce( handleLocationChange, 500 );

    const [ weatherData, setWeatherData ] = useState<WeatherData | null>( null );
    // on mount, fetch calgary lat and lon
    useEffect( () => {
        getLatLon( `Calgary` );
    }, [] );

    return (
        <div className={ css.weather }>
            <input defaultValue={ `Calgary` } placeholder={ `Location` } onChange={ ( e ) => { debouncedHandleLocationChange( e.target.value ) } }></input>
            <div className={ css.weatherData }>
                { loading ? <h2>Loading...</h2> : 
                    !weatherData ? <h2>No Data Found</h2> :
                    <>
                        <h2>{weatherData?.name}</h2>
                        <div className={ css.dataDisplay }>
                            <DataPoint label={ `Weather Conditions` } value={ capitalize( weatherData?.weather[0]?.description ) }/>
                            <DataPoint label={ `Temperature` } value={ weatherData?.main?.temp + `°C` }/>
                            <DataPoint label={ `Feels Like` } value={ weatherData?.main?.feels_like + `°C` }/>
                            <DataPoint label={ `High` } value={ weatherData?.main?.temp_max + `°C` }/>
                            <DataPoint label={ `Low` } value={ weatherData?.main?.temp_min + `°C` }/>
                            <DataPoint label={ `Wind Speed` } value={ weatherData?.wind?.speed + ` km/h` }/>
                            <DataPoint label={ `Wind Degree` } value={ weatherData?.wind?.deg + `°` }/>
                            <DataPoint label={ `Latitude` } value={ weatherData?.coord?.lat + `°` }/>
                            <DataPoint label={ `Longitude` } value={ weatherData?.coord?.lon + `°` }/>
                        </div>
                    </>
                }
            </div>
        </div>
    );
            
    function DataPoint( { label, value }: { label: string; value: number | string } ) {
        return (
            <div className={ css.dataPoint }>
                <label>{ label }</label>
                <span>{ value }</span>
            </div>
        )
    }

    function getLatLon( location: string ) {
        fetch( `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}` )
        .then( resp => resp.json() ).then( data => {
            if ( Array.isArray( data ) && data.length > 0 ) {
                const { lat, lon } = data[ 0 ];
                getCurrentWeather( lat, lon );
            } else {
                console.error( 'Data format not as expected:', data );
                setWeatherData( null );
                setLoading( false );
            }
        } )
    }

    function getCurrentWeather( lat: number, lon: number ) {
        fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric` )
        .then( resp => resp.json() ).then( ( data: WeatherData ) => {
            console.log( data );
            setWeatherData( data );
            setLoading( false );
        } )
    }

    function handleLocationChange ( location: string )  {
        if ( location )  {
            setLoading( true );
            getLatLon( location );
        } else {
            setWeatherData( null );
        }
    }
}
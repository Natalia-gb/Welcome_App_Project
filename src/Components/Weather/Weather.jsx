import React, { useState, useEffect } from "react";
import './weather.css';
import { useLocalStorage } from "../../Helpers/useLocalStorage";
import { Switch } from "../../Utils/Switch";
import { ChildrenDetailedWeather } from "../../Utils/ChildrenDetailedWeather";

export const Weather = ({disabled}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [search, setSearch] = useLocalStorage("searchedCity", "Martos");
    const [checkedInfo, setCheckedInfo] = useLocalStorage("checkedInfo", false);

    // Estado DetailedInfo.jsx
    const [weather_info, setWeather_info] = useState([]);

    useEffect(() => {
        if(search !== ""){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=dc9bf4a4a78a56824e03ff1d85fcf6a9`)
                .then(response => response.json())
                .then(result => {
                    if(result?.status !== 400){
                        setWeatherData(result);
                    }else{
                        setWeatherData(null)
                    }})
                    
                .catch(error => console.error(error))
        } else {
            setWeatherData(null);
        }
        
    }, [search]);

    const { name, main, wind, weather, id, visibility} = weatherData || {};

    useEffect(() => {
        if(search !== ""){
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=dc9bf4a4a78a56824e03ff1d85fcf6a9`)
                .then(response => response.json())
                .then(result => {
                    if(result?.status !== 404){
                        setWeather_info([...result.list]);
                    }else{
                        setWeather_info([]);
                    }
                })
                .catch(error => console.error("Error", error))
        }else {
            setWeather_info([]);
        }
        
    }, [search]);

    if(!weatherData){
        return "";
    }

    const handleClick = () => {
        setEditing(true);
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            setEditing(false);
        };
    };

    const activateInfo = () => setCheckedInfo(!checkedInfo);

    return (
        <div className="dropdown-center text-light text-end me-2">
            {disabled && <>
                <button className="btn btn-transparent border border-0 bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex">
                        <div style={{marginRight: -45}}>
                            <img src={ weather && weather[0]?.icon? `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
                                : "null"} alt="" width="40" height="40"/>
                        </div>
                        <div>
                            <p className="text-light ms-5" style={{ fontSize: 26, marginBottom: -4 }}>
                                {main && main.temp? `${Math.round(main.temp - 273)}º` : "null"}
                            </p>
                            <p className="text-light ms-5" style={{ fontSize: 13 }}>
                                {name || "null"}
                            </p>
                        </div>
                    </div>
                </button>
                <ul className="dropdown-menu bg-dark mb-5" style={{width: 460, height: 270}}>
                    <div className="d-flex justify-content-between" id="divTop">
                        <div>
                            {editing? (<input type="text" className="ms-4" placeholder="Type a location" value={search} onChange={(e) => setSearch(e.target.value)} id="inputSearch" onKeyDown={handleKeyDown} required />) : 
                            (<p className="text-light ms-4 mb-1" style={{fontSize: 20}} onClick={handleClick}>{name || "Type a location"}</p>)}
                            
                            <p className="text-light ms-4" style={{fontSize: 16}}>{weather && weather[0]?.description? weather[0].description : "null"}</p>
                        </div>
                        
                        <div className="d-flex me-3">
                            <p className="text-light me-2">Detailed Info</p>
                            <div className="bg-secondary me-2 text-center text-light" style={{width: 40, height: 25, borderRadius: 15}}>Plus</div>
                            <Switch onChange={activateInfo} checked={checkedInfo} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-evenly">
                        <div className="d-flex">
                            <img src={weather && weather[0]?.icon? `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
                            : "null"} alt="" width="80" height="80" className="mt-1"/>
                            <p className="text-light" style={{fontSize: 60}}>{main && main.temp? `${Math.round(main.temp - 273)}ºC` : "null"}</p>
                        </div>
                        <div>
                            <p className="text-secondary secondary-first d-flex" style={{fontSize: 14}}>Feels like ·<span className="text-light ms-1">{main && main.feels_like? `${Math.round(main.feels_like - 273)}ºC` : "null"} </span></p>
                            <p className="text-secondary secondary-first d-flex" style={{fontSize: 14}}>Humidity ·<span className="text-light ms-1">{main && main.humidity? `${main.humidity}%` : "null"} </span></p>
                            <p className="text-secondary secondary-first d-flex" style={{fontSize: 14}}>Wind ·<span className="text-light ms-1">{wind && wind.speed? `${wind.speed}km/h` : "null"} </span></p>
                        </div>
                    </div>    
                    <hr className="text-secondary mb-2" />

                    <div className="d-flex bg-dark" id="divInfo">
                        {weather_info.map((weather) => <div key={weather.dt}>
                            <p className="text-light ms-3 mb-1">{weather.dt_txt.substring(5, 10)}</p>
                            <p className="text-light ms-3 mb-1">{weather.dt_txt.substring(11, 16)}</p>
                            <img src={weather && weather.weather[0]?.icon? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                            : "null"} alt="" width="70" height="70" />
                            <p className="text-light ms-4">{main && main.temp? `${Math.round(main.temp - 273)}º` : "null"}</p>
                        </div>)}
                    </div>

                    <hr className="text-secondary" id="hr" />
                    {/*  ChildrenDetailedInfo   */}
                    <div id="divDetailed">
                        <ChildrenDetailedWeather disabledWidget={checkedInfo} temp_min={main && main.temp_min? `${Math.round(main.temp_min - 273)}` : "null"} temp_max={main && main.temp_max? `${Math.round(main.temp_max - 273)}` : "null"} pressure={main && main.pressure? main.pressure : "null"} visibility={visibility || "null"} wind_deg={wind && wind.deg? wind.deg : "null"} wind_gust={wind && wind.gust? wind.gust : "null"} />
                    </div>
                
                    <div className="d-flex justify-content-around align-items-center bg-dark" id="divBottom">
                        <a className="text-light" style={{textDecoration: 'none', fontSize: 10}} href={`https://openweathermap.org/city/${id}"`} target="_blank" id="urlWeather">Current conditions and 8-day forecast --{">"}</a>
                        <img id="imgIcon" src="src\assets\openWeather_icon.png" alt="Open Weather Map" width="77.74" height={32} />
                    </div>
                </ul>
            </>}
        </div>
    );
};

import ItemTip from './ItemTip'
import { getWeatherIcon } from '../utils/Config'
import { useEffect, useState } from 'react'


const DetaleWeather = ({data, nowTime, place}) => {

    const  [weatherIcon, setWeatherIcon] = useState('');
    useEffect(()=>{
        setWeatherIcon(getWeatherIcon(data.cap))
    },[data.cap])

    return (
        <div className="w-full h-full">
            <div className="flex justify-between h-4/5">
                <div style={{maxWidth:'1000px'}}>
                    <div className="h-1/4 p-4">
                        <h2>当前天气</h2>
                        <p>{nowTime}</p>
                    </div>
                    <div className="flex justify-around  h-1/2 p-4">
                        <div className="h-36 w-36 bg-contain bg-center" style={{backgroundImage:`url(${weatherIcon})`}}></div>
                        <div className="w-1/5 pt-10 text-center text-6xl">
                        {data.temp}°C
                        </div>
                        <div className="ml-4 pl-10 pt-5">
                            <h2 className="text-2xl">{data.cap}</h2>
                            <p className="pt-3">体感温度：{data.feels}°C</p>
                        </div>
                    </div>
                </div>
                <div className='w-5/12 flex justify-center items-center relative'>
                    <div className='w-5/6 h-5/6 rounded-lg bg-cover bg-no-repeat' style={{backgroundImage:`url(/assets/image/${place}.png)`}}></div>
                </div>
            </div>
            <div className="flex h-1/5 justify-between p-4">
                {data.items.map(item => (< ItemTip key={item.key} title={item.name} value={item.value + item.unit} descrpit={item.descrpit} />))}
            </div>
        </div>
    )
}

export default DetaleWeather
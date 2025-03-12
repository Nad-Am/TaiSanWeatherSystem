import HomeItem from "../component/HomeItem";
import { useState, useEffect } from "react";
import {Icons} from "../utils/assetsConfig"
import api from "../api";
const Home = () => {

    const [main,setmain] = useState({
        wetaher: '...',
        tmepC:'...',
        humidity:'...'
    })

    const [itemList, setItemList] = useState([
        {
            name:'风向',
            icon:Icons.weather.window,
            value:'...'
        },
        {
            name:'风力',
            icon:Icons.weather.windowPo,
            value:'...'
        },
        {
            name:'风速',
            icon:Icons.weather.windowSp,
            value:'...'
        },
        {
            name:'气压',
            icon:Icons.weather.atmPre,
            value:'...'
        },
        {
            name:'PM2.5',
            icon:Icons.weather.air,
            value:'...'
        },
        {
            name:'能见度',
            icon:Icons.weather.visibilty,
            value:'...'
        }
    ])

    const fieldMap = {
        '风向': 'windDirection',
        '风力': 'windStrength',
        '风速': 'windSpeedEnglish',
        '气压': 'pressure',
        'PM2.5': 'aqi',
        '能见度': 'visibility'
    };

    const [places, setPlaces] = useState([
        {
            name:'玉皇顶',
            weather:'晴天',
            img:'/src/assets/image/YD.png',
        },
        {
            name:'南天门',
            weather:'晴天',
            img:'/src/assets/image/NTM.png',
        },
        {
            name:'五松亭',
            weather:'晴天',
            img:'/src/assets/image/WST.png',
        },
        {
            name:'中天门',
            weather:'晴天',
            img:'/src/assets/image/ZTM.png',
        },
        {
            name:'红门',
            weather:'晴天',
            img:'/src/assets/image/HM.png',
        }
    ])

    useEffect(() => {
        api.get('/weathers').then((res) => {
            const data = res;
            setmain({
                wetaher:data.weatherZh,
                humidity:data.humidity.slice(0,-1),
                tmepC:data.tempC
            })
            const updatedItemList = itemList.map(item => {
                const value = data[fieldMap[item.name]];
                return {
                    ...item,
                    value: value
                }
            })
            setItemList(updatedItemList);
        });
    }, []); // 明确指定依赖项数组为空数组

    return (
        <div className="w-full h-full ">
            <div className=" border-b-2 border-solid text-2xl p-4 font-bold border-gray-400" style={{height:"10%"}}>泰山气象系统</div>
            <div className="flex justify-around items-center flex-wrap bg-cardBg" style={{height:"85%",marginTop:'2%'}}>
                <div className=" h-5/6 rounded-2xl bg-cardBg w-6/12">
                    <div className="h-5/6 w-full rounded-t-2xl bg-cover" style={{backgroundImage:`url('/src/assets/image/LB_2.png')`}}></div>
                    <div className="m-2">这里是相关的描述</div>
                </div>
                <div className="flex flex-wrap justify-around bg-cardBg rounded-2xl h-5/6 w-5/12" >
                    <div className="w-5/12 h-1/2  ">
                        <div className="w-full h-1/2 flex items-center">
                            <div className="w-24 h-24 bg-cover" style={{
                                backgroundImage:`url(${Icons.weather.clear})`
                            }}></div>
                            <div className="w-1/2 h-24  text-2xl font-bold text-center p-5">{main.wetaher}天</div>
                        </div>
                        <div className="w-full h-1/2 flex border-solid border-r-2 border-gray-400">
                            <div className="w-1/4 h-full bg-contain  bg-no-repeat">温度：</div>
                            <div className="w-7/12 h-full text-center text-7xl">{main.tmepC}</div>
                            <div className="w-1/6 h-full "><sup>o</sup>c</div>
                        </div>
                    </div>
                    <div className="w-5/12  h-1/2">
                        <div className="w-full h-1/2 flex items-center">
                            <div className="w-24 h-24 bg-contain" style={{
                                backgroundImage:`url(${Icons.weather.humidity})`
                            }}></div>
                            <div className="w-1/2 h-24  text-2xl font-bold text-center p-5">湿度</div>
                        </div>
                        <div className="w-full h-1/2 flex ">
                            <div className="w-1/4 mr-5 h-4/6 bg-center bg-contain  bg-no-repeat" style={{
                                backgroundImage:`url(${Icons.other.arrowRight})`
                            }}></div>
                            <div className="w-1/2 h-full text-center text-7xl">{main.humidity}</div>
                            <div className="w-1/6 h-full ">%</div>
                        </div>
                    </div>
                    <div className="flex justify-around items-center flex-wrap w-10/12 mt-2 h-1/2 border-solid border-t-2 border-gray-400">
                        {itemList.map((item,index)=>(
                            <div key={index} className="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
                                <div className="flex h-1/3">
                                    <div className="m-1">{item.name}</div>
                                    <div className="w-6 m-1 h-6 bg-cover" style={{
                                        backgroundImage:`url(${item.icon})`
                                    }}></div>
                                </div>
                                <div className="m-1 font-bold mt-3 ml-3">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-5/6 flex justify-around items-center">
                    {places.map((item,index)=>(
                        <HomeItem key={index} name={item.name} weather={item.weather} img={item.img}></HomeItem>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;
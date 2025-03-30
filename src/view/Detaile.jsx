import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import TSMap from '../component/TSMap';
import TSTable from '../component/TSTable';
import DetaleWeather from '../component/DetaileWeather';
import { Icons, navList } from '../utils/Config';
import { useEffect, useState, useRef } from 'react';
import api,{ws} from '../api';


const Detaile = () => {

    const forestCount = 6;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const place = searchParams.get('place');

    const activClass = 'bg-cardBg2 mb-1 flex flex-wrap text-xs font-bold  justify-center bg-contain bg-no-repeat bg-center cursor-pointer  h-14 hover:bg-cardBg3'
    const inactivClass = 'bg-cardBg mb-1 flex flex-wrap text-xs font-bold  justify-center bg-contain bg-no-repeat bg-center cursor-pointer  h-14 hover:bg-cardBg3'


    const wsRef = useRef(null);

    const tableRef = useRef(null);

    const tableIndex = useRef(0);

    const [detailInfo, setdetailInfo] = useState({
        current:null,
        forecast:null
    })

    const [nowTime, setNowTime] = useState(new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0'));

    const [weather, setWeather] = useState({
        cap:'...',
        temp:'...',
        feels:'...',
        items: [
            {
                "name": "风速",
                "key": "windSpd",
                "value": "...",
                "unit": "km/h",
                "descrpit": "风速表示空气流动的速度，通常分为微风（0-5km/h）、和风（6-19km/h）和强风（20km/h以上）。风速是气象学中衡量空气流动的重要指标，对户外活动和天气变化有直接影响。"
            },
            {
                "name": "湿度",
                "key": "rh",
                "value": "...",
                "unit": "%",
                "descrpit": "湿度表示空气中水蒸气的含量，通常分为低湿度（0-40%）、中湿度（41-60%）和高湿度（61-100%）。湿度对人体舒适度有直接影响，低湿度可能导致干燥，高湿度可能导致闷热。"
            },
            {
                "name": "能见度",
                "key": "vis",
                "value": "...",
                "unit": "km",
                "descrpit": "能见度表示在天气条件下，人眼能够清晰看到的最远距离，通常分为较差（0-5km）、中等（5-20km）和极好（>20km）。能见度对驾驶安全和户外活动有重要影响，是衡量空气质量的重要指标。"
            },
            {
                "name": "气压",
                "key": "baro",
                "value": "...",
                "unit": "hPa",
                "descrpit": "气压表示大气压力，通常分为低气压（<1000hPa）、标准气压（1000-1020hPa）和高气压（>1020hPa）。气压变化常用于预测天气变化，低气压通常伴随阴雨天气，高气压通常伴随晴朗天气。"
            },
            {
                "name": "紫外线",
                "key": "uv",
                "value": "...",
                "unit": "",
                "descrpit": "紫外线指数表示紫外线辐射强度，通常分为低（0-2）、中等（3-5）和高（6-11+）。紫外线对人体皮肤和眼睛有直接影响，低紫外线可以放心外出，高紫外线需采取防护措施。"
            }
        ]

    })

    const [tipMessage, setTipMessage] = useState({
        clothes: '...',
        sun: ['...','...'],
        pre:[
            {
                name:'雾凇',
                ksy:'rime',
                value:false
            },
            {
                name:'云海',
                ksy:'seaOfClouds',
                value:false
            },
            {
                name:'冰雹',
                ksy:'freezingRain',
                value:false
            },
            {
                name:'雷暴',
                ksy:'blizzard',
                value: false
            }
        ]
    })

    const  Ropewaymessage = ['索道已关闭。将于每天上午8点开放，下午4点关闭。','由于天气原因索道已经关闭。','索道开放中。每天营业时间为上午8点到下午4点。']

    const [ropeway, setRopeway] = useState(0)

    const [table, setTable] = useState(
        Array.from({ length: 3 }, () => Array(forestCount).fill(0))
    )



    tableRef.current = table;

    // y页面转跳的点击事件处理函数  
    const handleTurn = (newPlace) => {
        queryParams.set('place',newPlace);
        navigate(`/detaile?${queryParams.toString()}`);
    }

    const handleIndex = (index) => {
        if(index < 0 || index > 24/forestCount - 1)  return;

        tableIndex.current = index;
        const forecast = detailInfo.forecast;
        console.log(index,tableIndex.current);
        const newTabl = Array.from({ length: 3 }).map((item,index)=>{
            return new Array(forestCount).fill(0).map(( _,inerIndex)=>{
                const iner = inerIndex + tableIndex.current;
                if(index === 0) return forecast[iner].temp;
                if(index === 1) return forecast[iner].rh;
                if(index === 2) return forecast[iner].cloudCover;
            })
        })
        setTable(newTabl);
    }
    
    const handleRopeway = (blizzard) => {

        if(new Date().getHours() < 8 || new Date().getHours() > 16) {
            setRopeway(0)
            return;
        }

        if(blizzard) {
            setRopeway(1)
            return;
        }


        setRopeway(2)
    }

    useEffect(()=>{
        tableIndex.current = 0;
        api.get(`/api/weathers/forecast?location=${place}_URL`).then(res=>{
            setdetailInfo(res.data);
            const current = res.data.current;
            const forecast = res.data.forecast;
            const newItems = weather.items.map(item=>{
                return {
                    ...item,
                    value:current[item.key]
                }
            })
            const newWeather = {
                cap:current.cap,
                temp:current.temp,
                feels:current.feels,
                items:newItems,
            }
            setWeather(newWeather);
            
            const newtipPre = tipMessage.pre.map(item=>{
                return {
                    ...item,
                    value:current[item.ksy]
                }
            })
            const newTipMessage = {
                // ropeway:current.ropeway,
                clothes:current.comment,
                sun:[forecast[0].sunrise,forecast[0].sunset],
                pre:newtipPre
            }
            setTipMessage(newTipMessage);
            handleRopeway(newtipPre[3].value);
            const newTabl = Array.from({ length: 3 }).map((item,index)=>{
                return new Array(forestCount).fill(0).map(( _,inerIndex)=>{
                    const iner = inerIndex + tableIndex.current;
                    if(index === 0) return forecast[iner].temp;
                    if(index === 1) return forecast[iner].rh;
                    if(index === 2) return forecast[iner].cloudCover;
                })
            })
            setTable(newTabl);

            wsRef.current = ws(`${place}_URL`);
            wsRef.current.onmessage = (respon)=>{
                const res = JSON.parse(respon.data);
                console.log(res);
                setdetailInfo(res);
                const current = res.current;
                const forecast = res.forecast;
                const newItems = weather.items.map(item=>{
                    return {
                        ...item,
                        value:current[item.key]
                    }
                })
                const newWeather = {
                    cap:current.cap,
                    temp:current.temp,
                    feels:current.feels,
                    items:newItems,
                }
                setWeather(newWeather);
                
                const newtipPre = tipMessage.pre.map(item=>{
                    return {
                        ...item,
                        value:current[item.ksy]
                    }
                })
                const newTipMessage = {
                    // ropeway:current.ropeway,
                    clothes:current.comment,
                    sun:[forecast[0].sunrise,forecast[0].sunset],
                    pre:newtipPre
                }

                handleRopeway(newtipPre[3].value);

                const newTabl = Array.from({ length: 3 }).map((item,index)=>{
                    return new Array(forestCount).fill(0).map(( _,inerIndex)=>{
                        const iner = inerIndex + tableIndex.current;
                        if(index === 0) return forecast[iner].temp;
                        if(index === 1) return forecast[iner].rh;
                        if(index === 2) return forecast[iner].cloudCover;
                    })
                })

                const oldString = [...tableRef.current[0],...tableRef.current[1],...tableRef.current[2]].join('');
                const newString = [...newTabl[0],...newTabl[1],...newTabl[2]].join('');
                if(oldString !== newString){
                    setTable(newTabl);
                }


                setTipMessage(newTipMessage);
                setNowTime(new Date().getHours().toString().padStart(2, '0')+':'+new Date().getMinutes().toString().padStart(2, '0'));
            }
        })

        return ()=>{
            if(wsRef.current){
                wsRef.current.close();
            }
        }
    },[place])




    return (
        <div className='w-full h-full flex flex-wrap justify-around items-center'>
            {/* 右侧导航栏 */}
            <div className='absolute flex w-20 top-24 -right-24 bg-cardBg3  h-4/6 flex-col'>
                <div className="w-16 h-16 -top-20 bg-cover absolute" style={{backgroundImage: 'url(/assets/icons/taiSan/TS_1.png)'}}></div>
                {navList.map((item,index)=>(
                    <div type='chekbox' key={index} onClick={()=>handleTurn(item.path)} className={item.path===place?activClass:inactivClass}>
                        <div className="w-4/5 h-2/3 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${Icons['taiSan'][item.path]})`}}></div>
                        <div className="pb-1">{item.name}</div>
                    </div>  
                ))
                }
            </div>

            {/* 左侧内容 */}
            <div className='w-7/12 bg-cardBg2 rounded-xl' style={{height:'45%'}}>
                <DetaleWeather data={weather} place={place} nowTime={nowTime} />
            </div>
            <div className='w-4/12' style={{height:'45%'}}>
                <TSMap place = {place} />
            </div>
            <div className='w-7/12 relative' style={{height:'45%'}}>
                <TSTable place={place} data = {table} forestCount={forestCount} handleIndex={handleIndex}/>
            </div>
            <div className='w-4/12 flex flex-col items-center justify-center bg-cardBg2 rounded-xl' style={{height:'40%'}}>
                <div className="flex w-11/12 h-1/3 pb-2 border-solid border-b-2">
                    <div className='w-1/2 h-full p-2 border-r-2 border-solid'>
                        <div className='h-1/3 '>索道：</div>
                        <div className='h-2/3 p-2'> {Ropewaymessage[ropeway]}</div>
                    </div>
                    <div className='w-1/2 h-full p-2'>
                        <div className='h-1/3' style={{borderBottom:'2px soilde'}}>日出/落：</div>
                        <div className='h-2/3 p-2'>
                            今日日出大概在{new Date(tipMessage.sun[0]).getHours().toString().padStart(2, '0')}:{new Date(tipMessage.sun[0]).getMinutes().toString().padStart(2, '0')}左右
                            <div></div>
                            今日日出大概在{new Date(tipMessage.sun[1]).getHours().toString().padStart(2, '0')}:{new Date(tipMessage.sun[1]).getMinutes().toString().padStart(2, '0')}左右
                        </div>
                    </div>
                </div>
                <div className="h-1/3  w-full">
                    <div className="w-full h-1/2 m-2 p-4">
                        <h2>穿衣：</h2>
                        <div className='p-1'>{tipMessage.clothes}</div>
                    </div>
                    <div className="w-full h-1/2 m-2 p-4"> 
                        <h2>预测：</h2>
                        <div className='flex w-full justify-around'>
                            {tipMessage.pre.map((item,index)=>(
                                <div key={index} className='p-2'>
                                    {item.name}:<span className='m-1'>{item.value? '较大概率' : '无'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detaile;
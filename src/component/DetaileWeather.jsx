import ItemTip from './ItemTip'


const DetaleWeather = ({ data }) => {
    
    return (
        <div className="w-full h-full">
            <div className="flex justify-between h-4/5">
                <div style={{maxWidth:'1000px'}}>
                    <div className="h-1/4 p-4">
                        <h2>当前天气</h2>
                        <p>10:30</p>
                    </div>
                    <div className="flex justify-around  h-1/2 p-4">
                        <div className="h-36 w-36 bg-contain bg-center" style={{backgroundImage:'url(/src/assets/icons/weather/clear.png)'}}></div>
                        <div className="w-1/5 pt-10 text-center text-6xl">
                            13°C
                        </div>
                        <div className="ml-4 pl-10 pt-5">
                            <h2 className="text-2xl">晴</h2>
                            <p className="pt-3">体感温度：13°C</p>
                        </div>
                    </div>
                </div>
                <div className='w-5/12 flex justify-center items-center relative'>
                    <div className='w-5/6 h-5/6 rounded-lg bg-cover bg-no-repeat' style={{backgroundImage:'url(/src/assets/image/WST.png)'}}></div>
                </div>
            </div>
            <div className="flex h-1/5 justify-between p-4">
                <ItemTip title="湿度" value="30%" />
                <ItemTip title="风速" value="3级" />
                <ItemTip title="紫外线" value="强" />
                <ItemTip title="能见度" value="10km" />
            </div>
        </div>
    )
}

export default DetaleWeather
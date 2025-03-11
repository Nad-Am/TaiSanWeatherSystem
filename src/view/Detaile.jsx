import { useLocation, useNavigate } from 'react-router-dom';
import TSMap from '../component/TSMap';
import TSTable from '../component/TSTable';
import DetaleWeather from '../component/DetaileWeather';


const Detaile = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    // 返回按钮的点击事件处理函数  
    const handleBack = (newPlace) => {
        queryParams.set('place',newPlace);
        navigate(`/detaile?${queryParams.toString()}`);
    }
    


    return (
        <div className='w-full h-full flex flex-wrap justify-around items-center'>
            {/* 右侧导航栏 */}
            <div className='absolute flex w-20 top-24 -right-24 bg-cardBg3  h-4/6 flex-col'>
                <div className="w-16 h-16 -top-20 bg-cover absolute" style={{backgroundImage: 'url(src/assets/icons/taisan/TS_1.png)'}}></div>
                <div onClick={()=>handleBack('HM')} className='bg-cardBg mb-1 flex flex-wrap text-xs font-bold  justify-center bg-contain bg-no-repeat bg-center  h-14'>
                    <div className="w-4/5 h-2/3 bg-contain bg-no-repeat bg-center" style={{backgroundImage: 'url(src/assets/icons/taisan/HM.png)'}}></div>
                    <div className="pb-1">红门</div>
                </div>
                <div className='bg-cardBg mb-1 p-1 flex flex-wrap text-xs font-bold  justify-center bg-contain bg-no-repeat bg-center  h-14'>
                    <div className="w-4/5 h-2/3 bg-contain bg-no-repeat bg-center" style={{backgroundImage: 'url(src/assets/icons/taisan/HM.png)'}}></div>
                    <div className="pb-1">红门</div>
                </div>
                <div className='bg-cardBg p-1 flex flex-wrap text-xs font-bold  justify-center bg-contain bg-no-repeat bg-center  h-14'>
                    <div className="w-4/5 h-2/3 bg-contain bg-no-repeat bg-center" style={{backgroundImage: 'url(src/assets/icons/taisan/HM.png)'}}></div>
                    <div className="pb-1">红门</div>
                </div>
            </div>

            {/* 左侧内容 */}
            <div className='w-7/12 bg-cardBg2 rounded-xl' style={{height:'45%'}}>
                <DetaleWeather />
            </div>
            <div className='w-4/12' style={{height:'45%'}}>
                <TSMap />
            </div>
            <div className='w-7/12' style={{height:'45%'}}>
                <TSTable />
            </div>
            <div className='w-4/12 flex flex-col items-center justify-center bg-cardBg2 rounded-xl' style={{height:'40%'}}>
                <div className="flex w-11/12 h-1/3 pb-2 border-solid border-b-2">
                    <div className='w-1/2 h-full p-2 border-r-2 border-solid'>
                        <div className='h-1/3 '>建议：</div>
                        <div className='h-2/3 p-2'> 就能看见了三那些立刻就能</div>
                    </div>
                    <div className='w-1/2 h-full p-2'>
                        <div className='h-1/3' style={{borderBottom:'2px soilde'}}>建议：</div>
                        <div className='h-2/3 p-2'> 就能看见了三那些立刻就能</div>
                    </div>
                </div>
                <div className="h-1/3  w-full">
                    <div className="w-full h-1/2 m-2 p-4">
                        <h2>穿衣：</h2>
                        <div className='p-1'>今天天气很好</div>
                    </div>
                    <div className="w-full h-1/2 m-2 p-4"> 
                        <h2>预测：</h2>
                        <div className='flex w-full justify-around'>
                            <div className='p-2'>
                                雨凇<span className='m-1'>80%</span>
                            </div>
                            <div className='p-2'>
                                雨凇<span className='m-1'>80%</span>
                            </div>
                            <div className='p-2'>
                                雨凇<span className='m-1'>80%</span>
                            </div>
                            <div className='p-2'>
                                雨凇<span className='m-1'>80%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detaile;
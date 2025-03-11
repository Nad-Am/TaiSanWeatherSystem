import HomeItem from "../component/HomeItem";

const Home = () => {
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
                                backgroundImage:`url('/src/assets/icons/weather/clear.png')`
                            }}></div>
                            <div className="w-1/2 h-24  text-2xl font-bold text-center p-5">晴天</div>
                        </div>
                        <div className="w-full h-1/2 flex border-solid border-r-2 border-gray-400">
                            <div className="w-1/3 h-full bg-contain  bg-no-repeat">温度：</div>
                            <div className="w-1/2 h-full text-8xl">24</div>
                            <div className="w-1/6 h-full "><sup>o</sup>c</div>
                        </div>
                    </div>
                    <div className="w-5/12  h-1/2">
                        <div className="w-full h-1/2 flex items-center">
                            <div className="w-24 h-24 bg-contain" style={{
                                backgroundImage:`url(src/assets/icons/weather/humidity.png)`
                            }}></div>
                            <div className="w-1/2 h-24  text-2xl font-bold text-center p-5">湿度</div>
                        </div>
                        <div className="w-full h-1/2 flex ">
                            <div className="w-1/4 mr-5 h-4/6 bg-center bg-contain  bg-no-repeat" style={{
                                backgroundImage:`url(src/assets/icons/weather/humidity.png)`
                            }}></div>
                            <div className="w-1/2 h-full text-8xl">24</div>
                            <div className="w-1/6 h-full ">%</div>
                        </div>
                    </div>
                    <div className="flex justify-around items-center flex-wrap w-10/12 mt-2 h-1/2 border-solid border-t-2 border-gray-400">
                        <div className="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
                            <div className="flex h-1/3">
                                <div className="m-1">风速</div>
                                <div className="w-6 m-1 h-6 bg-cover" style={{
                                    backgroundImage:`url(src/assets/icons/weather/clear.png)`
                                }}></div>
                            </div>
                            <div className="m-1 font-bold mt-3 ml-3">东北风2级</div>
                        </div>
                        <div className="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
                            <div className="flex h-1/3">
                                <div className="m-1">风速</div>
                                <div className="w-6 m-1 h-6 bg-cover" style={{
                                    backgroundImage:`url(src/assets/icons/weather/clear.png)`
                                }}></div>
                            </div>
                            <div className="m-1 font-bold mt-3 ml-3">东北风2级</div>
                        </div>
                        <div className="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
                            <div className="flex h-1/3">
                                <div className="m-1">风速</div>
                                <div className="w-6 m-1 h-6 bg-cover" style={{
                                    backgroundImage:`url(src/assets/icons/weather/clear.png)`
                                }}></div>
                            </div>
                            <div className="m-1 font-bold mt-3 ml-3">东北风2级</div>
                        </div>
                        <div className="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
                            <div className="flex h-1/3">
                                <div className="m-1">风速</div>
                                <div className="w-6 m-1 h-6 bg-cover" style={{
                                    backgroundImage:`url(src/assets/icons/weather/clear.png)`
                                }}></div>
                            </div>
                            <div className="m-1 font-bold mt-3 ml-3">东北风2级</div>
                        </div>
                        <div className="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
                            <div className="flex h-1/3">
                                <div className="m-1">风速</div>
                                <div className="w-6 m-1 h-6 bg-cover" style={{
                                    backgroundImage:`url(src/assets/icons/weather/clear.png)`
                                }}></div>
                            </div>
                            <div className="m-1 font-bold mt-3 ml-3">东北风2级</div>
                        </div>
                        <div className="w-1/4 m-2 rounded-xl h-1/4 bg-cardBg">
                            <div className="flex h-1/3">
                                <div className="m-1">风速</div>
                                <div className="w-6 m-1 h-6 bg-cover" style={{
                                    backgroundImage:`url(src/assets/icons/weather/clear.png)`
                                }}></div>
                            </div>
                            <div className="m-1 font-bold mt-3 ml-3">东北风2级</div>
                        </div>
                    </div>
                </div>
                <div className="w-5/6 flex justify-around items-center">
                    <HomeItem></HomeItem>
                    <HomeItem></HomeItem>
                    <HomeItem></HomeItem>
                    <HomeItem></HomeItem>
                    <HomeItem></HomeItem>
                </div>
            </div>
        </div>
    )
}

export default Home;

export const Images = {
    HM: '/src/assets/image/HM.png',
    NTM: '/src/assets/image/NTM.png',
    YD: '/src/assets/image/YD.png',
    ZTM: '/src/assets/image/ZTM.png',
    WST: '/src/assets/image/WST.png',
}


export const Icons  = {
    taiSan:{
        HM: '/src/assets/icons/taiSan/HM.png',
        NTM: '/src/assets/icons/taiSan/NTM.png',
        YD: '/src/assets/icons/taiSan/YD.png',
        ZTM: '/src/assets/icons/taiSan/ZTM.png',
        WST: '/src/assets/icons/taiSan/WST.png',
    },
    weather:{
        clear:'/src/assets/icons/weather/clear.png',
        UV:'/src/assets/icons/weather/UV.png',
        hazy:'/src/assets/icons/weather/hazy.png',
        atmPre:'/src/assets/icons/weather/atmPre.png',
        air:'/src/assets/icons/weather/air.png',
        visibilty:'/src/assets/icons/weather/visibilty.png',
        rainy:'/src/assets/icons/weather/rainy.png',
        window:'/src/assets/icons/weather/window.png',
        windowPo:'/src/assets/icons/weather/windowPo.png',
        windowSp:'/src/assets/icons/weather/windowSp.png',
        humidity:'/src/assets/icons/weather/humidity.png',
        cloundy:'/src/assets/icons/weather/cloundy.png',
        fog:'/src/assets/icons/weather/fog.png',
        snow:'/src/assets/icons/weather/snow.png',
        other:'/src/assets/icons/weather/other.png',
    },
    other:{
        arrowRight:'/src/assets/icons/arrowRight.png',
        query:'/src/assets/icons/query.png'
    }
}

export const placeMap = {
    'HM':'红门',
    'NTM':'南天门',
    'YD':'玉皇顶',
    'ZTM':'中天门',
    'WST':'五松亭'
}

export const urlMap = {
    '红门':'HM',
    '南天门':'NTM',
    '中天门':'ZTM',
    '五松亭':'WST',
    '玉皇顶':'YD'
}

export const weatherMap =[
    {
        name:'晴',
        icon:Icons.weather.clear
    },
    {
        name:'阴',
        icon:Icons.weather.cloundy
    },
    {
        name:'多云',
        icon:Icons.weather.hazy
    },
    {
        name:'雨',
        icon:Icons.weather.rainy
    },
    {
        name:'雪',
        icon:Icons.weather.snow
    },
    {
        name:'雾',
        icon:Icons.weather.fog
    }
]

export const getWeatherIcon = (text = '') => {
    for(let i = 0; i < weatherMap.length; i++) {
        if (text.indexOf(weatherMap[i].name) !== -1) {
            return weatherMap[i].icon
        }
    }
    return Icons.weather.other; // 其他天气
}

export const navList = [
        {
            name:'红门',
            path:'HM'
        },
        {
            name:'南天门',
            path:'NTM'
        },
        {
            name:' 中天门',
            path:'ZTM'
        },
        {
            name:'五松亭',
            path:'WST'
        },
        {
            name:'玉皇顶',
            path:'YD'
        }
    ]
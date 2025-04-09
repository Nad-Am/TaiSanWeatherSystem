
export const Images = {
    HM: '/assets/image/HM.png',
    NTM: '/assets/image/NTM.png',
    YD: '/assets/image/YD.png',
    ZTM: '/assets/image/ZTM.png',
    WST: '/assets/image/WST.png',
}


export const Icons  = {
    taiSan:{
        HM: '/assets/icons/taiSan/HM.png',
        NTM: '/assets/icons/taiSan/NTM.png',
        YD: '/assets/icons/taiSan/YD.png',
        ZTM: '/assets/icons/taiSan/ZTM.png',
        WST: '/assets/icons/taiSan/WST.png',
    },
    weather:{
        clear:'/assets/icons/weather/clear.png',
        UV:'/assets/icons/weather/UV.png',
        hazy:'/assets/icons/weather/hazy.png',
        atmPre:'/assets/icons/weather/atmPre.png',
        air:'/assets/icons/weather/air.png',
        visibilty:'/assets/icons/weather/visibilty.png',
        rainy:'/assets/icons/weather/rainy.png',
        window:'/assets/icons/weather/window.png',
        windowPo:'/assets/icons/weather/windowPo.png',
        windowSp:'/assets/icons/weather/windowSp.png',
        humidity:'/assets/icons/weather/humidity.png',
        cloundy:'/assets/icons/weather/cloundy.png',
        fog:'/assets/icons/weather/fog.png',
        snow:'/assets/icons/weather/snow.png',
        other:'/assets/icons/weather/other.png',
    },
    other:{
        arrowRight:'/assets/icons/arrowRight.png',
        query:'/assets/icons/query.png'
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
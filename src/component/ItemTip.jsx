import { useState } from "react"

const tip = ({title, value, descrpit}) => {

    const activClass = 'z-10 absolute top-2 left-14 w-52 bg-cardBg2 rounded-md'
    const inactivClass = 'hidden'

    const [active, setActive] = useState(false)


    return (
        <div>
            <div className="relative text-xs">
                {title}
                <div onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)} className="absolute -right-4 top-0 w-3 h-3 bg-contain bg-center bg-no-repeat" style={{backgroundImage:'url(/assets/icons/query.png)'}}></div>
                <div className={active ? activClass : inactivClass}>{descrpit}</div>
            </div>
            <p className="text-sm">{value}</p>
        </div>
    )
}

export default tip;
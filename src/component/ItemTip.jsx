const tip = () => {
    return (
        <div>
            <p className="relative text-xs">
                空气质量
                <div className="absolute -right-4 top-0 w-3 h-3 bg-contain bg-center bg-no-repeat" style={{backgroundImage:'url(/src/assets/icons/query.png)'}}></div>
            </p>
            <p className="text-sm">80</p>
        </div>
    )   
}

export default tip;
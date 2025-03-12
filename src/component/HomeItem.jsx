import { useNavigate } from 'react-router-dom';

const HomeItem = (props) => {
    const navigate = useNavigate();

    const handleTo = (path, place) => {
        navigate({
            pathname: path,
            search: `?place=${place}` // 修正了拼写错误
        });
    };

    return (
        <div 
            onClick={() => handleTo('/detaile', 'NTM')} 
            className="w-1/6 h-14 flex bg-cardBg2 rounded-2xl" 
            style={{
                maxWidth: '200px',
            }}
        >
            <div className='pt-7 rounded-xl pb-7 w-1/2 bg-cover' style={{
                backgroundImage: `url(${props.img})`
            }}></div>
            <div className=" pb-7 w-1/2 ">
                <div className='font-bold pl-2'>{props.name}</div>
                <div className='pl-4 pt-1'>{props.weather}</div>
            </div>
        </div>
    );
};

export default HomeItem;
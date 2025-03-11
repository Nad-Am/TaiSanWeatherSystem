import { Outlet } from "react-router-dom";
import styles from "./LayOut.module.css"; // 导入样式对象
import Icon from "../assets/icons/taisan/TaiSan.png"

const LayOut = () => {
    return (
        <div className={`p-2 flex justify-center items-center w-screen h-screen relative bg-cover ${styles.container}`}>
            <div className="absolute top-4 left-10  w-10 h-10" style={{
                backgroundImage: `url(${Icon})`,
                backgroundSize: "cover",
            }}></div>
            <div className={`bg-cardBg relative right-3  ${styles.main}`} style={{
                width: "90%",
                height: "90%",
            }}>
                <Outlet />
            </div>
        </div>
    );
};

export default LayOut;
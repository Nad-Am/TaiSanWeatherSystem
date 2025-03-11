import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../component/LayOut";
import Detaile from "../view/Detaile"
import Home from "../view/Home"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayOut />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/detaile" element={<Detaile />} />
                </Route>
            </Routes>
        </BrowserRouter>  
    )
}

export default Router;

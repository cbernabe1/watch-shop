import { useDispatch, useSelector } from "react-redux";
import Features from "../components/Features";
import getImageUrl from '../fetchImage.js';
import { useEffect } from "react";
import { fetchWatches } from "../redux/watches.js";
import { fetchCart} from "../redux/carts.js";
import Footer from "../components/Footer.jsx";
function HomePage(){

    const dispatch = useDispatch();
    const {watches} = useSelector(state => state.watches);
    useEffect(()=>{
        dispatch(fetchWatches());
    },[]);
    return <>
    <div className="flex flex-col items-center text-white">
        <h1 className="text-4xl font-extrabold my-10">Watchly</h1>
        <p className="max-w-xl text-md text-center">Welcome to Watchly - your ultimate destination for luxury timepieces. 
            Explore our curated collection of exquisite watches, ranging from classic elegance to cutting-edge innovation. 
            With detailed descriptions, stunning imagery, and expert reviews, finding your perfect timepiece has never been easier. 
            Whether you're a seasoned collector or a first-time buyer, TimeMasters is your trusted guide to the world of horology.</p>


        <div className="my-10">
        <h3 className="text-2xl font-normal text-center uppercase">Top Brands</h3>
        <ol className="flex space-x-6 mt-2">
            <li className="text-lg bg-white flex items-center rounded-md p-2 min-w-70"><img src={getImageUrl("logos/rolex.png")} alt="Rolex"  className="min-h-fit"/></li>     
            <li className="text-lg bg-white flex items-center rounded-md p-2 min-w-70"><img src={getImageUrl("logos/cartier.png")} alt="Cartier" /></li>
            <li className="text-lg bg-white flex items-center rounded-md p-2 min-w-70"><img src={getImageUrl("logos/patek.png")} alt="Patek" /></li>
        </ol>
        </div>
        <div className="mt-4">
            <h3 className="text-2xl font-normal text-center uppercase">Features</h3>
            <ul className="flex flex-wrap space-x-4 items-center justify-center mt-5">
                {watches.map(watch=> <Features watch = {watch} key={watch.id}/>)}
            </ul>
        </div>
    </div>
    <Footer/>
    </>
}


export default HomePage;
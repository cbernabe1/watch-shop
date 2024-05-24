import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatches } from '../redux/watches';
import { fetchCart } from '../redux/carts.js';
import Features from '../components/Features';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from '../redux/carts.js';
function ShopPage(){
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.carts);
    const {watches} = useSelector(state => state.watches);

    useEffect(()=>{
        dispatch(fetchWatches());
    },[])

    function addItemToCart(watch){
        if(cart.length === 0){
            dispatch(addToCart({watch: watch, quantity: 1}));
        }else{
            const findItem = cart.filter(item => item.watchid === watch.id);
            if(findItem.length === 0){
                 dispatch(addToCart({watch: watch, quantity: 1}));
                 console.log(cart);
            }
        }   
    }

    return <div className='w-full pb-20'>
            <h1 className='ml-44 mt-10 text-4xl font-semibold text-white'>Featured Watches</h1>
            <ul className='flex flex-wrap justify-center mt-5'>
            {watches.map(watch=> <Features watch = {watch} key={watch.id}>
                <div className='m-3 h-44 flex flex-col space-y-3 text-white relative' >
                    <h1 className="text-lg font-bold">{watch.name}</h1>
                    <p className='text-sm font-thin'>{watch.description}</p>
                    <p className='text-md font-semibold'>$ {watch.price}</p>
                    <div className='absolute bottom-0 right-0'>
                        <button className='hover:text-lime-500' onClick={()=>addItemToCart(watch)}><AddShoppingCartIcon/></button>
                    </div>
                </div>
            </Features>)}
            </ul>
        </div>
}

export default ShopPage;
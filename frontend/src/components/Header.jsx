import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/users";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useRef, useState } from "react";
import { updateCart,fetchCart, removeItem } from "../redux/carts";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Modal from "./Modal";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import getImageUrl from "../fetchImage";
function Header(){
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const {cart} = useSelector(state => state.carts);
    const modal = useRef();
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        dispatch(fetchCart());
        cart.map(item => {
            setTotal(item.price * item.quantity);
        });
    },[])
    function handleLogout(){
        dispatch(logoutUser());
    }

    function handleOpenModal(){
        modal.current.open();
    }

    function handleUpdateCart(item,action){
        let newItem = 0;
        if(action === "add"){
            newItem = item.quantity + 1;
        }else if(action === "subtract"){
            if(item.quantity !== 0){
                newItem = item.quantity - 1;
            }
        }
        let updateCartItem = {
            id: item.id,
            quantity: newItem
        }
        dispatch(updateCart({item: updateCartItem}));   
        handleTotal();     
    }

    function handleDeleteItem(id){
        dispatch(removeItem({id: id}));
    }

    function handleTotal(){
        cart.map(item => {
            setTotal(total + (item.price * item.quantity));
        });
        
    }


    return <>
    <Modal ref={modal}>
    <div className="flex flex-col space-y-14">
    <div className="flex items-center space-x-4">
    <h1 className="text-2xl font-bold">Your cart</h1>
     <div className="text-lime-700">
        <ShoppingCartCheckoutIcon/>
    </div>
    </div>
     <ul>
            {cart.length !== 0 ?
            cart.map((item,index) =>{
                return <li key={index} className="flex justify-between">
                    <div className="flex space-x-4 items-center">
                        <input type="checkbox" />
                        <img src={getImageUrl(item.imageurl)} className="w-24 rounded-lg" />
                        <div>   
                            <h1 className="text-lg font-semibold">{item.name}</h1>
                            <p>${item.price}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <div className="flex space-x-3">
                            <button className="border rounded-full hover:text-lime-400"
                            onClick={()=>handleUpdateCart(item,"add")}><AddIcon /></button>
                            <p className="font-bold">{item.quantity}</p>
                            <button className="border rounded-full hover:text-red-400"
                            onClick={()=>handleUpdateCart(item,"subtract")}><RemoveIcon /></button>
                        </div>
                        <button className="text-red-400" onClick={()=>handleDeleteItem(item.id)}><DeleteOutlineIcon/></button>
                    </div>
                </li>
            }):
            <p className="text-2xl font-thin">No added item yet...</p>}
        </ul>
        <div className="flex justify-end">
            <p className="font-bold">Total: {total.toFixed(2)}</p>
        </div>
        <form method="dialog" className="flex space-x-3 justify-end">
            <button className="w-32 py-2 font-semibold rounded-md bg-lime-400 hover:bg-lime-600">Checkout</button>
            <button className="w-32 py-2 font-semibold rounded-md bg-red-400 hover:bg-red-600">Close</button>
        </form>
    </div>
    </Modal>

    <header className="bg-zinc-700 text-white flex justify-between py-6 px-7">
        <h1 className="uppercase font-semibold text-xl">Watchly</h1>
        <nav className="mr-5">
            <ul className="flex space-x-10 items-center">
                 <li><a href="/">Home</a></li>
                 <li><a href="/shop">Shop</a></li>
                 <li><a href="/contacts">Contacts</a></li>
                {/* {user.isLogged === true ? 
                    <li><a className="py-2 px-6 bg-red-500 rounded font-semibold cursor-pointer hover:bg-red-400" onClick={handleLogout}>Logout</a></li>
                 :
                <li><a className="py-2 px-6 bg-emerald-500 rounded font-semibold cursor-pointer hover:bg-emerald-400" href="/login">Login</a></li>} */}
                <li className="relative"><button onClick={handleOpenModal}><ShoppingCartIcon/></button><span className="absolute h-4 w-4 -top-1 -right-1 z-50 text-white rounded-full bg-red-600
                text-center text-xs">{cart.length}</span></li>
            </ul>
        </nav>
    </header>
    </>
}

export default Header;
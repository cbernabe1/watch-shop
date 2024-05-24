import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';

function Button({icon,name, isActive, handleClick}){

    let style = "border border-slate-700 py-2 rounded-lg text-white flex items-center justify-center space-x-2 hover:bg-slate-700";
    let iconRender = null;
    if(isActive){
        style += " bg-blue-700 hover:bg-blue-600"
    }

    if(icon === "thunder"){
        iconRender = <ElectricBoltIcon />
    }else if(icon === "google"){
        iconRender = <GoogleIcon />
    }else if(icon === "send"){
        iconRender = <SendIcon />
    }
    return <button className={style} onClick={handleClick}>
        <div>{iconRender}</div>
        <div>{name}</div>
    </button>
}

export default Button;
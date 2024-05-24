import getImageUrl from "../fetchImage";

function Features({watch, children}){
    return <li className="max-w-96 bg-zinc-700 rounded-lg mt-4 ml-4 hover:scale-125 duration-200">
        <img src={getImageUrl(watch.imageurl)} 
        alt={watch.name} 
        className="object-cover rounded-t-lg"/>
        {children}
    </li>
}

export default Features;


function Input({label,refName, type, placeholder,isTextArea, handleChange,value}){
    return <div className="flex flex-col">
        <label for={refName} className="font-semibold mb-2 text-white">{label}</label>

        {isTextArea ? 
        <textarea name={refName} 
        placeholder={placeholder} 
        className="border px-4 py-2 rounded-md shadow-sm outline-none font-thin bg-transparent text-white h-80"
        onChange={handleChange}
        value={value}/> :
        
        <input type={type} 
        name={refName} 
        placeholder={placeholder} 
        className="border px-4 py-2 rounded-md shadow-sm outline-none font-thin bg-transparent text-white"
        onChange={handleChange}
        value={value}/>
        }
        
    </div>
}

export default Input;
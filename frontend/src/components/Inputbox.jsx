export function Inputbox({text,placeholder,onPress}){
return <div >
    <div className="font-bold text-slate-950 text-left py-2">{text}</div>
    
        <input onChange={onPress} placeholder={placeholder} className="w-full px-2 py-2 border-slate-400 border rounded"></input>
    
</div>
}
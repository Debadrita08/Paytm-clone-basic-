export const Balance = ({balance})=>{
    return <div className="flex">
        <div className="flex flex-col justify-center text-md font-bold pt-4 ps-4">
            Your balance
        </div>
        <div className="flex flex-col justify-center text-md font-bold pt-4 ps-4">{balance}</div>


    </div>
}
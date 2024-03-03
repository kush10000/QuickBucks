export const Balance = ({balance}) =>{
    return <div className="flex justify-start py-3 px-6 space-x-3">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}
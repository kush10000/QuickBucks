export default function Button({label,handleClick}){
    return <button onClick={handleClick} className="w-full my-3 bg-black text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {label}
    </button>
}
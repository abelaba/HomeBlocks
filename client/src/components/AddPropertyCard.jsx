import { Link } from "react-router-dom"

export default function AddPropertyCard() {
    const address = "https://cdn4.iconfinder.com/data/icons/vectory-bonus-3/40/button_add-512.png"
    return <Link to="/addProperty">
        <div class="p-10">
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-indigo-500 hover:bg-violet-400">
                <img class="w-full" src={address} alt="Mountain" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl text-white mb-2">Add Property</div>
                    <p class="text-white text-base">
                    </p>
                </div>
            </div>
        </div>
    </Link>
}
import { Link } from "react-router-dom";
import { BsFillHouseAddFill } from "react-icons/bs";

export default function AddPropertyCard() {
  
  return (
    <Link to="/addProperty">
      <div className="p-4 rounded overflow-hidden shadow-lg bg-yellow-500 hover:bg-violet-400 grid grid-flow-cols mb-6">
        <div className="grid items-center justify-center">
          <div className="font-bold text-xl text-black">
            <BsFillHouseAddFill size={20} className="inline" /> Add Property
          </div>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "react-router-dom";

export default function DecoratedLink({to, children}){
    return (
        <Link to={to}>
            <li className=" py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                {children}
            </li>
        </Link>
    )
}
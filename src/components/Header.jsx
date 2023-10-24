import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    const [pageState, setPageState] = useState("Sign in");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState("Profile");
            } else {
                setPageState("Sign in");
            }
        });
    }, [auth]);

    function pathMatchRoute(route) {
        return route === location.pathname;
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div>
                    <img
                        src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
                        alt='a logo of the original realtor.com site'
                        className='h-5 cursor-pointer'
                        onClick={() => navigate("/")}
                    />
                </div>
                <div>
                    <ul className='flex space-x-10'>
                        <li
                            className={`py-3 cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] ${
                                pathMatchRoute("/")
                                    ? "text-black border-b-red-500"
                                    : "border-b-transparent"
                            }`}
                            onClick={() => navigate("/")}>
                            Home
                        </li>
                        <li
                            className={`py-3 cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px]  ${
                                pathMatchRoute("/offers")
                                    ? "text-black border-b-red-500"
                                    : "border-b-transparent"
                            }`}
                            onClick={() => navigate("/offers")}>
                            Offers
                        </li>
                        <li
                            className={`py-3 cursor-pointer text-sm font-semibold text-gray-400 border-b-[3px] ${
                                pathMatchRoute("/sign-in") ||
                                pathMatchRoute("/profile")
                                    ? "text-black border-b-red-500"
                                    : "border-b-transparent"
                            }`}
                            onClick={() => navigate("/profile")}>
                            {pageState}
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}

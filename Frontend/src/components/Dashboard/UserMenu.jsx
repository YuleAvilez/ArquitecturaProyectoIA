import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOption = (option) => {
        setOpen(false);
        switch (option) {
            case "profile":
                navigate("/perfil");
                break;
            case "password":
                navigate("/actualizar-password");
                break;
            case "logout":
                navigate("/login");
                break;
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <img
                className="inline-block size-12 rounded-full ring-2 ring-white ml-2 cursor-pointer"
                src="avatar_user.jpg"
                alt="avatar"
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div className="absolute right-0 mt-2 w-60 dark:bg-gray-800 dark:border-gray-600 bg-white rounded-xl shadow-2xl z-50 border border-gray-200">
                    <button
                        onClick={() => handleOption("profile")}
                        className="block w-full text-left px-6 py-3 text-base text-gray-700 dark:text-white hover:bg-gray-100 rounded-t-xl dark:hover:bg-gray-700"
                    >
                        Ver perfil
                    </button>
                    <button
                        onClick={() => handleOption("password")}
                        className="block w-full text-left px-6 py-3 text-base dark:text-white text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Cambiar contraseña
                    </button>
                    <button
                        onClick={() => handleOption("logout")}
                        className="block w-full text-left px-6 py-3 text-base text-red-600 hover:bg-red-100 rounded-b-xl dark:hover:bg-red-300"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

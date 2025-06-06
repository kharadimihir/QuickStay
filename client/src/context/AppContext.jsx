import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useUser, useAuth } from "@clerk/clerk-react"
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
console.log(import.meta.env.VITE_BACKEND_URL);

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$"
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner ] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);


    const fetchUser = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get("/api/user", {headers: {Authorization: `Bearer ${token}`}});
            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities);
            }else{
                // Retry fetching user details after 5 seconds
                setTimeout(() => {
                   fetchUser(); 
                }, 5000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    return (
        <AppContext.Provider value={{
            currency,
            navigate,
            user,
            getToken,
            isOwner,
            setIsOwner,
            axios,
            showHotelReg,
            setShowHotelReg,
            searchedCities,
            setSearchedCities,
          }} >
            {children}
        </AppContext.Provider>
    )
};


export const useAppContext = ()=> useContext(AppContext); 

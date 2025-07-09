import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext"
import api from "../services/api"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([])
    const [watchlist, setWatchlist] = useState([])

    const { user } = useContext(AuthContext)
    const username = user?.username

    const getAuthHeader = () => {
        const token = localStorage.getItem("token");
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    useEffect(() => {
        if (username) {
            api.get(`/users/${username}`, getAuthHeader())
                .then(res => {
                    setFavorites(res.data.favorites)
                    setWatchlist(res.data.watchlist)
                })
                .catch(err => console.log("User data fetch error", err))
        }
    }, [username])

    const addToFavorites = async (id, media_type) => {
        try {
            const res = await api.post(
                `/users/${username}/favorites`,
                { id, media_type },
                getAuthHeader()
            )
            setFavorites(res.data.favorites)
        } catch (err) {
            console.log(err)
        }
    }

    const removeFromFavorites = async (id, media_type) => {
        try {
            const res = await api.delete(
                `/users/${username}/favorites/${media_type}/${id}`,
                getAuthHeader()
            )
            setFavorites(res.data.favorites)
        } catch (err) {
            console.log(err)
        }
    }

    const addToWatchlist = async (id, media_type) => {
        try {
        const res = await api.post(
            `/users/${username}/watchlist`,
            { id, media_type },
            getAuthHeader()
        )
        setWatchlist(res.data.watchlist)
        } catch (err) {
            console.log(err)
        }
    }

    const removeFromWatchlist = async (id, media_type) => {
        try {
        const res = await api.delete(
            `/users/${username}/watchlist/${media_type}/${id}`,
            getAuthHeader()
        )
        setWatchlist(res.data.watchlist)
        } catch (err) {
            console.log(err)
        }
    }

    const value = {
        favorites,
        watchlist,
        addToFavorites,
        removeFromFavorites,
        addToWatchlist,
        removeFromWatchlist
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}
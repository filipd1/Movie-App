import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"
import api from "../services/api"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([])
    const [watchlist, setWatchlist] = useState([])

    const { user } = useContext(AuthContext)
    const token = localStorage.getItem("token")
    const username = user?.username

    const authHeader = {
        headers: { Authorization: `Bearer ${token}` }
    }

    useEffect(() => {
        if (username && token) {
            api.get(`/users/${username}`, authHeader)
                .then(res => setFavorites(res.data.favorites))
                .catch(err => console.log("Fav err", err))

            api.get(`/users/${username}/watchlist`, authHeader)
                .then(res => setWatchlist(res.data.watchlist))
                .catch(err => console.log("Watchlist err", err))
        }
    }, [username, token])

    const addToFavorites = async (id, media_type) => {
        try {
            const res = await api.post(
                `/users/${username}/favorites`,
                { id, media_type },
                authHeader
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
                authHeader
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
            authHeader
        )
        setWatchlist(res.data.watchlist)
        } catch (err) {
        console.error(err)
        }
    }

    const removeFromWatchlist = async (id, media_type) => {
        try {
        const res = await api.delete(
            `/users/${username}/watchlist/${media_type}/${id}`,
            authHeader
        )
        setWatchlist(res.data.watchlist)
        } catch (err) {
        console.error(err)
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

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
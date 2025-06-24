import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

    const [favorites, setFavorites] = useState(null)
    const [watchlist, setWatchlist] = useState(null)

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        const storedWatchlist = localStorage.getItem("watchlist")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
            else setFavorites([])
        if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist))
            else setWatchlist([])
    }, [])

    useEffect(() => {
        if (favorites !== null) localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        if (watchlist !== null) localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist])

    const addItem = (item, listType) => {
        if (listType === "favorites")
            setFavorites(prev => [...prev, item])
        else if (listType === "watchlist")
            setWatchlist(prev => [...prev, item])
    }

    const removeItem = (id, mediaType, listType) => {
        if (listType === "favorites")
            setFavorites(prev =>
                prev.filter(item => !(item.id === id && item.media_type === mediaType))
            )
        else if (listType === "watchlist")
            setWatchlist(prev =>
                prev.filter(item => !(item.id === id && item.media_type === mediaType))
            )
    }

    const isAdded = (id, mediaType, listType) => {
        const list = listType === "favorites" ? favorites : watchlist
        return list?.some(
            item => item.id === id && item.media_type === mediaType
        )
    }

    const value = {
        favorites,
        watchlist,
        addItem,
        removeItem,
        isAdded
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
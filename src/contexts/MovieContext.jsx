import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

    const [favorites, setFavorites] = useState(null)

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
            else setFavorites([])
    }, [])

    useEffect(() => {
        if (favorites !== null) localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addFavorites = (item) => {
        setFavorites(prev => [...prev, item])
    }

    const removeFavorites = (id, mediaType) => {
        setFavorites(prev => 
            prev.filter(item => !(item.id === id && item.media_type === mediaType))
        )
    }

    const isFavorite = (id, mediaType) => {
        return favorites?.some(
            item => item.id === id && item.media_type === mediaType
        )
    }

    const value = {
        favorites,
        addFavorites,
        removeFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
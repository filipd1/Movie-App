# 🎬 React App for Browsing and Rating Movies & TV Series

Projekt to nowoczesna aplikacja webowa inspirowana serwisem Filmweb, stworzona z wykorzystaniem React, która umożliwia:

- przeglądanie filmów i seriali,
- ocenianie obejrzanych tytułów,
- dodawanie ich do swojej biblioteki (watchlist, ulubione),
- sprawdzanie szczegółowych informacji o aktorach oraz twórcach.

Dane są pobierane z [TheMovieDB API](https://www.themoviedb.org/) – jednego z największych otwartych źródeł informacji o filmach, serialach i ludziach kina.

---

## 🔧 Technologie

- React (z routingiem)
- Context API (zarządzanie stanem)
- CSS Modules / własny system klas
- Fetch API + async/await
- TheMovieDB API
- JWT (dla autoryzacji użytkownika)
- Express (w backendzie – jeśli dotyczy)
- MongoDB (jeśli dotyczy)

---

## 📸 Screeny

### 🔍 Strona filmu

Zawiera szczegółowe informacje o filmie, ocenę użytkowników, możliwość oceny własnej, dodania do ulubionych lub listy do obejrzenia:

![Screenshot - Strona filmu](./screenshots/movie_page.png)

---

### 👤 Strona aktora

Pokazuje dane osobowe, znane role, ostatnie role pogrupowane wg lat:

![Screenshot - Strona aktora](./screenshots/actor_page.png)

---
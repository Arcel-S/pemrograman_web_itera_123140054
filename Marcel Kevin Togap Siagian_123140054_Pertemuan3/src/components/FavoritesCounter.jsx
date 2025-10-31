import { useFavorites } from '../context/FavoritesContext';

function FavoritesCounter() {
  const { favorites } = useFavorites();
  const totalFavorites = favorites.length;

  return (
    <span className="favorites-counter">
      ⭐ Favorit: {totalFavorites}
    </span>
  );
}

export default FavoritesCounter;
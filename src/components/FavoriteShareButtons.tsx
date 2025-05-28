import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';

export const FavoriteShareButtons = ({
  id,
  type,
}: {
  id: string | number;
  type: 'project' | 'post';
}) => {
  const [fav, setFav] = useState(
    () => !!localStorage.getItem(`${type}-fav-${id}`),
  );
  const [showShare, setShowShare] = useState(false);

  const handleFav = () => {
    setFav((f) => {
      if (!f) localStorage.setItem(`${type}-fav-${id}`, '1');
      else localStorage.removeItem(`${type}-fav-${id}`);
      return !f;
    });
  };

  const handleShare = () => {
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2000);
    // Aqui você pode integrar com a API de compartilhamento se desejar
  };

  return (
    <div className="flex gap-2 items-center">
      <motion.button
        onClick={handleFav}
        whileTap={{ scale: 0.8 }}
        animate={{ scale: fav ? 1.2 : 1 }}
        className="text-red-500"
        aria-label={fav ? 'Desfavoritar' : 'Favoritar'}
      >
        {fav ? <FaHeart /> : <FaRegHeart />}
      </motion.button>
      <motion.button
        onClick={handleShare}
        whileTap={{ scale: 0.8 }}
        className="text-modern-accent"
        aria-label="Compartilhar"
      >
        <FaShareAlt />
      </motion.button>
      {showShare && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="ml-2 text-xs text-modern-accent"
        >
          Link copiado!
        </motion.span>
      )}
    </div>
  );
};

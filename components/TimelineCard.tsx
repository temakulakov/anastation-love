'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/utils/constants';
import styles from '@/styles/components/TimelineCard.module.scss';

interface TimelineCardProps {
  date: string;
  title: string;
  description: string;
  photos: string[];
  index: number;
}

const DECOR_EMOJIS_POOL = ['💐', '✨', '💖', '🦄', '🌙', '🌸', '💫', '🎀', '🫶', '🌟', '🍓', '🎈'];

const hashString = (value: string) => {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const getDecorEmojis = (seed: string, count = 3) => {
  const pool = [...DECOR_EMOJIS_POOL];
  const result: string[] = [];
  let state = hashString(seed);

  while (result.length < count && pool.length > 0) {
    state = Math.imul(state ^ (state >>> 15), 2246822519) >>> 0;
    const pickedIndex = state % pool.length;
    const [picked] = pool.splice(pickedIndex, 1);
    result.push(picked);
  }

  return result;
};

export const TimelineCard: React.FC<TimelineCardProps> = ({
  date,
  title,
  description,
  photos,
  index,
}) => {
  const normalizedPhotos = photos.filter(Boolean);
  const hasSinglePhoto = normalizedPhotos.length === 1;
  const decorEmojis = getDecorEmojis(`${date}-${title}-${index}`);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      switch (e.key) {
        case 'ArrowLeft':
          setSelectedPhotoIndex(
            selectedPhotoIndex === 0 ? normalizedPhotos.length - 1 : selectedPhotoIndex - 1
          );
          break;
        case 'ArrowRight':
          setSelectedPhotoIndex(
            selectedPhotoIndex === normalizedPhotos.length - 1 ? 0 : selectedPhotoIndex + 1
          );
          break;
        case 'Escape':
          setSelectedPhotoIndex(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [normalizedPhotos.length, selectedPhotoIndex]);

  return (
    <div className={`${styles.cardWrapper} ${isLeft ? styles.left : styles.right}`}>
      <motion.div
        className={`${styles.cardContainer} ${isLeft ? styles.left : styles.right}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div
          className={styles.card}
          whileHover={{ scale: 1.05, y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className={styles.dateCircle}>
            <span className={styles.heart}>💕</span>
            <span className={styles.dateText}>{formatDate(date)}</span>
          </div>

          <div className={styles.cardContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            <div className={`${styles.photosGrid} ${hasSinglePhoto ? styles.singlePhotoGrid : ''}`}>
              {normalizedPhotos.map((photo, photoIndex) => (
                <motion.div
                  key={photoIndex}
                  className={styles.photoWrapper}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedPhotoIndex(photoIndex)}
                >
                  <img
                    src={photo}
                    alt={`${title} ${photoIndex + 1}`}
                    className={styles.photo}
                  />
                  <div className={styles.photoOverlay}>
                    <span className={styles.expandIcon}>🔍</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.decorIcons}>
              {decorEmojis.map((emoji, emojiIndex) => (
                <span key={`${emoji}-${emojiIndex}`}>{emoji}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Full Screen Modal */}
      {selectedPhotoIndex !== null && normalizedPhotos[selectedPhotoIndex] && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={normalizedPhotos[selectedPhotoIndex]}
              alt="Full screen"
              className={styles.fullScreenPhoto}
              layoutId={`photo-${selectedPhotoIndex}`}
            />

            <div className={styles.modalControls}>
              {normalizedPhotos.length > 1 && (
                <button
                  className={styles.navButton}
                  onClick={() =>
                    setSelectedPhotoIndex(
                      selectedPhotoIndex === 0 ? normalizedPhotos.length - 1 : selectedPhotoIndex - 1
                    )
                  }
                >
                  ←
                </button>
              )}
              <span className={styles.photoCounter}>
                {selectedPhotoIndex + 1} / {normalizedPhotos.length}
              </span>
              {normalizedPhotos.length > 1 && (
                <button
                  className={styles.navButton}
                  onClick={() =>
                    setSelectedPhotoIndex(
                      selectedPhotoIndex === normalizedPhotos.length - 1 ? 0 : selectedPhotoIndex + 1
                    )
                  }
                >
                  →
                </button>
              )}
              <button className={styles.closeButton} onClick={() => setSelectedPhotoIndex(null)}>
                ✕
              </button>
            </div>

            <motion.div
              className={styles.decorHearts}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕 💕 💕
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

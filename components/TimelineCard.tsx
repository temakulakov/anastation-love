'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDate, formatMonthYear } from '@/utils/constants';
import styles from '@/styles/components/TimelineCard.module.scss';

interface TimelineCardProps {
  date: string;
  title: string;
  description: string;
  photos: string[];
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  date,
  title,
  description,
  photos,
  index,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      switch (e.key) {
        case 'ArrowLeft':
          setSelectedPhotoIndex(
            selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1
          );
          break;
        case 'ArrowRight':
          setSelectedPhotoIndex(
            selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1
          );
          break;
        case 'Escape':
          setSelectedPhotoIndex(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

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
          className={styles.dateLabel}
          initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {isLeft ? (
            <>
              <span className={styles.monthText}>{formatMonthYear(date)}</span>
              <div className={styles.arrow} />
            </>
          ) : (
            <>
              <div className={styles.arrow} />
              <span className={styles.monthText}>{formatMonthYear(date)}</span>
            </>
          )}
        </motion.div>

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

            <div className={styles.photosGrid}>
              {photos.map((photo, photoIndex) => (
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
              <span>💐</span>
              <span>✨</span>
              <span>💖</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Full Screen Modal */}
      {selectedPhotoIndex !== null && (
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
              src={photos[selectedPhotoIndex]}
              alt="Full screen"
              className={styles.fullScreenPhoto}
              layoutId={`photo-${selectedPhotoIndex}`}
            />

            <div className={styles.modalControls}>
              <button
                className={styles.navButton}
                onClick={() =>
                  setSelectedPhotoIndex(
                    selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1
                  )
                }
              >
                ←
              </button>
              <span className={styles.photoCounter}>
                {selectedPhotoIndex + 1} / {photos.length}
              </span>
              <button
                className={styles.navButton}
                onClick={() =>
                  setSelectedPhotoIndex(
                    selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1
                  )
                }
              >
                →
              </button>
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

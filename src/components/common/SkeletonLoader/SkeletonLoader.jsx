import React from 'react';
import styles from './SkeletonLoader.module.css';

const SkeletonLoader = () => {
  return (
    <div className={styles['skeleton-loader']}>
      <div className={styles['skeleton-loader__content']}>
        <div className={styles['skeleton-loader__line']}></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
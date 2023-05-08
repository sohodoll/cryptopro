import styles from './styles.module.css';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      {' '}
      <a className={styles.link} href="https://github.com/sohodoll/cryptopro">
        Cryptopro Inc. &nbsp;
      </a>
      <p>2023</p>
    </div>
  );
};

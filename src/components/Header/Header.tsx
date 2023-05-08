import btc from 'assets/icons/bitcoin.png';
import styles from './styles.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div>CRYPTOPRO</div>
      <div>
        <img src={btc} className="w-6" alt="signIn" />
      </div>
    </div>
  );
};

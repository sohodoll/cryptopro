import meteors from 'assets/animations/meteor-rain.gif';
import signIn from 'assets/icons/login.png';
import styles from './styles.module.css';

export function Header() {
  return (
    <div className={styles.header}>
      <div>CRYPTOPRO</div>
      <div>
        <img src={signIn} className="w-10" alt="signIn" />
      </div>
    </div>
  );
}

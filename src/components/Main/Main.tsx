import styles from './styles.module.css';
import { SearchCalculator } from './SearchCalculator';
import { SelectCalculator } from './SelectCalculator';

export const Main = () => {
  return (
    <div className={styles.main}>
      <SearchCalculator />
      {/* <SelectCalculator /> */}
    </div>
  );
};

import { Link } from 'react-router-dom';
import * as stylesImport from './BackToPortfolio.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

export function BackToPortfolio() {
    return (
        <Link to="/" className={styles.backLink}>
            ← Back to portfolio
        </Link>
    );
}

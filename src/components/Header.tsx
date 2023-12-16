import styles from './Header.module.css'
import logo from './assets/rocket.svg'

export function Header(){
    return(
        <div className={styles.header}>
            <div className={styles.logoHolder}>
                <img src={logo} alt="foguete" />
                <p>to<span className={styles.purpleTitle}>do</span></p>
            </div>
        </div>
    )
}
import type { NextPage } from 'next'
import LoginForm from '../components/LoginForm'
import styles from '../styles/Home.module.css'

const LoginPage: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <LoginForm />
            </main>
        </div>
    )
}

export default LoginPage;
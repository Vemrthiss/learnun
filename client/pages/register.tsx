import type { NextPage } from 'next'
import RegisterForm from '../components/RegisterForm'
import styles from '../styles/Home.module.css'

const RegisterPage: NextPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <RegisterForm />
            </main>
        </div>
    )
}

export default RegisterPage;
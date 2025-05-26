import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/not-found.module.css'

export default function NotFound() {
    return (
        <>
        <div className={styles.notFoundContent}>
            <h1 className={styles.title}>404</h1>
            <Image
                src="/img/404.svg"
                width={300}
                height={300}
                alt="Menino com skate esparando ônibus"
                className='404-img'
            />
            <p className={styles.text}>Parece que esta página não existe!</p>
            <Link href='/'>
                Voltar
            </Link>
            </div>
        </>
    )
}
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
                <div className={styles.voltar}>
                    <Link href='/' className='no-underline'>
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"  className={styles.setaVoltar} >
                                <path d="M17 7H1M1 7L7 1M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                        <p className='text-[#fff] no-underline m-0'>Voltar</p>
                    </Link>
                </div>

            </div>
        </>
    )
}
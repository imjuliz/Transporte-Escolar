import Link from 'next/link';
import Image from 'next/image';

export default function NotFound(){
    return(
        <>
        <h1>404</h1>
        <p>Parece que esta página não existe!</p>
        <Link href='/'>
        <a>Voltar</a>
        </Link>
        </>
    )
}
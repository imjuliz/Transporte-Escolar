"use client"
import { usePathname, useRouter } from 'next/navigation';

export default function dashboard() {
    const router = useRouter();

    useEffect(() => {
      const isAutenticado = false; // substitua com sua lógica real
  
      if (!isAutenticado) {
        router.push('/login');
      }
    }, []);

return (
    <>
    <h1>Bem-vindo ao Dashboard</h1>
    </>
)
}

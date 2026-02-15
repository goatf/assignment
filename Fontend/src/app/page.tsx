import Link from 'next/link';
import styles from './page.module.css'; // Using default styles if available, or just inline for simplicity

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '2rem',
      background: 'linear-gradient(to bottom, #f0f2f5, #e2e8f0)'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2d3748' }}>
        Patient Management System
      </h1>
      <Link href="/patients" style={{
        padding: '1rem 2rem',
        background: '#6a11cb',
        color: 'white',
        borderRadius: '12px',
        textDecoration: 'none',
        fontSize: '1.2rem',
        fontWeight: '600',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        Go to Patients
      </Link>
    </main>
  );
}

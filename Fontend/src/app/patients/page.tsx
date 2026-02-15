import Link from 'next/link';
import styles from './page.module.css';
import { Patient } from '@/types/Patient';

// Mock Data
const mockPatients: Patient[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123-456-7890',
        tenantId: 'T001',
        createdAt: new Date().toISOString(),
        primaryBranchId: 'B001'
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '987-654-3210',
        tenantId: 'T002',
        createdAt: new Date().toISOString(),
    }
];

export default function PatientsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>All Patients</h1>
                <Link href="/patients/create" className={styles.createButton}>
                    + Create New Patient
                </Link>
            </div>

            <div className={styles.grid}>
                {mockPatients.length > 0 ? (
                    mockPatients.map((patient) => (
                        <div key={patient.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.name}>{patient.firstName} {patient.lastName}</div>
                                <span className={styles.tenantBadge}>{patient.tenantId}</span>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.infoRow}>
                                    <span>📞 {patient.phoneNumber}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span>📅 Created: {new Date(patient.createdAt).toLocaleDateString()}</span>
                                </div>
                                {patient.primaryBranchId && (
                                    <div className={styles.infoRow}>
                                        <span>🏢 Branch: {patient.primaryBranchId}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        No patients found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}

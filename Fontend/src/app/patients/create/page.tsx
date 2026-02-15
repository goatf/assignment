import PatientForm from '@/components/PatientForm';
import styles from '@/components/PatientForm.module.css'; // Reusing form styles for container if needed, or specific page styles

export default function CreatePatientPage() {
    return (
        <div style={{ padding: '2rem' }}>
            <PatientForm />
        </div>
    );
}

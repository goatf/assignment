"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PatientForm.module.css';
import { Patient } from '@/types/Patient';

interface PatientFormProps {
    initialData?: Partial<Patient>;
    onSubmit?: (data: Omit<Patient, 'id' | 'createdAt'>) => void;
}

export default function PatientForm({ initialData, onSubmit }: PatientFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        phoneNumber: initialData?.phoneNumber || '',
        tenantId: initialData?.tenantId || '',
        primaryBranchId: initialData?.primaryBranchId || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.tenantId.trim()) newErrors.tenantId = 'Tenant ID is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form Data:', formData);

            if (onSubmit) {
                onSubmit(formData);
            } else {
                // Default behavior if no submit handler (e.g., demo)
                alert('Patient saved successfully! (Mock)');
                router.push('/patients');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.title}>{initialData ? 'Edit Patient' : 'Create New Patient'}</h2>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstName">First Name *</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={styles.input}
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                />
                {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="lastName">Last Name *</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={styles.input}
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                />
                {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phoneNumber">Phone Number *</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={styles.input}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />
                {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="tenantId">Tenant ID *</label>
                <input
                    type="text"
                    id="tenantId"
                    name="tenantId"
                    className={styles.input}
                    value={formData.tenantId}
                    onChange={handleChange}
                    placeholder="Enter tenant ID"
                />
                {errors.tenantId && <p className={styles.error}>{errors.tenantId}</p>}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="primaryBranchId">Primary Branch ID (Optional)</label>
                <input
                    type="text"
                    id="primaryBranchId"
                    name="primaryBranchId"
                    className={styles.input}
                    value={formData.primaryBranchId}
                    onChange={handleChange}
                    placeholder="Enter branch ID"
                />
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Patient'}
            </button>
        </form>
    );
}

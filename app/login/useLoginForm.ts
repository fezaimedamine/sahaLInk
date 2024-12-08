import { useState } from 'react';
import { LoginFormData, UserRole } from '@/app/login/auth';
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function useLoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Fetches the patient ID using the email address.
   *
   * @param email - The email address of the patient.
   * @returns {Promise<string | null>} - Resolves to the patient ID or null if not found.
   */
  const fetchPatientIdByEmail = async (email: string): Promise<string | null> => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('patients') // Table name
        .select('patient_id')     // Column to fetch
        .eq('email', email) // Filter by email
        .single();        // Expect only one result

      if (error) {
        console.error('Error fetching patient ID:', error);
        return null;
      }
      return data?.patient_id || null;
    } catch (err) {
      console.error('Unexpected error fetching patient ID:', err);
      return null;
    }
  };
  const fetchDoctorIdByEmail = async (email: string): Promise<string | null> => {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('doctors') // Table name
        .select('doctor_id')     // Column to fetch
        .eq('email', email) // Filter by email
        .single();        // Expect only one result

      if (error) {
        console.error('Error fetching patient ID:', error);
        return null;
      }
      return data?.doctor_id || null;
    } catch (err) {
      console.error('Unexpected error fetching patient ID:', err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid. Submitting...', { ...formData });

      setAuthError(null);
      setIsLoading(true);
      try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (data) {
          let metadata = data.user?.user_metadata;

          if (metadata?.role === 'doctor') {
            const doctorId = await fetchDoctorIdByEmail(formData.email);
            console.log(doctorId)
            router.push(`/dashboardDoctor/${doctorId}`);
          } else if (metadata?.role === 'patient') {
            const patientId = await fetchPatientIdByEmail(formData.email);
            if (patientId) {
              router.push(`/dashboardPatient/${patientId}`);
            } else {
              setAuthError('Patient ID not found.');
            }
          } else {
            setAuthError('Invalid user role');
            return Promise.reject(new Error('Invalid user role'));
          }
        }
        if (error) {
          setAuthError(error.message);
          return Promise.reject(error);
        } else {
          console.log('User logged in:', data);
          return Promise.resolve(data);
        }
      } catch (err) {
        console.error('Login error:', err);
        setAuthError('An unexpected error occurred');
        return Promise.reject(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    formData,
    errors,
    isLoading,
    authError,
    handleInputChange,
    handleSubmit,
  };
}

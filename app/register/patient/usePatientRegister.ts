import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  state: string;
  gender: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  state?: string;
  gender?: string;
  general?: string;
}

/**
 * Custom hook for managing the state and submission of the patient sign-up form.
 *
 * This hook provides:
 * - State management for form fields.
 * - Handlers for input changes and form submission.
 * - Integration with Supabase for user registration.
 * - Validation of form fields.
 *
 * @returns {object} An object containing form state, handlers, and error messages.
 */
const usePatientRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    state: '',
    gender: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  /**
   * Handles changes in form inputs.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  /**
   * Validates the form data.
   *
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 8 digits.';
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required.';
    }

    if (!formData.gender.trim()) {
      newErrors.gender = 'Gender is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission and registers the user using Supabase.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Patient form submitted:', formData);

    // Validate form
    if (!validateForm()) {
      return; // Do not proceed if validation fails
    }

    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_number: formData.phoneNumber,
            date_of_birth: formData.dateOfBirth,
            state: formData.state,
            gender: formData.gender,
            role: 'patient',
          },
        },
      });

      if (error) throw error;

      // Redirect after successful registration
      router.push('/login');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message || 'An unexpected error occurred.',
      }));
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default usePatientRegister;

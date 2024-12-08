import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client';

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  dateOfBirth: string
  state: string
  gender: string
  licenseNumber: string
  specialty: string
  workdays: string[]
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
  licenseNumber?: string;
  specialty?: string;
  workdays?: string;
  general?: string;
}

/**
 * Custom hook for managing the state and submission of the doctor sign-up form.
 *
 * This hook provides all the necessary handlers to manage the form data, including:
 * - State management for form fields
 * - Handlers for input changes and form submission
 * - Integration with Supabase for user registration
 * - Validation of form fields
 *
 * @returns {object} An object containing the form data, input change handlers, form submission handler, and error messages.
 * - formData: The current state of the form data.
 * - handleChange: Function to handle changes in text and select inputs.
 * - handleWorkdaysChange: Function to handle changes in the workdays checkboxes.
 * - handleSubmit: Function to handle form submission and user registration.
 * - errors: An object containing validation error messages for each field.
 */
const useDoctorRegister = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    state: '',
    gender: '',
    licenseNumber: '',
    specialty: '',
    workdays: []
  })
  const [errors, setErrors] = useState<Errors>({})

  /**
   * Handles changes in text and select inputs.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  /**
   * Handles changes in the workdays checkboxes.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The checkbox change event.
   */
  const handleWorkdaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      workdays: checked
        ? [...prevState.workdays, value]
        : prevState.workdays.filter(day => day !== value)
    }))
  }

  /**
   * Validates the form data.
   *
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    const newErrors: Errors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.'
    } else if (!/^\d{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 8 digits.'
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required.'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required.'
    }

    if (!formData.gender.trim()) {
      newErrors.gender = 'Gender is required.'
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required.'
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = 'Specialty is required.'
    }

    if (formData.workdays.length === 0) {
      newErrors.workdays = 'At least one workday must be selected.'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handles form submission and registers the user using Supabase.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Doctor form submitted:', formData)

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
            license_number: formData.licenseNumber,
            specialty: formData.specialty,
            workdays: formData.workdays,
            role: 'doctor'
          }
        }
      })
      if (error) throw error
      router.push('/dashboardDoctor/${data.user?.id}')
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setErrors(prevErrors => ({
        ...prevErrors,
        general: error.message || 'An unexpected error occurred.'
      }));
    }
  }

  return {
    formData,
    handleChange,
    handleWorkdaysChange,
    handleSubmit,
    errors
  }
}

export default useDoctorRegister

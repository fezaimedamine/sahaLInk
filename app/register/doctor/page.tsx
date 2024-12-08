"use client"

import Link from 'next/link'
import Layout from '@/app/register/components/layout'
import { tunisiaStates } from '@/app/register/utils/utils_tunisiaStates'
import { specialityData } from '@/public/assets'
import useDoctorSignUpForm from '@/app/register/doctor/useDoctorRegister'


/**
 * DoctorSignUp Component
 *
 * This component renders the doctor sign-up form and handles form submission using the custom hook `useDoctorSignUpForm`.
 * It provides fields for user details, including name, email, password, phone number, date of birth, state, gender, license number,
 * specialty, and workdays. The form also validates user input and displays appropriate error messages.
 *
 * @returns {JSX.Element} The rendered doctor sign-up form.
 */
export default function DoctorSignUp() {
  const { 
    formData, 
    handleChange, 
    handleWorkdaysChange, 
    handleSubmit, 
    errors 
  } = useDoctorSignUpForm()

  return (
    <Layout title="Doctor Sign Up">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            name="state"
            id="state"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          >
            <option value="">Select a state</option>
            {tunisiaStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                required
                className="form-radio"
                onChange={handleChange}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                required
                className="form-radio"
                onChange={handleChange}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
            License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            id="licenseNumber"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChange}
          />
          {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
        </div>
        <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
              specialty
            </label>
            <select
              name="specialty"
              id="specialty"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleChange}
            >
              <option value="">Select a specialty</option>
              {specialityData.map(specialty => (
                <option key={specialty.id} value={specialty.speciality}>
                  {specialty.speciality}
                </option>
              ))}
            </select>
            {errors.specialty && <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Workdays</label>
          <div className="mt-1 space-y-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <label key={day} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="workdays"
                  value={day}
                  className="form-checkbox"
                  onChange={handleWorkdaysChange}
                />
                <span className="ml-2">{day}</span>
              </label>
            ))}
          </div>
          {/* {formData.workdays.length === 0 && <p className="mt-1 text-sm text-red-600">At least one workday must be selected.</p>} */}
          {errors.workdays && <p className="mt-1 text-sm text-red-600">{errors.workdays}</p>}
        </div>
        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Sign Up
          </button>
        </div>
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errors.general}</span>
          </div>
      )}
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <Link href="/login" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Already have an account? Sign In
            </Link>
          </div>
          <div>
            <Link href="/register/patient" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Not a Doctor? Sign Up as a Patient
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { UserCircle, Stethoscope } from 'lucide-react'
import { UserRole } from '@/app/login/auth' 

/**
 * Registration role selection page.
 * 
 * This component allows users to select their registration role
 * (either 'Patient' or 'Doctor') and navigate to the corresponding registration page.
 *
 * @component
 */
export default function Register() {
  const router = useRouter()
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null)

  /**
   * Handles role selection and redirects the user to the appropriate registration page.
   *
   * @param {UserRole} role - The role selected by the user ('patient' or 'doctor').
   */
  const handleRoleSelection = (role: UserRole) => {
    router.push(`/register/${role}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Choose Your Role
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select how you'd like to register
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            {/* Patient Registration Button */}
            <button
              onClick={() => handleRoleSelection('patient')}
              onMouseEnter={() => setHoveredRole('patient')}
              onMouseLeave={() => setHoveredRole(null)}
              className={`w-full flex items-center justify-center px-4 py-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                hoveredRole === 'patient' ? 'bg-indigo-700' : 'bg-indigo-600'
              } hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
            >
              <UserCircle className="mr-3 h-6 w-6" />
              Register as Patient
            </button>
            <p className="text-sm text-gray-500 text-center">
              Sign up to access patient features and manage your health information
            </p>
            
            {/* Doctor Registration Button */}
            <button
              onClick={() => handleRoleSelection('doctor')}
              onMouseEnter={() => setHoveredRole('doctor')}
              onMouseLeave={() => setHoveredRole(null)}
              className={`w-full flex items-center justify-center px-4 py-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                hoveredRole === 'doctor' ? 'bg-green-700' : 'bg-green-600'
              } hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200`}
            >
              <Stethoscope className="mr-3 h-6 w-6" />
              Register as Doctor
            </button>
            <p className="text-sm text-gray-500 text-center">
              Join our network of medical professionals and provide care to patients
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
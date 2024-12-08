'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client';

interface PatientProfile {
  first_name: string 
  last_name: string 
  email: string
  phone_number: string
  date_of_birth: string 
  state: string
  gender: string
}

export default function PatientProfile() {
  const [profile, setProfile] = useState<PatientProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) throw new Error('Not authenticated')

        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('patient_id', user.id)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (e) {
        setError('Failed to fetch profile')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">No profile found</div>
  }

  // Format dateOfBirth as a readable date
  const formattedDateOfBirth = new Date(profile.date_of_birth).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl"> {/* Increase the max-width */}
        <div className="bg-white py-10 px-8 shadow-lg sm:rounded-lg sm:px-12"> {/* Increased padding */}
          <dl className="space-y-6"> {/* Increased space between items */}
            <ProfileItem label="First Name" value={profile.first_name} />
            <ProfileItem label="Last Name" value={profile.last_name} />
            <ProfileItem label="Phone Number" value={profile.phone_number} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Date of Birth" value={formattedDateOfBirth} />
            <ProfileItem label="State" value={profile.state} />
            <ProfileItem label="Gender" value={profile.gender} />
          </dl>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleLogout}
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  )
}

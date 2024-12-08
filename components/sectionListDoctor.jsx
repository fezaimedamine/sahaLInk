import { useState, useEffect } from 'react';
import { supabase } from './clientSupabase';
import { tunisiaStates } from '@/app/register/utils/utils_tunisiaStates';
import AppointmentScheduler from './makeAppointements';

function DoctorsList({ id }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [selectedTimeConsultation, setConsultation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const now = new Date();

  // Helper function to fix array data
  function fixArray(input) {
    const combinedString = input.join('');
    const cleanedString = combinedString.replace(/[\[\]"]/g, "").trim();
    return cleanedString.split(' ').map(item => item.trim());
  }

  // Fetch doctors from the database
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase.from('doctors').select('*');
      if (error) {
        console.error('Error fetching doctors:', error);
      } else {
        setDoctors(data);
      }
    };
    fetchDoctors();
  }, []);

  // Apply filters to doctor list
  useEffect(() => {
    // Reset selectedDoctor when filters change
    setSelectedDoctor(null);

    const results = doctors.filter((doctor) => {
      const matchesName =
        doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState ? doctor.state === selectedState : true;
      const matchesGender = selectedGender ? doctor.gender === selectedGender : true;
      const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
      return matchesName && matchesState && matchesGender && matchesSpecialty;
    });
    setFilteredDoctors(results);
  }, [searchTerm, selectedState, selectedGender, selectedSpecialty, doctors]);

  // Fetch doctor availability when a doctor is selected
  useEffect(() => {
    if (selectedDoctor != null) {
      const fetchAvailability = async () => {
        const { data, error } = await supabase
          .from('availability')
          .select('*')
          .eq('doctor_id', selectedDoctor.doctor_id);
        if (error) {
          console.error('Error fetching availability:', error);
        } else {
          setAvailability(data);
        }
      };
      fetchAvailability();
    }
  }, [selectedDoctor]);

  // Insert appointment when time is selected
  useEffect(() => {
    const insertAppointment = async () => {
      try {
        const appointmentDate = new Date(selectedTimeConsultation.date).toISOString();
        const { data, error } = await supabase
          .from('appointment')
          .insert({
            status: 'confirm',
            availability_id: selectedTimeConsultation.availability_id,
            appointment_date: appointmentDate,
            reason: 'no reason',
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
          });
        if (error) {
          console.error('Error inserting appointment:', error);
          alert('An error occurred while inserting the data. Please check!');
        } else {
          console.log('Appointment inserted successfully:', data);
          setConsultation(null);  // Reset after insertion
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };
    if (selectedTimeConsultation != null) {
      insertAppointment();
    }
  }, [selectedTimeConsultation, supabase]);

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Doctor <span className="text-blue-700">List</span>
      </h1>

      {/* Search Bar */}
      <div className="search-bar flex items-center justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-xl p-3 w-full md:w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition hover:placeholder:text-gray-400"
        />
      </div>

      {/* Filters */}
      <div className="filters flex justify-center mb-8 space-x-4">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border rounded-xl p-3"
        >
          <option value="">All States</option>
          {tunisiaStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="border rounded-xl p-3"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="border rounded-xl p-3"
        >
          <option value="">All Specialties</option>
          <option value="General physician">General physician</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatricians">Pediatricians</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
        </select>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 ? (
          <p className="col-span-3 text-center text-lg text-gray-600">No doctors found</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.doctor_id}
              className="cursor-pointer bg-indigo-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="flex items-center mb-4">
                <img
                  src={doctor.profile_image_url}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-bold text-blue-700">
                    {doctor.first_name} {doctor.last_name}
                  </p>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-green-500 font-medium">Available</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Selected Doctor Details */}
      {selectedDoctor && (
        <div className="text-center mt-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <img
            src={selectedDoctor.profile_image_url}
            alt={selectedDoctor.name}
            className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
          />
          <h2 className="text-2xl font-bold mb-2">
            Doctor: <span className="text-blue-700">{selectedDoctor.last_name}</span>
          </h2>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Specialization: {selectedDoctor.specialty}
          </h3>

          {/* Working Days as Rounded Rectangles */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {fixArray(selectedDoctor.workdays).map((day, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {day}
              </span>
            ))}
          </div>

          <AppointmentScheduler doctor_id={selectedDoctor.doctor_id} patient_id={id} workdays={fixArray(selectedDoctor.workdays)} />
        </div>
      )}
    </div>
  );
}

export default DoctorsList;

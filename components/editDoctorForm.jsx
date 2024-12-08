"use client";
import React, { useState } from "react";
import { supabase } from "./clientSupabase";

export default function EditDoctorForm({ doctorInitial, onSave }) {
  const now = new Date();
  now.setHours(now.getHours() + 1);

  const [doctor, setDoctor] = useState(doctorInitial);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const tunisiaStates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja",
    "Jendouba", "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid", "Sousse",
    "Monastir", "Mahdia", "Sfax", "Gafsa", "Tozeur", "Kebili", "Gabès", "Medenine", "Tataouine"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      setUploading(true);
  
      const fileName = `profile-images/${doctor.doctor_id}-${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("doctor-profiles")
        .upload(fileName, file);
  
      if (uploadError) {
        console.error("Error uploading profile picture:", uploadError);
        setMessage("Error uploading profile picture.");
        return;
      }
  
      console.log("Uploaded File Data:", data);
  
      // Manually construct the public URL
      const publicUrl = `https://fpllktffrytpfzjydogw.supabase.co/storage/v1/object/public/${data.fullPath}`;
  
      console.log("Manually Generated Public URL:", publicUrl);
  
      const updatedDoctor = { ...doctor, profile_image_url: publicUrl };
      setDoctor(updatedDoctor);
  
      // Update the database
      const { error: updateError } = await supabase
        .from("doctors")
        .update({ profile_image_url: publicUrl })
        .eq("doctor_id", doctor.doctor_id);
  
      if (updateError) {
        console.error("Database Update Error:", updateError);
        setMessage(`Error updating database: ${updateError.message}`);
      } else {
        onSave(updatedDoctor);
        setMessage("Profile picture updated successfully!");
      }
    } catch (err) {
      console.error("Unexpected error during file upload:", err);
      setMessage("Unexpected error during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const updateDoctorInSupabase = async (updatedDoctor) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("doctors")
        .update({
          first_name: updatedDoctor.first_name,
          last_name: updatedDoctor.last_name,
          email: updatedDoctor.email,
          phone: updatedDoctor.phone,
          state: updatedDoctor.address,
          specialty: updatedDoctor.speciality,
          updated_at: now.toISOString(),
        })
        .eq("doctor_id", updatedDoctor.doctor_id);

      if (error) {
        console.error("Error updating doctor:", error);
        setMessage("Error updating doctor information.");
      } else {
        setMessage("Doctor information updated successfully!");
        onSave(updatedDoctor);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoctorInSupabase(doctor);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Edit Doctor Information
      </h2>
      {message && (
        <p className={`text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"} mb-4`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
          {doctor.profile_image_url && (
            <img
              src={doctor.profile_image_url}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
        </div>
        {/* Other Form Fields */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            value={doctor.first_name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={doctor.last_name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={doctor.email || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={doctor.phone || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Speciality</label>
          <input
            type="text"
            name="speciality"
            value={doctor.speciality || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter speciality"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-gray-700 font-medium mb-1">
            State
          </label>
          <select
            name="state"
            id="state"
            value={doctor.state || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              {doctor.address || "Select your state"}
            </option>
            {tunisiaStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded-xl font-medium transition ${
            loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 border"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

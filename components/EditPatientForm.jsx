"use client";
import React, { useState } from "react";
import { supabase } from "./clientSupabase";



export default function EditPatientForm({ patientInitial, onSave }) {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const [patient, setPatient] = useState(patientInitial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const tunisiaStates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja',
    'Jendouba', 'Kef', 'Siliana', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Sousse',
    'Monastir', 'Mahdia', 'Sfax', 'Gafsa', 'Tozeur', 'Kebili', 'Gabès', 'Medenine', 'Tataouine'
  ]

  // Fonction pour gérer les modifications des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  // Fonction pour mettre à jour les informations dans Supabase
  const updatePatientInSupabase = async (updatedPatient) => {
    console.log(updatedPatient)
    try {
      setLoading(true);
      const { error } = await supabase
        .from("patients")
        .update({
          first_name: updatedPatient.first_name,
          last_name: updatedPatient.last_name,
          email: updatedPatient.email,
          phone_number: updatedPatient.phone,
          address: updatedPatient.address,
          updated_at: now.toISOString(),
        })
        .eq("patient_id", updatedPatient.patient_id); // Utilisez un `id` unique pour identifier le patient

      if (error) {
        console.error("Erreur lors de la mise à jour :", error);
        setMessage("Erreur lors de la mise à jour des informations.");
      } else {
        setMessage("Informations mises à jour avec succès !");
        onSave(updatedPatient); // Met à jour les informations côté parent
      }
    } catch (err) {
      console.error("Erreur inattendue :", err);
      setMessage("Une erreur inattendue s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePatientInSupabase(patient); // Appel pour sauvegarder dans Supabase
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
    Modifier vos Informations
  </h2>
  {message && (
    <p className="text-center text-green-500 mb-4">
      {message}
    </p>
  )}
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* First Name */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Prénom
      </label>
      <input
        type="text"
        name="first_name"
        value={patient.first_name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg "
        placeholder="Entrez votre prénom"
      />
    </div>
    {/* Last Name */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Nom
      </label>
      <input
        type="text"
        name="last_name"
        value={patient.last_name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        placeholder="Entrez votre nom"
      />
    </div>
    {/* Email */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={patient.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg "
        placeholder="Entrez votre email"
      />
    </div>
    {/* Phone */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        Téléphone
      </label>
      <input
        type="tel"
        name="phone"
        value={patient.phone_number}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg "
        placeholder="Entrez votre téléphone"
      />
    </div>
    {/* State */}
    <div>
      <label htmlFor="state" className="block text-gray-700 font-medium mb-1">
        Gouvernorat
      </label>
      <select
        name="state"
        id="state"
        value={patient.state || ""}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg"
      >
        <option value="" disabled>
          {patient.address || "Sélectionnez votre gouvernorat"}
        </option>
        {tunisiaStates.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
    {/* Submit Button */}
    <button
      type="submit"
      className={`w-full py-2 rounded-xl font-medium transition ${
        loading
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 border"
      }`}
      disabled={loading}
    >
      {loading ? "En cours..." : "Sauvegarder les modifications"}
    </button>
  </form>
</div>

  );
}

"use client";

import React, { useState, useEffect } from "react";
import EditPatientForm from "./EditPatientForm";
import { supabase } from "./clientSupabase";

export default function UpdateCompte({id}) {
  const [patient, setPatient] = useState(null);
  // Fonction pour récupérer les données du patient
  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("patients").select("*").eq('patient_id', id).single();
      if (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } else {
        setPatient(data);
      }
    } catch (err) {
      console.error("Erreur inattendue :", err);
    }
  };

  useEffect(() => {
    fetchData(); // Récupération des données au chargement de la page
  }, []);

  const updatePatient = (updatedPatient) => {
    setPatient(updatedPatient); // Met à jour les informations du patient
  };

  if (!patient) {
    return (
      <div className="text-center text-gray-800">
        <p>Chargement des données du patient...</p>
        <button onClick={fetchData} className="text-blue-500 underline">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto">
       
        <EditPatientForm patientInitial={patient} onSave={updatePatient} />
      </div>
      
    </div>
  );
}

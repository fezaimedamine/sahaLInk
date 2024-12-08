import FutureAppointments from "./futurAppointement";
export default function SectionA({id}) {
  console.log("sectioA"+id)
    return(
      <div>
          <header className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-blue-700">Welcome</span> to your{" "}
          <span className="text-blue-700">Dashboard</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your appointments, update your information.
        </p>
      </header>

          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Section : Mes Rendez-vous */}
              <div className="bg-white shadow-md rounded-xl p-4">
                <FutureAppointments id={id}/>
              </div>

              {/* Section : Mes Fichiers */}
              <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-xl font-bold text-gray-800">Mes Fichiers</h2>
                <p className="text-gray-600 mt-2">Accédez à vos documents importants.</p>
              </div>

              
            </div>
          </main>
    </div>
    );
}
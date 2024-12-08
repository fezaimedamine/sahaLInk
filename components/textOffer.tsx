import { ClipboardIcon } from "@heroicons/react/24/outline";

const MissionSection: React.FC = () => {
  return (
    <div
      className="bg-blue-600 mt-16 text-white py-20 px-6 text-center flex items-center justify-center min-h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
    >
      <div className="max-w-3xl bg-opacity-70 p-8 rounded-lg">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
            <ClipboardIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            Our Mission
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-gray-100 leading-relaxed mb-6">
          At SahaLink, our mission is to <span className="font-semibold">empower patients</span> and healthcare professionals by bridging the gap between them with
          <span className="font-semibold"> innovative technology</span>, ensuring better health outcomes and a smoother experience.
        </p>

        <p className="text-lg sm:text-xl text-gray-100 leading-relaxed mb-6">
          Join the <span className="font-semibold text-blue-200">SahaLink community</span> today, and together, let’s make healthcare more accessible for everyone.
        </p>

        <a
          href=""
          className="inline-block bg-blue-800 text-white py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 mt-6"
        >
          Join Us Today
        </a>
      </div>
    </div>
  );
};

export default MissionSection;

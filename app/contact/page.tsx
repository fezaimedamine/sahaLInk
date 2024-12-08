import ContactForm from "@/components/contactForm";

export default function Contact() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-600">
      {/* Blue Section */}
      <section className="relative flex items-center justify-center w-full h-full md:w-1/2  text-white p-8 md:p-16">
        <div className="text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Get in Touch with Us!
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
            We&#39;re here to help with any questions, feedback, or support you need. Whether you&#39;re a patient or a healthcare provider, we value your input and are committed to ensuring your experience with SahaLink is excellent.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
     
        <div className="w-full max-w-md h-full bg-white shadow-lg rounded-lg p-6">
          <ContactForm />
        </div>
      
    </div>
  );
}

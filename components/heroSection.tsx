import Image from "next/image";

interface HeroProps{
    title:string,
    content:string,
    imgSrc:string,
    link:string,
    btnContent:string,
}


export default function HeroSection({title,content,imgSrc,link,btnContent}:HeroProps) {
  return (
    <section className="relative mb-20 rounded-lg bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-16 h-auto md:h-[85vh] sm: w-full">
  
  <div className="md:w-1/2 text-center md:text-left space-y-4 mb-8 md:mb-0 md:ml-10">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
      {title}
    </h1>
    <p className="text-base sm:text-lg md:text-xl leading-relaxed">
      {content}
    </p>
    <a
      href={link}
      className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition"
    >
      {btnContent}
    </a>
  </div>

  
  <div  >
    <Image
      src={imgSrc}
      alt="image"
      width={800}
      height={600}
      className="w-full   absolute right-6 bottom-0  max-w-xl sm:max-w-sm md:max-w-md lg:max-w-3xl h-auto"
    />
  </div>
</section>

  );
}

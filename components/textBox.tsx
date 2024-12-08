import Image from "next/image";
interface textBoxProps {
    text: string,
    iconSrc: any,
}
// components/TextBox.tsx

  const TextBox= ({ text,iconSrc }:textBoxProps ) => {
    return (
      <div className=" flex items-center gap-4 border border-gray-300 rounded-lg p-4 max-w-md mx-auto my-4 shadow-lg hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in-out">
        <Image src={iconSrc} alt="icon" width={50} height={50} />
        <p className="text-gray-800 text-base leading-relaxed">{text}</p>
      </div>
    );
  };
  
  export default TextBox;
  
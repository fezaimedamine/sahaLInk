

interface contentType{
    title:string,
    content:string,
}

const CenteredContent = ({ title, content }: contentType) => {
  return (
    <div className="flex items-center justify-center mb-5">
      <div className="text-center bg-white p-8  max-w-4xl w-full">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-700">
          {content}
        </p>
      </div>
    </div>
  );
}
export default CenteredContent
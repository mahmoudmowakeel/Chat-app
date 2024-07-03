export default function Spinner({ content }) {
  return (
    <>
      <div className="flex justify-center items-center mt-[80px]">
        <div className="block animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      <p className="text-center mt-2 font-semibold">Loading {content}...</p>
    </>
  );
}

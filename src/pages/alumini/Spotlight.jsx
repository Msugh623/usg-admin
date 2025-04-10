import { FaPen } from 'react-icons/fa';

export default function Spotlight() {
  return (
    <div className="flex flex-col mt-4  items-center bg-white p-8 rounded-xl max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 tracking-wide">Alumni Spotlight</h2>

      {/* Profile Image and Quote */}
      <div className="d-flex flex-column items-center mb-6">
        <img
          src="/path-to-image.jpg"
          alt="Chief Mrs. Nike Okundaye"
          className="w-20 h-20 rounded-full border-4 border-white shadow-md"
        />
        <div className="relative mt-4 text-center min-w-[80%] ">
          <textarea
            className="w-full text-center bg-transparent resize-none text-sm font-medium text-gray-700 leading-relaxed focus:outline-none"
            rows={3}
            defaultValue={`“Looking back, I’m grateful for every twist and turn my journey took and I owe it to the U.S. Embassy in Nigeria”- Chief Mrs. Nike Okundaye`}
          />
          <FaPen className="absolute top-1 right-1 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Spotlight Text */}
      <div className="relative w-full bg-gray-100 border border-gray-300 rounded-lg p-4">
        <textarea
          className="w-full h-56 bg-transparent resize-none text-sm text-gray-800 leading-relaxed focus:outline-none"
          defaultValue={`An exclusive chat with an International Visitor Leadership Program (IVLP) Alumna Chief Mrs. Nike Monica Okundaye. Mama Nike as fondly called, is principally a social entrepreneur and a well-known philanthropist championing the cause of neglected Nigerian rural women using art as a tool to accomplish these noble missions. She is an accomplished professional artist; a painter, a textile artist, a weaver, an embroider, and a winner of awards at national and international art shows. Mama Nike stopped schooling at the Basic 6 school level at her village in Ogidi-Ijumu in Kogi State of Nigeria...`}
        />
        <FaPen className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}

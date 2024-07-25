import { useSearchParams } from "react-router-dom";

export const Transferdone= ()=>{

const [searchParams] = useSearchParams();
const fname=searchParams.get("firstname");
const lname = searchParams.get("lastname");
const amount = searchParams.get("amount");


  return (
    <div className="flex items-center justify-center min-h-screen bg-green-600">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl font-bold text-green-600 mr-2">
            Transfer Done
          </h1>
          <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p className="text-2xl text-gray-800">
          Amount: <span className="font-semibold">{amount}</span>
        </p>
        <p className="text-2xl text-gray-800">
          Transferred to: <span className="font-semibold">{fname} {lname}</span>
        </p>
      </div>
    </div>
  );
      
}
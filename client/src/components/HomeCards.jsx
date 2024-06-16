import React from "react";

const HomeCards = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto">
        <div className="grid w-5/6 gap-8 mx-auto md:grid-cols-2">
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-black">
              For Developers
            </h2>
            <p className="mb-4 text-gray-700">
              Browse our React jobs and start your career today
            </p>
            <button className="px-4 py-2 text-white bg-black rounded">
              Browse Jobs
            </button>
          </div>
          <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-black">
              For Employers
            </h2>
            <p className="mb-4 text-gray-700">
              List your job to find the perfect developer for the role
            </p>
            <button className="px-4 py-2 text-white bg-blue-500 rounded">
              Add Job
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;

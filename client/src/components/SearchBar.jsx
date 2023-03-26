import { useState } from "react";

const SearchBar = ({className}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the search term
  };

  return (
    <form className={`flex relative ${className}`} onSubmit={handleSubmit}>
      <input
        className="rounded-l-lg py-2 px-4 border-t mr-0 ml-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="px-4 py-2 font-semibold text-white bg-green-500 rounded-r-lg hover:bg-green-600 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

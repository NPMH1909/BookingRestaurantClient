import React from "react";
import { Typography } from "@mui/material";

const SearchSuggestions = ({ suggestions, searchTerm, setSearchTerm, handleSearch, handleSuggestionClick }) => {
    return (
        <div className="col-span-1 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex w-full bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nhập tên nhà hàng..."
                    className="flex-1 border-none px-4 py-2 focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600 transition-all"
                >
                    🔍 Tìm
                </button>
            </div>

            <Typography variant="h5" className="mb-2">Mọi người quan tâm</Typography>
            <ul className="list-disc pl-5">
                {suggestions?.map((suggestion, index) => (
                    <li key={index}>
                        <button
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="flex items-center w-full p-2 rounded-lg bg-white hover:bg-gray-200 transition-all"
                        >
                            <span className="text-base font-thin text-black">{suggestion}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSuggestions;

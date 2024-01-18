import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMic } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  useEffect(() => {
    if (isListening) {
      handleSpeechRecognition();
    }
  }, [isListening]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-3 text-gray-400 focus-within:text-gray-600">
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-10 h-10 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 text-base text-[#ff5151] p-4 font-xl"
          placeholder="Search all here...."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={() => setIsListening(!isListening)}>
          <FiMic aria-hidden="true" className={`w-10 h-10 ml-2 ${isListening ? 'text-green-500' : 'text-gray-500'}`} />
        </button>
      </div>
    </form>
  );
};

export default Searchbar;

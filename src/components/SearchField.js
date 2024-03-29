import { useContext, useState, useEffect } from "react"
import { ImageContext } from "../App";
import axios from 'axios';


const SearchField = () => {
  const [searchValue, setSearchValue] = useState(null);
  const { fetchData, setSearchImage } = useContext(ImageContext);
  const [topSearch, settopSearch] = useState([]);
  console.log("hi",topSearch)

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }
  const handleButtonSearch = () => {
    fetchData(`${searchValue}`)
    setSearchImage(searchValue);
  }
  const handleEnterSearch = e => {
    if (e.key === 'Enter') {
      fetchData(`${searchValue}`)
      setSearchImage(searchValue);
    }
  }
  useEffect(() => {
    axios
      .get('http://localhost:8080/')
      .then((result) => {
        settopSearch(result.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);
  

  return (
    <div className="flex">
      <input
        className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
        type="search"
        placeholder="Search Anything..."
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterSearch}
      />
      <button
        onClick={handleButtonSearch}
        disabled={!searchValue}
        className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
      >Search</button>
      
      
    </div>
  )
}

export default SearchField
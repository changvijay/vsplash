import { createContext, useState, useEffect } from "react";
import Images from "./components/Images";
import Jumbutron from "./components/Jumbutron";
import SearchField from "./components/SearchField";
import useAxios from "./hooks/useAxios";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import  {tsParticles} from "tsparticles-engine";


// Create Context
export const ImageContext = createContext();



function App() {
  const [searchImage, setSearchImage] = useState('');
  const { response, isLoading, error, fetchData } = useAxios(``);
  const [topSearch, settopSearch] = useState([]);

  const value = {
    response,
    isLoading,
    error,
    fetchData,
    searchImage,
    setSearchImage
  }
  tsParticles
  .load({
    id: "tsparticles",
    url: "presets/default.json",
  })
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });
  useEffect(() => {
    const fetchData = async () => {
      try{axios
        .get('http://localhost:8080/')
        .then((result) => {
          settopSearch(result.data);
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
        });} catch(err){console.error(err)}
    }
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageContext.Provider value={value}>
      <Jumbutron >
        <SearchField />
        </Jumbutron>
      <div>
      <div className="topSearch " >
        <center className="text-center text-2xl font-bold mt-0" >Top Search</center> <br></br>
        {topSearch.map((info) => (
          <div onClick={(g)=> fetchData(`${info.name}`)} className="center btn bg-light d-inline-block m-4" key={info._id}>
            {info.name} | {info.count}
          </div>
        ))}
      </div>
      </div>
      

      <Images />
    </ImageContext.Provider>
  );
}

export default App;

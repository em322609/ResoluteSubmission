import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { MDBBtn, MDBIcon, MDBFooter, MDBContainer, MDBCol, MDBInput, MDBRow, MDBSpinner } from 'mdb-react-ui-kit';

import './mdb.dark.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import CollectionView from './components/CollectionView/CollectionView';
import axios from 'axios';
import { title } from 'process';

const Dashboard = () => {
  const [inputValue, setInputValue] = useState("");
  const [movieCollectionData, setMovieCollectionData] = useState();

  const [ratingsCollectionData, setRatingsCollectionData] = useState();
  const [linksCollectionData, setLinksCollectionData] = useState();
  
  const [tagsCollectionData, setTagsCollectionData] = useState();
  const [movies, setMovies] = useState(new Array);
  
  const [suggestionArr, setSuggestionArr] = useState(new Array);
  useEffect(() => {
    const loadMovies = async () => {
    const response = await axios.get('http://localhost:5000/movies/all');
    setMovies(response.data)
    }
    loadMovies();
    }, [])
  
  /*
    Handler to submit a search query, result will return the entity and its associated metadata
  */
  const handleSubmit = async () => {
    // Call to python-flask to pull back movie table data
      await axios.get('http://localhost:5000/movies/'+inputValue)
        .then(async (response) => {
          setMovieCollectionData(response.data.result[0]);
          const movieIdLocal = response.data.result[0].movieId;
          await axios('http://localhost:5000/ratings/'+movieIdLocal).then(async (ratingsResponse) => {
            setRatingsCollectionData(ratingsResponse.data);
            await axios('http://localhost:5000/links/'+movieIdLocal).then(async (linksResponse) => {
              setLinksCollectionData(linksResponse.data)
              await axios('http://localhost:5000/tags/'+movieIdLocal).then(async (tagsResponse) => {
                setTagsCollectionData(tagsResponse.data)
              })
            })
          })
        });
  }
  const handleChangeAPI = () =>{
    let result = [];
    const firstThreeInputValues = inputValue.substring(0,3)
    const tempMovies = movies[0];
    if (inputValue.length > 0) {
      for(let temp = 0; temp < tempMovies.length; temp ++){
        const regex = new RegExp(firstThreeInputValues);   
        let innerObj = tempMovies[temp]
        let titleString = innerObj.title
        if(titleString.match(regex)){
          result.push(innerObj.title)
        }
      }   
    }
    setSuggestionArr(result)
  }
  const onSuggestHandler = (suggestion: React.SetStateAction<string>) => {
    setInputValue(suggestion)
    setSuggestionArr([])
  }
  return (
    <div>
  <header>
  <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-dark" style={{width: '5%', height: '100%'}}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <div className='row'>
              <div className='col'>
            <MDBIcon fas icon="home" />
            <MDBIcon className='sideBarCaret' fas icon="caret-right" />
            </div>
            </div>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <div className='row'>
              <div className='col'>
              <MDBIcon fas icon="chart-line" />            
              <MDBIcon className='sideBarCaret' fas icon="caret-right" />
            </div>
            </div>
          </a>
        </div>
      </div>
    </nav>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container navBarContainer">
        <a className="navbar-brand" href="#"></a>
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}} className="input-group">
          <input type="search" className="form-control navBarSearch" placeholder="Search for Movie..." aria-label="Search" value={inputValue} onChange={(e) => {setSuggestionArr(new Array);handleChangeAPI(); setInputValue(e.target.value)}} />
          <MDBBtn type="submit" outline color='info' style={{height:'35px', marginTop:'10px'}}>
            <MDBIcon fas icon="search" />
          </MDBBtn>
          {suggestionArr && suggestionArr.map((suggestion, i) =>
            <div className="suggestion col-md-8 justify-content-md-center" onClick={() => onSuggestHandler(suggestion)}>{suggestion}</div>
          )}
        </form>
        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
    <ul id="slide-out" className="side-nav fixed"></ul>
    </header>
    {movieCollectionData ? <h5 style={{marginTop: '100px', marginLeft: '100px'}}>Search Results for : {inputValue}</h5> : null}
    <CollectionView movieData={movieCollectionData} linksData={linksCollectionData} ratingsData={ratingsCollectionData} tagsData={tagsCollectionData}></CollectionView>
    <MDBFooter className='text-center fixed-bottom aroundTheBlockFooter' color='white' bgColor='dark'>
      <MDBContainer>
        <div className='pb-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', width:'100%', height:'100%'}}>
        <a className='text-white' href='#' style={{marginLeft:'10px'}}>
          Erik May -- Full-Stack Software Engineer Submission
        </a>
        </div>
        </MDBContainer>
    </MDBFooter>
    </div>
    
  );
};
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

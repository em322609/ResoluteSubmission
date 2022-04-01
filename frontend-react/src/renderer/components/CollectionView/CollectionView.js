import '../../mdb.dark.min.css'
import '../../App.css'
import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { Alert, Overlay, OverlayTrigger, Tooltip, Popover} from 'react-bootstrap';
import { Image, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';

import Chip from "@material-ui/core/Chip";
import { MDBBtn, MDBListGroup, MDBTable, MDBTableHead, MDBTableBody, MDBListGroupItem, MDBCardImage, MDBIcon, MDBSpinner, MDBCard, MDBCardBody, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselElement, MDBCarouselCaption, MDBRow, MDBPopover, MDBPopoverBody, MDBPopoverHeader} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import zIndex from '@material-ui/core/styles/zIndex';
import VerticalTimelineView from '../VerticalTimeline/VerticalTimeline';
import { url } from 'inspector';

const CollectionView = (props) => {
    const [movieData, setMovieData] = useState(props.movieData);
    const [linksData, setLinksData] = useState(props.linksData);
    const [ratingsData, setRatingsData] = useState(props.ratingsData);
    const [tagsData, setTagsData] = useState(props.tagsData);

    useEffect(() =>{
        if(props.movieData != movieData){
            setMovieData(props.movieData)
        }
    }, [movieData])
    useEffect(() =>{
        if(props.ratingsData != ratingsData){
            setRatingsData(props.ratingsData)
        }
    }, [ratingsData])
    let hrefLinkImdbStr = '';
    let hrefLinkTmdbStr = '';
    if(props.linksData){
        hrefLinkImdbStr= 'https://www.imdb.com/title/tt'+props.linksData.result[0].imdbId
        hrefLinkTmdbStr = 'https://www.themoviedb.org/movie/'+props.linksData.result[0].tmdbId
    }
    let ratingsArr = [];
    let userIdArr = [];
    if(props.ratingsData){
        for(let i = 0; i < props.ratingsData.result.length ; i++){
            let tempObj = props.ratingsData.result[i];
            ratingsArr.push(tempObj.rating)
            userIdArr.push(tempObj.userId)

        }
    }
    let tagsArr = []
    if(props.tagsData){
        for(let i = 0; i < props.tagsData.result.length ; i++){
            let tempObj = props.tagsData.result[i];
            tagsArr.push(tempObj.tag)
        }
    }
    function renderTableData() {
        return ratingsArr.map((rating, index) => {
           return (
              <tr key={userIdArr[index]}>
                <td>{userIdArr[index]}</td>
                <td>{rating}</td>
              </tr>
           )
        })
     }
     function renderTableDataTags() {
        return tagsArr.map((tag, index) => {
           return (
              <tr>
                <td>{index}</td>
                <td>{tag}</td>
              </tr>
           )
        })
     }
    return (
  <div className="collectionView">
    <div className="container-fluid">
        <section>
            <div className="row">
                <MDBCard className='identityCard'>
                <div className="col-8 mt-3 mb-1" style={{marginLeft: '25px', height:'300px'}}>
                  {props.movieData && props.linksData ? <div style={{display: 'inline'}}><p>Title: {props.movieData.title}</p><p>Genre : {props.movieData.genres}</p><p>Movie ID : {props.movieData.movieId}</p>
                  <h6>Links : <br></br><a href={hrefLinkImdbStr}>https://www.imdb.com/title/tt{props.linksData.result[0].imdbId}</a><br></br><a href={hrefLinkTmdbStr}>https://www.themoviedb.org/movie/{props.linksData.result[0].tmdbId}</a></h6>
                  </div>: null}
                </div> 
                </MDBCard>
            </div>
            <MDBRow>
                <div className='col'>
                    <MDBCard className='collectionStatsCard'>
                    {props.ratingsData ? 
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <MDBTable className="ratingsTable" style={{width : '500px'}}>
                        <MDBTableHead>
                            <tr>
                            <th scope='col'>UserId</th>
                            <th scope='col'>Rating</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {renderTableData()}
                        </MDBTableBody>
                    </MDBTable></div> : null}
                    </MDBCard></div>
                    <div className='col'>
                    {props.tagsData ? 
                    <div style={{marginTop: '25px'}}class="table-wrapper-scroll-y my-custom-scrollbar-tags">
                    <MDBTable className="tagsTable" style={{width : '500px'}}>
                        <MDBTableHead>
                            <tr>
                            <th scope='col'>Tag #</th>
                            <th scope='col'>Tag</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {renderTableDataTags()}
                        </MDBTableBody>
                    </MDBTable></div> : null}</div>
            </MDBRow>
           
        </section>
    </div>
    </div>
    );
  };
export default CollectionView;
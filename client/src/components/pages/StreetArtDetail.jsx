import React, { Component } from 'react'
import api from '../../api';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl' // NEW
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGFyc21lbmRlcyIsImEiOiJjanVsMWZtdjMwYTRvM3lvOGp5aWZ6cnJtIn0.xv9rm--YRNKdTJGHFYzi0g' // NEW

export default class StreetArtDetail extends Component {
    constructor(props){
        super(props);
        this.state = { streetArtDetails: null };

        this.mapRef = React.createRef() // NEW
    this.map = null // NEW
    this.marker = null // NEW
    }

    initMap(lng, lat) { // NEW METHOD
      // Embed the map where "this.mapRef" is defined in the render
      this.map = new mapboxgl.Map({
        container: this.mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 10
      })
  
      // Add zoom control on the top right corner
      this.map.addControl(new mapboxgl.NavigationControl())
  
      // Create a marker on the map with the coordinates ([lng, lat])
      this.marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([lng, lat])
        .addTo(this.map)}

   

  render() {
    // let location = this.state.streetArtDetails
    return (
      <div className="StreetArtDetails">
        <h1>Street Art Details</h1>

        {!this.state.streetArtDetails && <div>Loading...</div>}
        {this.state.streetArtDetails && 

              <div> 
                  {/* Id: {this.state.streetArtDetails._id}<br /> */}
                  <img src={this.state.streetArtDetails.pictureUrl} alt=""/><br />
                  <hr />
                 <p>Longitude:{this.state.streetArtDetails.location.coordinates[0]}</p>  
                 <p>Latitude:{this.state.streetArtDetails.location.coordinates[1]}</p> 

                
              </div>}
              <div className="Map" ref={this.mapRef} style={{height: 400}}></div> {/* NEW */}
        </div>
    )
  }

  componentDidMount() {
    // let streetArtId = this.props.match.params
    console.log('this.props.match.params.id',this.props.match.params.id)
    api.getStreetArt(this.props.match.params.id)
    .then(responseFromApi => {
        console.log('location',responseFromApi.location.coordinates[0])
        this.setState({
            streetArtDetails: responseFromApi
            })
    // axios.get(`http://localhost:5000/api/street-arts/:id`)
    })
    console.log('this.props.match.params.streetArtId',this.props.match.params.id)

    api.getStreetArt(this.props.match.params.id)
  .then(streetArt => {
    this.setState({
      streetArt: streetArt
    })
    let [lng,lat] = streetArt.location.coordinates // NEW
    this.initMap(lng,lat) // NEW
  })
}

}

import React, { Component } from 'react'
import api from '../../api';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Nlink as NavLink from 'react-router-dom';


export default class List extends Component {
  constructor(props){
    super(props);
    this.state = { listOfStreetArt: [] };
}

// getAllProjects = () =>{
//   axios.get(`http://localhost:5000/api/projects`)
//   .then(responseFromApi => {
//     this.setState({
//       listOfProjects: responseFromApi.data
//     })
//   })
// }


componentDidMount() {
  api.getStreetArts()
  .then(responseFromApi => {
    console.log('responseFromApi',responseFromApi)
    this.setState({
      listOfStreetArt: responseFromApi
    })
  });
}


  handleLogoutClick(e) {
    api.logout()
  }


  render() {
    return (
      <div className="List">
        <h1>List of Street Arts</h1>
       {console.log(api.getStreetArts())} 
       <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Picture</th>
            <th>Google Maps Direction</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody> 
          {this.state.listOfStreetArt.map( streetArt => {
            return (
              <tr key={streetArt._id}  className="row-container">
              <th scope="row"></th>
              <td><img src={streetArt.pictureUrl} alt=""/></td>
              <td><a href={`https://www.google.com/maps/dir//${streetArt.location.coordinates[0]},${streetArt.location.coordinates[1]}/@${streetArt.location.coordinates[0]},${streetArt.location.coordinates[1]}`}>
                {streetArt.location.coordinates[0]},{streetArt.location.coordinates[1]}
                </a></td>
              <td><Link to={`/street-art-detail/${streetArt._id}`}><Button outline color='primary'>Detail</Button></Link></td>  
              </tr>
            )})
          }
         
        </tbody>
      </Table>
      </div>
    )
  }
}

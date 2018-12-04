import React, { Component } from 'react';
import Satellites from './Satellites'
import { Column, Table } from 'react-virtualized';
import dataLoader from './data-loader-server.js'

// styles
import '../css-react-virtualized/styles.css'; // only needs to be imported once
import '../css/components/table.css';

class Planets extends Component {

  state = {
    planets: [],
    selectedPlanet: null,
    satellites: []
  }

  showMoons = (planet) => {
    if (planet === this.state.selectedPlanet) {
      this.loadAllSatellites();
    }
    dataLoader.loadSatellites(planet, data => 
      this.setState({
        satellites: data,
        selectedPlanet: planet
      })
    );
  }

  _rowClassName = ({index}) => {
    if (this.state.selectedPlanet === this.state.planets[index]) {
      return "selectedRow";
    }
    if (index % 2 === 0) {
      return "oddRow";
    }
  }

  render() {
    return (
      <div>

        <h2>Planets of our Solar System</h2>

        <Table width={1950}
               height={450}
               headerHeight={90}
               rowHeight={40}
               rowCount={this.state.planets.length}
               rowGetter={({ index }) => this.state.planets[index]}
               rowClassName={this._rowClassName}
               onRowClick={(props) => this.showMoons(props.rowData)}
               >
          <Column label='Name' dataKey='name' width={70} className='text' />
          <Column label='Moons' dataKey='numberOfMoons' width={70} />
          <Column label='Mass' dataKey='mass' width={70} />
          <Column label='Diameter' dataKey='diameter' width={90} />
          <Column label='Density' dataKey='density' width={70} />
          <Column label='Gravity' dataKey='gravity' width={70} />
          <Column label='Escape Velocity' dataKey='escapeVelocity' width={80} />
          <Column label='Rotation Period' dataKey='rotationPeriod' width={80} />
          <Column label='Length Of Day' dataKey='lengthOfDay' width={80} />
          <Column label='Distance From Sun' dataKey='distanceFromSun' width={80} />
          <Column label='Perihelion' dataKey='perihelion' width={100} />
          <Column label='Aphelion' dataKey='aphelion' width={90} />
          <Column label='Orbital Period' dataKey='orbitalPeriod' width={70} />
          <Column label='Orbital Velocity' dataKey='orbitalVelocity' width={80} />
          <Column label='Orbital Inclination' dataKey='orbitalInclination' width={100} />
          <Column label='Orbital Eccentricity' dataKey='orbitalEccentricity' width={100} />
          <Column label='Obliquity To Orbit' dataKey='obliquityToOrbit' width={80} />
          <Column label='Mean Temperature' dataKey='meanTemperature' width={115} />
          <Column label='Surface Pressure' dataKey='surfacePressure' width={80} />
        </Table>

        <Satellites planet={this.state.selectedPlanet} satellites={this.state.satellites} />

      </div>
    )
  }

  // TODO: Put the two columns below back to the table and fix their data.
  //<Column label='Has Ring System' dataKey='hasRingSystem' width={80} className='text' />
  //<Column label='Has Global Magnetic Field' dataKey='hasGlobalMagneticField' width={80} className='text' />

  componentDidMount() {
    dataLoader.loadAllPlanets(data =>
      this.setState({
        planets: data
      })
    );

    this.loadAllSatellites();
  }

  loadAllSatellites() {
    dataLoader.loadAllSatellites(data =>
      this.setState({
        satellites: data,
        selectedPlanet: null
      })
    );
  }

}

export default Planets;


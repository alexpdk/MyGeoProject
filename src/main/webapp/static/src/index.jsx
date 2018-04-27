import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {floatValidator, getLocalMapValidator, intValidator, stringValidator} from "./table-validators";
import {CountryHelper, CityHelper} from "./table-hooks";

import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import '../styles/geo.css'

if (module.hot) {
    module.hot.accept()
}

let CountryTable = (function () {
    /**
     * @return {string}
     */
    function GDPFormatter(cell, row){
        return '$'+cell+" trillion"
    }
    const tableOptions = {
        afterInsertRow: CountryHelper.afterInsertRow,
        afterDeleteRow: CountryHelper.afterDeleteRow,
        handleConfirmDeleteRow: next=>next() // Disable confirmation window
    }
    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: CountryHelper.afterSaveCell,
        beforeSaveCell: CountryHelper.beforeSaveCell
    };
    const selectRowProp = {
        mode: 'checkbox'
    }
    return class CountryTable extends React.Component{
        static propTypes = {
            countries: PropTypes.array.isRequired,
            setCountryName: PropTypes.func.isRequired,
            updateData: PropTypes.func.isRequired,
        }
        state = {
            countries: this.props.countries,
            maxId: this.props.countries.map(c=>c.id).reduce((a,b)=>Math.max(a, b), -Infinity)
        }
        getNextId=()=>{
            return ++this.state.maxId
        }
        updateMasterOptions=()=>({
            afterInsertRow:row=>{
                tableOptions.afterInsertRow(row).then(()=>{
                    this.props.setCountryName(row.id, row.name)
                })
            },
            afterSaveCell: (row, cellName, cellValue)=> {
                let promise = cellEditProp.afterSaveCell(row, cellName, cellValue)
                if (cellName === 'name') {
                    promise.then(()=>this.props.setCountryName(row.id, row.name))
                }
            },
            afterDeleteRow:rowKeys=>{
                tableOptions.afterDeleteRow(rowKeys).then(()=>this.props.updateData())
            }
        })
        componentWillReceiveProps(nextProps, nextContext){
            this.setState({
                countries: nextProps.countries,
                maxId: nextProps.countries.map(c=>c.id).reduce((a,b)=>Math.max(a, b), -Infinity)
            })
        }
        render(){
            let updateOptions = this.updateMasterOptions()
            return(
                <BootstrapTable data={this.state.countries} striped={true}
                                hover={true}
                                insertRow={true} selectRow={selectRowProp} deleteRow={true}
                                cellEdit={{...cellEditProp, ...updateOptions}}
                                options={{...tableOptions, ...updateOptions}}>
                    <TableHeaderColumn dataField="id" isKey hiddenOnInsert
                                       autoValue={this.getNextId}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name"
                                       dataSort={true}
                                       editable={{validator: stringValidator}}>Country Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="capital"
                                       dataSort={true}
                                       editable={{validator: stringValidator}}>Capital</TableHeaderColumn>
                    <TableHeaderColumn dataField="population"
                                       dataSort={true} dataAlign="right"
                                       editable={{validator: intValidator}}>Population</TableHeaderColumn>
                    <TableHeaderColumn dataField="gdp"
                                       dataSort={true} dataFormat={GDPFormatter}
                                       editable={{validator: floatValidator}}>GDP</TableHeaderColumn>
                </BootstrapTable>
            )
        }
    }
})()

let CityTable = (function () {
    const tableOptions = {
        afterInsertRow: CityHelper.afterInsertRow,
        afterDeleteRow: CityHelper.afterDeleteRow,
        handleConfirmDeleteRow: next=>next() // Disable confirmation window
    }
    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: CityHelper.afterSaveCell,
        beforeSaveCell: CityHelper.beforeSaveCell
    };
    const selectRowProp = {
        mode: 'checkbox'
    }
    return class CityTable extends React.Component{
        static propTypes = {
            cities: PropTypes.array.isRequired,
            countryMap: PropTypes.object.isRequired
        }
        state = {
            cities: this.props.cities,
            maxId: this.props.cities.map(c=>c.id).reduce((a,b)=>Math.max(a, b), -Infinity)
        }
        getNextId=()=>{
            return ++this.state.maxId
        }
        componentWillReceiveProps(nextProps, nextContext){
            this.setState({
                cities: nextProps.cities,
                maxId: nextProps.cities.map(c=>c.id).reduce((a,b)=>Math.max(a, b), -Infinity)
            })
        }
        render(){
            return(
                <BootstrapTable data={this.state.cities} striped={true}
                                hover={true} cellEdit={cellEditProp}
                                insertRow={true} selectRow={selectRowProp} deleteRow={true}
                                options={tableOptions}>
                    <TableHeaderColumn dataField="id" isKey hidden hiddenOnInsert
                                       autoValue={this.getNextId}>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name"
                                       dataSort={true}
                                       editable={{validator: stringValidator}}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="countryId"
                                       dataSort={true} dataFormat={countryId=>this.props.countryMap[countryId]}
                                       editable={{validator: getLocalMapValidator(this.props.countryMap)}}>Country</TableHeaderColumn>
                    <TableHeaderColumn dataField="population"
                                       dataSort={true} dataAlign="right"
                                       editable={{validator: intValidator}}>Population</TableHeaderColumn>
                    <TableHeaderColumn dataField="mayor"
                                       dataSort={true}
                                       editable={{validator: stringValidator}}>Mayor</TableHeaderColumn>
                </BootstrapTable>
            )
        }
    }
})()

class MasterComponent extends React.Component{
    state={
        cities: [],
        countries: [],
        countryMap: {0: "NO_COUNTRY"}
    }
    setCountryName=(id, name)=>{
        if(this.state.countryMap[id]!==undefined){
            //Cities should be updated, because renaming country can influence them
            $.get('http://localhost:8080/MyGeoProject/city/all', cities=>{
                this.setState({
                    cities,
                    countryMap: {...this.state.countryMap, ...{[id]: name}}
                })
            })
        }else{
            //New country added
            $.get('http://localhost:8080/MyGeoProject/country/all', countries=>{
                this.setState({
                    countries,
                    countryMap: {...this.state.countryMap, ...{[id]: name}}
                })
            })
        }
    }
    updateData=()=>{
        let getCountries = new Promise(resolve=>
            $.get('http://localhost:8080/MyGeoProject/country/all', countries=>resolve(countries)))
        let getCities = new Promise(resolve=>
            $.get('http://localhost:8080/MyGeoProject/city/all', cities=>resolve(cities)))
        Promise.all([getCountries, getCities]).then(([countries, cities])=>{
            let map = {0: "NO_COUNTRY"}
            countries.forEach(country => map[country.id] = country.name)
            this.setState({
                cities,
                countries,
                countryMap: map
            })
        })
    }
    componentDidMount(){
        this.updateData()
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-6">
                    <h4>Country table</h4>
                    <CountryTable countries={this.state.countries} setCountryName={this.setCountryName} updateData={this.updateData}/>
                </div>
                <div className="col-md-6">
                    <h4>City table</h4>
                    <CityTable cities={this.state.cities} countryMap={this.state.countryMap}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h2> GeoData DB Interface</h2>
            </div>
        </div>
        <MasterComponent/>
    </div>,
    document.getElementById("root")
);



const CountryURL = 'http://localhost:8080/MyGeoProject/country/';
const CityURL = 'http://localhost:8080/MyGeoProject/city/'

$.postJSON = function (url, content, callback) {
    // ! Some servers require Content-Type to avoid CORS error
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'type': 'POST',
        url,
        'data': JSON.stringify(content),
        'dataType': 'json',
        'complete': callback
    });
}

class TableRestHelper{
    constructor(url){
        this.baseUrl = url
    }
    beforeSaveCell = (row, cellName, cellValue)=>{
        if(row[cellName] === cellValue || row[cellName]+'' === cellValue){
            return false // cancel unnecessary row update
        }
    }
    afterSaveCell = (row, cellName, cellValue)=> {
        if (cellName === 'population') {
            row[cellName] = parseInt(cellValue)
        } else if (cellName === 'gdp') {
            row[cellName] = parseFloat(cellValue)
        }
        return new Promise(resolve => $.postJSON(this.baseUrl+'update', row, resolve))
    }
    afterInsertRow=row=>{
        row.population = parseInt(row.population)
        row.gdp = parseFloat(row.gdp)
        return new Promise(resolve => $.postJSON(this.baseUrl+'create', row, resolve))
    }
    afterDeleteRow=rowKeys=>{
        let promises = []
        rowKeys.forEach(key=>{
            promises.push(new Promise(resolve => $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                'type': 'DELETE',
                'url' :this.baseUrl+'delete/'+key,
                'complete': resolve
            })))
        })
        return Promise.all(promises)
    }
}

export const CountryHelper = new TableRestHelper(CountryURL)
export const CityHelper = new TableRestHelper(CityURL)


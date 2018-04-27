
const intLengthConstraint = 10;
const floatLengthConstraint = 10;
const stringLengthConstraint = 50;

export const floatValidator = (value)=>{
    let int = parseFloat(value)
    if(value.length > floatLengthConstraint){
        return `${value} should contain ${floatLengthConstraint} or less digits`
    }
    if(isNaN(int) || int+'' !== value){
        return `Value "${value}" should be float`
    }
    return true
}
export const intValidator = (value)=>{
    let int = parseInt(value)
    if(value.length > intLengthConstraint){
        return `${value} should contain ${intLengthConstraint} or less digits`
    }
    if(isNaN(int) || int+'' !== value){
        return `Value "${value}" should be integer`
    }
    return true
}
export const stringValidator=(value)=>{
    if(value.length > stringLengthConstraint){
        return `Max supported string size is ${stringLengthConstraint}`
    }
    return true
}
const localMapValidator=(localMap, value)=>{
    if(localMap[value] === undefined){
        return `Country with id "${value}" not specified in the database`
    }
    return true

}
export const getLocalMapValidator = localMap=>localMapValidator.bind(null, localMap)

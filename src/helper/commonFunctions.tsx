import React from "react";
import { scroller } from 'react-scroll';
import Chip from '@mui/material/Chip';


export const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

export function scrollToFirstError(errors:any) {
  const errorFields = getErrorFieldNames(errors);
  // Using breakable for loop
  for (let i = 0; i < errorFields.length; i++) {
    const fieldName = `${errorFields[i]}`;
    // Checking if the marker exists in DOM
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { offset: -250, smooth: true });
      const firstErrorField=document.querySelector(`[name="${fieldName}"]`) as HTMLElement;
      firstErrorField?.focus();
      break;
    }
  }
}
function getErrorFieldNames(obj:any, name = '') {
  const errorArr = [];
  errorArr.push(Object.keys(obj).map((key) => {
    const next = obj[key];
    if (next) {
      if (typeof next === 'string') {
        return name + key;
      }
      // Keep looking
      if (next.map) {
        errorArr.push(next.map((item:any, index:number) => getErrorFieldNames(item, `${name}${key}[${index}].`)).filter((o:any) => o));
      }
    }
    return null;
  }).filter(o => o));
  return flatten(errorArr);
}

function flatten(arr:any) {
  return arr.reduce((flat:any, toFlatten:any) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
}

export function Ucfirst(str:any) {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
        if(str[i][0])
        {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1).toLowerCase();
        }
        else
        {
          str[i] = (str[i][0])?str[i][0].toLowerCase():'' + str[i].substr(1).toLowerCase();
        }
        
    }
    return str.join(" ");
}

export const dbMobileFormat = (str:any) => {   
    return str.replace(/[^0-9]/ig, "");
}

export const dbPriceFormat = (str:any) => {  
    return str.replace(/[^0-9.]/ig, "");
}

export const dbDateFormat = (date:any) => { 
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export const dbDateTimeFormat = (date:any) => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var strTime = hours + ':' + minutes + ':' + seconds;
    return [year, month, day].join('-')+" "+strTime;
}

export const dbTimeFormat = (date:any) => {
    var d = new Date(date)

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var strTime = hours + ':' + minutes + ':' + seconds;
    return strTime;
}

export const mobileFormat=(string:any) =>{
  var cleaned = ("" + string).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!match) ? null : "(" + match[1] + ") " + match[2] + "-" + match[3];
}

export const dateFormat = (date:any) => {
  var d = new Date(date);
  var monthsOfYear = ["January","February","March","April","May","June","July","August",
            "September","October","November","December"];
  var daysOfMonth  = ["NaN","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th",
             "11th","12th","13th","14th","15th","16th","17th","18th","19th","20th",
             "21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];
  //Returns a date string for display
    var returnDate = daysOfMonth[d.getDate()] + " "
            + monthsOfYear[d.getMonth()] + ", "
            + d.getFullYear();
return returnDate;

}

export const dateTimeFormat = (date:any) => {
    var d = new Date(date);
    var monthNames = [
        "JAN", "FEB", "MAR",
        "APR", "MAY", "JUN", "JUL",
        "AUG", "SEP", "OCT",
        "NOV", "DEC"
    ];
    var day = d.getDate();
    var year=d.getFullYear();
    var monthName = monthNames[d.getMonth()];
    var hours = d.getHours();
    var minutes:any = d.getMinutes();
    var seconds:any = d.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    var strTime = hours + ':' + minutes+ ':'+ seconds + ' ' + ampm;
    return day+" "+monthName+", "+year+"  "+strTime;
}

export const priceFormat=(price:any) =>{
    let result=parseFloat(price).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    return 'Rs '+result;
}

export const priceFormatSmall=(value:any)=>{
  var val:any = Math.abs(value)
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') + ' Cr';
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') + ' Lac';
  }else{
    val = val.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
  }
  return "Rs "+val;
}

export const gridText = (column:any,row:any) => {
  switch(column.type) {
    case "status":
      return <Chip size="small" className="status-label" label={row.status?"Active":"Inactive"} color={row.status?"primary":"secondary"}/>;
    case "text":
      return row[column.id];
    case "mobile":
      return (row.countrycode)?row.countrycode+" "+mobileFormat(row[column.id]):mobileFormat(row[column.id]);
    case "date":
      return (row[column.id])?dateFormat(row[column.id]):"";
    case "datetime":
      return (row[column.id])?dateTimeFormat(row[column.id]):"";
    case "price":
      return (row[column.id])?priceFormatSmall(row[column.id]):"";  
    default:
      return row[column.id];        
  }
}

export const multiSelectValue = (options:any) => { 
    let newOptions:any[]=[];
    options.map((item:any, i:number) => {
      newOptions.push(item.value);
    });
    return newOptions.toString();
}

export const monthOptions = () => { 
    var monthNames = [
        { value: "JAN", label: "JAN" },
        { value: "FEB", label: "FEB" },
        { value: "MAR", label: "MAR" },
        { value: "APR", label: "APR" },
        { value: "MAY", label: "MAY" },
        { value: "JUN", label: "JUN" },
        { value: "JUL", label: "JUL" },
        { value: "AUG", label: "AUG" },
        { value: "SEP", label: "SEP" },
        { value: "OCT", label: "OCT" },
        { value: "NOV", label: "NOV" },
        { value: "DEC", label: "DEC" }
    ];
    return monthNames;
}

export const yearOptions = () => { 
    var d = new Date();
    var year=d.getFullYear();
    var start=year-50;
    var years= [];
    for (var i = start; i <= year; i++) {
      years.push({value:i, label:i});
    }
    return years;
}

export const experienceMonthOptions = () => { 
  var months=[];
  for (var i = 0; i <= 12; i++) {
      months.push({value:i, label:i});
  }
  return months;
}

export const experienceYearOptions = () => { 
  var years=[];
  for (var i = 0; i <= 50; i++) {
      years.push({value:i, label:i});
  }
  return years;
}

export const noticePeriodOptions = () => { 
  var options=[];
  for (var i = 0; i <= 100; i+=5) {
      options.push({value:i, label:i+" Days"});
  }
  return options;
}
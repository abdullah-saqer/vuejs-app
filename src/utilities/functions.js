import CryptoJS from "crypto-js";
import {encriptHeader, encriptKey} from './appKeys';
export const findItem =(id,array) => {
    let index = array.findIndex(function(item, i){
        return item.id == id;
    });
    return index;
}
// Defining our token parts
const base64url = (source) => {
    let encodedSource = CryptoJS.enc.Base64.stringify(source)
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    return encodedSource;
};
const parseJwt = (token) => {
    try {
        const base64HeaderUrl = token.split('.')[0];
        const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
        const headerData = JSON.parse(window.atob(base64Header));
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const dataJWT = JSON.parse(window.atob(base64));
        return dataJWT;
    } catch (err) {
        return {expDate: -1};
    }
}
export const generateJwt = (data) => {
    data.expDate = new Date().getTime()+60*60*1000*3;
    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(encriptHeader));
    const encodedHeader = base64url(stringifiedHeader);  
    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    const encodedData = base64url(stringifiedData);  
    let signature = encodedHeader + "." + encodedData;
    signature = CryptoJS.HmacSHA256(signature, encriptKey);
    signature = base64url(signature);
    return (new Array(encodedHeader,encodedData,signature).join('.'));
};
export const verifyJwt = () => {
    let token = localStorage.getItem('userInfo');
    const parsedJwt = parseJwt(token);
    if(!token)
        return false;
    token = token.split('.');
    let signature = base64url(CryptoJS.HmacSHA256(token[0]+"."+token[1], encriptKey));
    return (signature == token[2] && parsedJwt.expDate > new Date().getTime() ? parsedJwt : null);
}
export const generateId = (seed) => {
    return btoa(seed);
};
export const encriptPassword = (password) => {
    return CryptoJS.SHA3(password).toString();
};
export const formateDate = (x,e) => {var r,a,t,p,c,l,s,h,u,M,i,n,D,y,m,o,d,g,b,Y,F,S;return a=((r=x.getFullYear())+"").slice(-2),c=(l=x.getMonth()+1)<10?"0"+l:l,p=(t=["January","February","March","April","May","June","July","August","September","October","November","December"][l-1]).substring(0,3),u=(M=x.getDate())<10?"0"+M:M,h=(s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][x.getDay()]).substring(0,3),S=M>=10&&M<=20?"th":1==(F=M%10)?"st":2==F?"nd":3==F?"rd":"th",e=e.replace("#YYYY#",r).replace("#YY#",a).replace("#MMMM#",t).replace("#MMM#",p).replace("#MM#",c).replace("#M#",l).replace("#DDDD#",s).replace("#DDD#",h).replace("#DD#",u).replace("#D#",M).replace("#th#",S),0==(y=n=x.getHours())&&(y=24),y>12&&(y-=12),D=y<10?"0"+y:y,i=n<10?"0"+n:n,Y=(b=n<12?"am":"pm").toUpperCase(),m=(o=x.getMinutes())<10?"0"+o:o,d=(g=x.getSeconds())<10?"0"+g:g,e.replace("#hhhh#",i).replace("#hhh#",n).replace("#hh#",D).replace("#h#",y).replace("#mm#",m).replace("#m#",o).replace("#ss#",d).replace("#s#",g).replace("#ampm#",b).replace("#AMPM#",Y)};

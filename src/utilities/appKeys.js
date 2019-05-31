export const encriptHeader = {
    "alg": "HS256",
    "typ": "JWT"
};
let encriptKeyVersion = "im development key";
if(process.env.NODE_ENV !== "development") {
    encriptKeyVersion = "im production key";
};
export const encriptKey = encriptKeyVersion;

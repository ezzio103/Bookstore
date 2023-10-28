import React from "react";
async function request(duongDan:string) {
    // truy cap duong dan
    const response = await fetch(duongDan);
    //neu co loi
    if(!response.ok){
        throw new Error(`Khong the truy cap ${duongDan}`);
    }
    //neu ok
    return response.json();
}
export default request;
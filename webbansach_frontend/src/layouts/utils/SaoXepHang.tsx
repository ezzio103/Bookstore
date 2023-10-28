import React from "react";
import { Star, StarFill, StarHalf } from "react-bootstrap-icons";
function renderRating  (diemXepHang: number){
    const stars = [];
    for(let i =1 ;i <=5 ;i++){
        if(i<=diemXepHang)
        stars.push(
            <StarFill className="text-warning"/>
        )
        else if(diemXepHang<i && i < diemXepHang + 1){
            stars.push(
                <StarHalf className="text-warning"/>
            )
        } else if(i<=5){
            stars.push(
                <Star className="text-warning"/>
            )
        }
    }
    return stars;
}
export default renderRating;
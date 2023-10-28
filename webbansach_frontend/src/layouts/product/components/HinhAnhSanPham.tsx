import React, { useEffect, useState } from "react";

import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS cho carousel

interface HinhAnhSanPham{
    maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {
    const maSach  = props.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   
    useEffect(()=>{
        layToanBoAnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachAnh(hinhAnhData);
                
                setDangTaiDuLieu(false);
                console.log(danhSachAnh)
               
            }
        ).catch(
            error =>{
                setBaoLoi(error.message)
            }
        );
    },[])
   if(dangTaiDuLieu){
    return(
        <div> <h1> Dang tai du lieu</h1> </div>
    )
   }
   if(baoLoi){
    return(
        <div>
            <h1>Gap loi</h1>
        </div>
    )
   }
   // 2*
    return (
        <div className="row">
        <div className="col-12">
            <Carousel showArrows={true} showIndicators={true} >
                {
                    danhSachAnh.map((hinhAnh, index)=>(
                        <div key={index}>
                            <img src={hinhAnh.duLieuAnh} alt={`${hinhAnh.tenHinhAnh}`} style={{maxWidth:"250px"}} />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    </div>
    );
}
export default HinhAnhSanPham;
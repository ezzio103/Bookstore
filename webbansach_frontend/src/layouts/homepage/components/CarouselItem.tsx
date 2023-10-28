import React, { useEffect, useState } from "react";

import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import Carousel from './Carousel';
interface CarouselItemInterface{
    sach: SachModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {
    const maSach :number = props.sach.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
    useEffect(()=>{
        lay1AnhCuaMotSach(maSach).then(
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
   let duLieuAnh:string = '';
   if(danhSachAnh[0] && danhSachAnh[0].duLieuAnh){
    duLieuAnh = danhSachAnh[0].duLieuAnh;
   }
   // 2*
    return (
        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={duLieuAnh} className="float-end" style={{width:'200px',height:'320px'}} alt="" />
                            </div>
                            <div className="col-7">
                                <h5>{props.sach.tenSach}</h5>
                                <p>{props.sach.moTa}</p>
                            </div>
                        </div>
    );
}
export default CarouselItem;
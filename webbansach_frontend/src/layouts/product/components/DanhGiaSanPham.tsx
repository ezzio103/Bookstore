import React, { useEffect, useState } from "react";

import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";
import renderRating from "../../utils/SaoXepHang";
interface DanhGiaSanPham{
    maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {
    const maSach  = props.maSach;
    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]|null>(null);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
  
   
    useEffect(()=>{
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSach => {
                
                    setDanhSachDanhGia(danhSach)
                
                setDangTaiDuLieu(false);
                
               
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
            {
                danhSachDanhGia?.map((danhGia)=>(<div>
                    
                     <div>
                     {danhGia.maDanhGia}
                 </div>
                 <div>
                    {renderRating(danhGia.diemXepHang)}
                 </div>
                  <div>
                  {danhGia.nhanXet}
              </div></div>
                ))
            }
        </div>
    );
}
export default DanhGiaSanPham;
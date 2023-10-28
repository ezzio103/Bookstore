import React, { useEffect, useState } from "react";


import {  laySachTheoMaSach} from "../../api/SachAPI";
import SachModel from "../../models/SachModel";

import { useParams } from "react-router-dom";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utils/SaoXepHang";
import { dinhDangSo } from "../utils/DinhSangSo";

function ChiTietSanPham() {

    const {maSach} = useParams()
    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach+'') ;
         if(Number.isNaN(maSachNumber)){
        maSachNumber = 0;
    }

    } catch (error) {
        maSachNumber = 0;
        console.error("Error: "+error)
    }
   


   const [sach, setSach] = useState<SachModel|null>(null);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [soLuong,setSoLuong] = useState(1)
    const tangSoLuong = ()=>{
        const soLuongKho = sach && sach.soLuong?sach.soLuong:0;
        if(soLuong<soLuongKho){
            setSoLuong(soLuong+1)
        }
    }
    const giamSoLuong = ()=>{
       
        if(soLuong>1){
            setSoLuong(soLuong-1)
        }
    }
   const handleSoLuongChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const soLuongKho = sach && sach.soLuong?sach.soLuong:0;
    const soLuong= parseInt(e.target.value);
    if(!isNaN(soLuong) && soLuong>1 && soLuong<=soLuongKho){
        setSoLuong(soLuong)
    }
   }

    useEffect(()=>{
        laySachTheoMaSach(maSachNumber).then(
            (sach) =>{ setSach(sach);
                setDangTaiDuLieu(false);}
               
            
        ).catch((error) =>{
            setBaoLoi(error.message);
            setDangTaiDuLieu(false);
        })
            
    
          
    },[maSach]) 

    

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
   
   if (!sach) {
    return (
        <div>
            <h1>Sách không tồn tại!</h1>
        </div>
    );
}

    return (

        <div className="container">
            <div className="row mt-4 mb-4">
               <div className="col-4">
               <HinhAnhSanPham maSach={maSachNumber}/>
               </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                                {sach.tenSach }
                                <br /> 
                                { sach.maSach}
                            </h1>
                            <h4>
                                {renderRating(sach.trungBinhXepHang?sach.trungBinhXepHang:0)}
                            </h4>
                            <h4>
                                {dinhDangSo(sach.giaBan) + 'đ'}
                            </h4>
                            <hr/>
                                <div dangerouslySetInnerHTML={{__html: (sach.moTa+'')}}/>
                            <hr/>
                        </div>
                        <div className="col-4">
                            <div className="mb-2">Số lượng</div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary me-2" onClick={()=>{giamSoLuong()}}>-</button>
                                <input className="form-control text-center" type="number"  value={soLuong} min={1} onChange={handleSoLuongChange} />
                                <button className="btn btn-outline-secondary ms-2" onClick={()=>{tangSoLuong()}}>+</button>

                            </div>
                            <div>
                                {
                                    sach.giaBan && 
                                    <div className="mt-2 text-center">
                                        Tổng tiền <br />
                                        {dinhDangSo(soLuong*sach.giaBan)+ 'đ'}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-4 mt-4">
                <DanhGiaSanPham maSach={maSachNumber} />
            </div>
        </div>
    );
}

export default ChiTietSanPham;
import React, { useEffect, useState } from "react";


import { laySach, layToanBoSach, timKiemSach } from "../../api/SachAPI";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { error } from "console";
import { PhanTrang } from "../utils/PhanTrang";
interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai : number;
}
function DanhSachSanPham({tuKhoaTimKiem , maTheLoai}:DanhSachSanPhamProps) {
   const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [trangHienTai,setTrangHienTai] = useState(1);
   const [tongSoTrang,setTongSoTrang] = useState(0);
   const [tongSoSach,seTtongSoSach] = useState(0);
//    const [tuKhoaTimKiemTruocDo,setTuKhoaTimKiemtruocDo] = useState('');
  
    // reset trangHienTai khi tuKhoaTimKiem thay doi
    useEffect(()=>{
        setTrangHienTai(1);
        },[tuKhoaTimKiem]) 

    useEffect(()=>{
        if(tuKhoaTimKiem === ''&& maTheLoai == 0)
        {
        layToanBoSach(trangHienTai).then(
            kq => {
                setDanhSachQuyenSach(kq.ketQua);
                setTongSoTrang(kq.tongSoTrang);
                setDangTaiDuLieu(false);
               
            }
        ).catch(
            error =>{
                setBaoLoi(error.message)
            }
        );
        } else{
            // if(tuKhoaTimKiemTruocDo !== tuKhoaTimKiem){
            //     setTuKhoaTimKiemtruocDo(tuKhoaTimKiem);
            //     setTrangHienTai(1);

            // }
            timKiemSach(tuKhoaTimKiem, maTheLoai, trangHienTai).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                   
                }
            ).catch(
                error =>{
                    setBaoLoi(error.message)
                }
            );
        }
    },[trangHienTai,tuKhoaTimKiem, maTheLoai]) 

    

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
   const phanTrang = (trangHienTai: number)=>{
    setTrangHienTai(trangHienTai)
   }
   if(danhSachQuyenSach.length===0){
    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center justify-content-center">
                <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
            </div>
        </div>
    );
}
    return (


        <div className="container">
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map((sach) => (
                            <SachProps key={sach.maSach} sach={sach} />
                        )
                    )
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang}  phanTrang={phanTrang}/>
        </div>
    );
}

export default DanhSachSanPham;
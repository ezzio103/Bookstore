import React, { useEffect, useState } from "react";

import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link, useNavigate } from "react-router-dom";
import renderRating from "../../utils/SaoXepHang";
import { dinhDangSo } from "../../utils/DinhSangSo";
import { JwtPayload } from "../../admin/RequireAdmin";
import { jwtDecode } from "jwt-decode";
import { addItemIntoCart } from "../../../api/OrderItemAPI";
interface SachPropsInterface{
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {
    const maSach :number = props.sach.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const navigate = useNavigate();
   const token = localStorage.getItem('token');
   
   const addIntoCart = async ()=>{
    if (!token) {
        navigate("/dang-nhap");
        return;
    } else {
        // Giải mã token
        const decodedToken = jwtDecode(token) as JwtPayload;
        await addItemIntoCart(decodedToken.id,maSach);
   }}

    useEffect(()=>{
        layToanBoAnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
                // console.log(danhSachAnh)
               
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
        <div className="col-md-3 mt-2">
            <div className="card text-align-center">
                <Link to={`/sach/${maSach}`}>
                <img
                    src={duLieuAnh}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: '300px' }}
                /></Link>
                <div className="card-body">
                    <Link to={`/sach/${maSach}`} style={{textDecoration:' none'}}>
                    <h5 className="card-title" > {props.sach.tenSach}</h5>
                    </Link>
                    <p className="card-text">{props.sach.moTa}</p>
                    <div className="price">
                        <span className="original-price me-1">
                            <del>{dinhDangSo(props.sach.giaNiemYet)+'đ'}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{dinhDangSo(props.sach.giaBan)+'đ'}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            {renderRating(props.sach.trungBinhXepHang?props.sach.trungBinhXepHang:0)}
                        </div>
                        <div className="col-6 text-end">
                        <a href="#" className="btn btn-secondary btn-block me-2">
                                <i className="fas fa-heart"></i>
                            </a>
                            <button className="btn btn-danger btn-block" onClick={addIntoCart}>
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;
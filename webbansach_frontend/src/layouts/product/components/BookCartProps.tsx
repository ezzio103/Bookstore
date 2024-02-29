import React, { useEffect, useState } from "react";
// import BookCa
import OrderItemModel from "../../../models/OrderItemModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { dinhDangSo } from "../../utils/DinhSangSo";
import SachModel from "../../../models/SachModel";
import { laySachTheoMaSach } from "../../../api/SachAPI";
import { Navigate, useNavigate } from "react-router-dom";
import { updateQuantity } from "../../../api/OrderItemAPI";

interface ItemProps {
    item: OrderItemModel;
    setTotal2 : (total:number) => void;
}

const BookCartProps: React.FC<ItemProps> = ({item,setTotal2 } : ItemProps) => {
	// const [bookList2,setBookList] = useState<OrderItemModel[]>(bookList);
    const maSach :number = item.book.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [book,setBook] = useState<SachModel>();
   const [soLuongTruoc,setSoLuongTruoc] = useState(item.quantity)
   const [soLuong,setSoLuong] = useState(item.quantity)
    const navigate= useNavigate();

    //thay doi trong database
    const handleQuantityChange = async () => {
        const token = localStorage.getItem('token');
        
        if(item.book.giaBan)
        setTotal2(  soLuong * item.book.giaBan - soLuongTruoc * item.book.giaBan)
        

        // console.log(`http://localhost:8080/chi-tiet-don-hang/${item.id}`);
        // Thực hiện yêu cầu PATCH chỉ với trường soLuong
         updateQuantity(item.id,soLuong,token);
    };

   const tangSoLuong = ()=>{
    const soLuongKho = book && book.soLuong?book.soLuong:0;
    if(soLuong<soLuongKho){
        setSoLuongTruoc(soLuong);
        setSoLuong(soLuong+1);
        // handleQuantityChange();
    }
}
const giamSoLuong = ()=>{
   
    if(soLuong>1){
        setSoLuongTruoc(soLuong);
        setSoLuong(soLuong-1);
        // handleQuantityChange();
    }
}
const handleSoLuongChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
const soLuongKho = book && book.soLuong?book.soLuong:0;
const soLuong= parseInt(e.target.value);
if(!isNaN(soLuong) && soLuong>0 && soLuong<=soLuongKho){
    setSoLuongTruoc(soLuong);
    setSoLuong(soLuong)
    // handleQuantityChange();
}
}
   

    useEffect(()=>{
        handleQuantityChange();
        laySachTheoMaSach(maSach).then(
            kq=> 
            {
                kq && setBook(kq);
                // kq?.soLuong && setSoLuong(kq?.soLuong)
            }
            )
        .catch(error =>{
            setBaoLoi(error.message)
        })

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
    },[soLuong])
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
	return (
		<div>
             
            

         <div className="row mb-4 d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src={duLieuAnh}
                        className="img-fluid rounded-3" alt="Cotton T-shirt" style={{ height: '90px' }}/>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">{item.book.tenSach}</h6>
                      <h6 className="text-black mb-0">{item.book.tenTacGia}</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button className="btn btn-link px-2"
                      onClick={giamSoLuong}
                        >
                        <i className="fas fa-minus"></i>
                      </button>

                      {/* <input id="form1" min="0" name="quantity" value={item.quantity} type="number"
                        className="form-control form-control-sm" /> */}
                        <input className="form-control form-control-sm" type="number"  value={soLuong} min={1} onChange={handleSoLuongChange} />
                      <button className="btn btn-link px-2"
                        onClick={tangSoLuong}
                        >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 className="mb-0">{dinhDangSo( item.book.giaBan && item.book.giaBan * soLuong)+'đ'}</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                    </div>
                  </div>   
               
            </div> 
            

        
    
			
	);
};

export default BookCartProps;

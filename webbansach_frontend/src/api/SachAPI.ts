import React from "react";
import SachModel from "../models/SachModel";
import request from "./Request";
import { error } from "console";
interface KetQuaInterface{
    ketQua: SachModel[];
    tongSoSach: number;
    tongSoTrang: number;
}
export async function laySach(duongDan:string): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];
    //xac dinh endpoint
 
    const response = await request(duongDan);
    // lay thon tin trang
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;
    const responseData = response._embedded.saches;
    for( const key in responseData){
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa:responseData[key].moTa,
            soLuong:responseData[key].soLuong,
            tenTacGia:responseData[key].tenTacGia,
            trungBinhXepHang:responseData[key].trungBinhXepHang
        })
    };
    return {ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang};
    
}

export async function lay1Sach(duongDan:string): Promise<SachModel> {
    // const ketQua: SachModel;
    //xac dinh endpoint
 
    const responseData = await request(duongDan);
    // lay thon tin trang
    
    return{
        
        
            maSach: responseData.maSach,
            tenSach: responseData.tenSach,
            giaBan: responseData.giaBan,
            giaNiemYet: responseData.giaNiemYet,
            moTa:responseData.moTa,
            soLuong:responseData.soLuong,
            tenTacGia:responseData.tenTacGia,
            trungBinhXepHang:responseData.trungBinhXepHang
        
    };
    
}


export async function layToanBoSach(trangHienTai: number): Promise<KetQuaInterface> {
   
    //xac dinh endpoint, lay co dinh 4 quyen sach
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&page=${trangHienTai -1}&size=4`;
    
    return laySach(duongDan);
}
export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
   
    //xac dinh endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';
    
    return laySach(duongDan);
}
//
export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number ,trangHienTai : number): Promise<KetQuaInterface> {

    // Xác định endpoint
    let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=4&page=0`;
    if (tuKhoaTimKiem !== ''&& maTheLoai == 0) {
        duongDan=`http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=4&page=${trangHienTai - 1}&tenSach=${tuKhoaTimKiem}`
    }else if(tuKhoaTimKiem === ''&& maTheLoai > 0){
        duongDan=`http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=4&page=${trangHienTai - 1}&maTheLoai=${maTheLoai}`
    }else{
        duongDan=`http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=4&page=${trangHienTai - 1}&tenSach=${tuKhoaTimKiem}&maTheLoai=${maTheLoai}`
    }

    return laySach(duongDan); 

}
export async function laySachTheoMaSach(maSach:number): Promise<SachModel|null> {
    const duongDan = `http://localhost:8080/sach/${maSach}`;
    
   try {
    const response = await fetch(duongDan);
     if(!response.ok){
        
         throw new Error('Gặp lỗi trong quá trình gọi API lấy sách!')
     }
     const sachData = await response.json();
     if(sachData){
         return {
             maSach: sachData.maSach,
             tenSach: sachData.tenSach,
             giaBan: sachData.giaBan,
             giaNiemYet: sachData.giaNiemYet,
             moTa: sachData.moTa,
             soLuong: sachData.soLuong,
             tenTacGia: sachData.tenTacGia,
             trungBinhXepHang: sachData.trungBinhXepHang
         }
     } else{
         throw new Error('Sach khong ton tai!')
     }
   } catch (error) {
    console.error("Error: ", error);
        return null;
   }
    
    
}
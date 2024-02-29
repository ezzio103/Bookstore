import { endpointBE } from "../layouts/utils/Constant";

import OrderItemModel from "../models/OrderItemModel";
import { getOrder, getOrderByIdOrder } from "./OrderAPI";

import  request  from "./Request";
import { lay1Sach, laySach, laySachTheoMaSach } from "./SachAPI";
import UserModel from '../models/UserModel';
import OrderModel from '../models/OrderModel';
import SachModel from '../models/SachModel';

export async function getOrderItemAllByIdOrder(idOrder : number): Promise<OrderItemModel[]> {
//    const idUser = getIdUserByToken();

   const endpoint = endpointBE + `/don-hang/${idOrder}/danhSachChiTietDonHang`;
   try {
      const orderItemResponse = await request(endpoint);

      if (orderItemResponse) {
         const orderItemResponseList: OrderItemModel[] = await Promise.all(orderItemResponse._embedded.chiTietDonHangs.map(async (item: any) => {
            const bookResponse = await lay1Sach(item._links.sach.href);
            
            const orderResponse = await getOrder(item._links.donHang.href)
            return {  
                id : item.chiTietDonHang,
                quantity: item.soLuong,
                book: bookResponse ,
                order: orderResponse,
            };
         }));
         return orderItemResponseList;
      }
   } catch (error) {
      console.error('Error: ', error);
   }
   return [];
}
// export async function getOrderItemById(id : number): Promise<OrderItemModel[]> {
//    //    const idUser = getIdUserByToken();
   
//       const endpoint = endpointBE + `/don-hang/${idOrder}/danhSachChiTietDonHang`;
//       try {
//          const orderItemResponse = await request(endpoint);
   
//          if (orderItemResponse) {
//             const orderItemResponseList: OrderItemModel[] = await Promise.all(orderItemResponse._embedded.chiTietDonHangs.map(async (item: any) => {
//                const bookResponse = await lay1Sach(item._links.sach.href);
               
//                const orderResponse = await getOrder(item._links.donHang.href)
//                return {  
//                    id : item.chiTietDonHang,
//                    quantity: item.soLuong,
//                    book: bookResponse ,
//                    order: orderResponse,
//                };
//             }));
//             return orderItemResponseList;
//          }
//       } catch (error) {
//          console.error('Error: ', error);
//       }
//       return [];
//    }
export async function updateQuantity(id : number,soLuong :number, token:any) {
   //    const idUser = getIdUserByToken();
   
      const endpoint = endpointBE + `/chi-tiet-don-hang/${id}`;
         await fetch(endpoint, {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({ soLuong: soLuong })
     }).then((response) => {
         if (response.ok) {
             // alert("Đã cập nhật số lượng sách thành công!");
             
             
         } else {
             alert("Gặp lỗi trong quá trình cập nhật số lượng!");
         }
     });
      return;

  
   }


   export async function addItemIntoCart(idUser : number, idBook : number) {
      //    const idUser = getIdUserByToken();
      
         const endpoint = `http://localhost:8080/cart-item/add-item`;
         try {
            const request1 = await request(`http://localhost:8080/don-hang/search/findByStatusAndNguoiDung_MaNguoiDung?status=0&maNguoiDung=${idUser}`);
            const orderModel  =request1._embedded.donHangs[0];
            const order = await getOrderByIdOrder(orderModel.maDonHang);
            console.log(order.idOrder);
            // orderModel.id;
            const listItem : OrderItemModel[] = await getOrderItemAllByIdOrder(order.idOrder);
            if(!listItem.find((item)=>{
               return item.book.maSach === idBook ;
            })){
               const book : SachModel|null = await laySachTheoMaSach(idBook);
            if(book?.soLuong&& book.soLuong>0 ){
               const token = localStorage.getItem('token');
               console.log(JSON.stringify({
                  chiTietDonHang: listItem.length>0? listItem[listItem.length-1].id+1:0,
                  soLuong: 1,
                  giaBan: book.giaBan,
                 sach : book,
                 donHang : order
                }))
                const maDonHang =listItem.length>0? listItem[listItem.length-1].id+1:0;
               await fetch(endpoint, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                     chiTietDonHang: maDonHang,
                     soLuong: 1,
                     giaBan: book.giaBan,
                    sach : {maSach: book.maSach},
                    donHang : {
                     maDonHang: order.idOrder},
                   })
              })
              .then((response) => {
                  if (response.ok) {
                      alert("Đã thêm sách thành công!");
                      
                      
                  } else {
                      alert("Gặp lỗi trong quá trình cập nhật số lượng!");
                  }
               })
                  
            } else{
               alert("Out Of Stock!");
            }
           
              
            }else{
               alert("The Item already exists in the shopping cart! ")
            }
         } catch (error) {
            console.error('Error: ', error);
         }
      }
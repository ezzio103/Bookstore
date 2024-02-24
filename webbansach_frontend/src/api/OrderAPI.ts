import { endpointBE } from "../layouts/utils/Constant";

import OrderModel from "../models/OrderModel";
import UserModel from "../models/UserModel";
import request from "./Request";
import { get1User } from "./UserAPI";

export async function getAllOrders(): Promise<OrderModel[]> {
   try {
      const endpoint: string = endpointBE + "/don-hang?sort=maDonHang,desc";
      const response = await request(endpoint);

      const datas = await Promise.all(response._embedded.donHangs.map(async (data: any) => {
        //  const responsePayment = await request(endpointBE + `/donHangs/${data.maDonHang}/payment`);
         //lay nguoi dung tu url nguoi dung trong don hang
         const response2 = await request(data._links.nguoiDung.href);
         const user1 : UserModel = await get1User(response2.maNguoiDung) ;
         return {
            idOrder: data.maDonHang,
            deliveryAddress: data.diaChiNhanHang,
            totalPrice: data.tongTien,
            totalPriceProduct: data.tongTienSanPham,
            feeDelivery: data.chiPhiGiaoHang,
            feePayment: data.chiPhiThanhToan,
            dateCreated: data.ngayTao,
            status: data.status,
            user: user1,
            // fullName: data.fullName,
            
            // payment: responsePayment.namePayment,
         };
      }));

      return datas;
   } catch (error) {
      console.error("Error while fetching orders:", error);
      throw error;
   }
}

export async function getOrderByIdOrder(idOrder : number): Promise<OrderModel> {
    try {
        const endpoint = endpointBE + `/don-hang/${idOrder}`;
       const data = await request(endpoint);
 
       
          //lay nguoi dung tu url nguoi dung trong don hang
        //   console.log(data._links.nguoiDung.href);
          const response2 = await request(data._links.nguoiDung.href);

          const user1 : UserModel = await get1User(response2.maNguoiDung) ;
          return { 
             idOrder: data.maDonHang,
             deliveryAddress: data.diaChiNhanHang,
             totalPrice: data.tongTien,
             totalPriceProduct: data.tongTienSanPham,
             feeDelivery: data.chiPhiGiaoHang,
             feePayment: data.chiPhiThanhToan,
             dateCreated: data.ngayTao,
             status: data.status,
             user: user1,
             // fullName: data.fullName,
             
             // payment: responsePayment.namePayment,
          };
       
    } catch (error) {
       console.error("Error while fetching orders:", error);
       throw error;
    }
 }

 export async function getCartByUserId(id : number): Promise<OrderModel> {
    try {
        const endpoint = endpointBE + `/don-hang/search/findByStatusAndNguoiDung_MaNguoiDung?status=0&maNguoiDung=${id}`;
       const response = await request(endpoint);
        const data = response._embedded.donHangs[0];
        
          //lay nguoi dung tu url nguoi dung trong don hang
          const response2 = await request(data._links.nguoiDung.href);
          
          const user1 : UserModel = await get1User(response2.maNguoiDung) ;
          
          return {
            
             idOrder: data.maDonHang,
             deliveryAddress: data.diaChiNhanHang,
             totalPrice: data.tongTien,
             totalPriceProduct: data.tongTienSanPham,
             feeDelivery: data.chiPhiGiaoHang,
             feePayment: data.chiPhiThanhToan,
             dateCreated: data.ngayTao,
             status: data.status,
             user: user1,
             // fullName: data.fullName,
             
             // payment: responsePayment.namePayment,
          };
       
    } catch (error) {
       console.error("Error while fetching orders:", error);
       throw error;
    }
 }

 export async function getOrder(endpoint: string): Promise<OrderModel> {
    try {
        // const endpoint = endpointBE + `/don-hang/${idOrder}`;
       const data = await request(endpoint);
 
       
          //lay nguoi dung tu url nguoi dung trong don hang
          const response2 = await request(data._links.nguoiDung.href);
          const user1 : UserModel = await get1User(response2.maNguoiDung) ;
          return {
             idOrder: data.maDonHang,
             deliveryAddress: data.diaChiNhanHang,
             totalPrice: data.tongTien,
             totalPriceProduct: data.tongTienSanPham,
             feeDelivery: data.chiPhiGiaoHang,
             feePayment: data.chiPhiThanhToan,
             dateCreated: data.ngayTao,
             status: data.status,
             user: user1,
             // fullName: data.fullName,
             
             // payment: responsePayment.namePayment,
          };
       
    } catch (error) {
       console.error("Error while fetching orders:", error);
       throw error;
    }
 }

export async function getAllOrdersByIdUser(idUser: number): Promise<OrderModel[]> {
   const endpoint = endpointBE + `/nguoi-dung/${idUser}/danhSachDonHang?sort=maDonHang,desc`;
   const response = await request(endpoint);
   const datas = await Promise.all(response._embedded.orders.map(async (data: any) => {
    const response2 = await request(data._links.nguoiDung.href);
         const user1 : UserModel = await get1User(response2.maNguoiDung) ;
    //   const responsePayment = await request(endpointBE + `/danhSachDonHang/${data.maDonHang}/payment`);
      const order: OrderModel = {
            idOrder: data.maDonHang,
            deliveryAddress: data.diaChiNhanHang,
            totalPrice: data.tongTien,
            totalPriceProduct: data.tongTienSanPham,
            feeDelivery: data.chiPhiGiaoHang,
            feePayment: data.chiPhiThanhToan,
            dateCreated: data.ngayTao,
            status: data.status,
            user: user1,
        //  user: data._embedded.user,
        //  fullName: data.fullName,
        //  note: data.note,
        //  payment: responsePayment.namePayment,
      }
      return order;
   }))

   return datas;
}

// export async function get1Orders(maDonHang: number): Promise<OrderModel> {
//    const endpoint: string = endpointBE + `/orders/${maDonHang}`;
//    const responseOrder = await request(endpoint);
//    const responsePayment = await request(endpointBE + `/orders/${responseOrder.maDonHang}/payment`);
//    const responseOrderDetail = await request(endpointBE + `/orders/${responseOrder.maDonHang}/listOrderDetails`);
//    let cartItems: CartItemModel[] = [];

//    // Sử dụng Promise.all để chờ tất cả các promise hoàn thành
//    await Promise.all(responseOrderDetail._embedded.orderDetails.map(async (orderDetail: any) => {
//       const responseBook = await request(endpointBE + `/order-detail/${orderDetail.maDonHangDetail}/book`);
//       cartItems.push({ book: responseBook, quantity: orderDetail.quantity, review: orderDetail.review });
//    }));

//    const order: OrderModel = {
//       maDonHang: responseOrder.maDonHang,
//       deliveryAddress: responseOrder.deliveryAddress,
//       totalPrice: responseOrder.totalPrice,
//       totalPriceProduct: responseOrder.totalPriceProduct,
//       feeDelivery: responseOrder.feeDelivery,
//       feePayment: responseOrder.feePayment,
//       dateCreated: responseOrder.dateCreated,
//       status: responseOrder.status,
//       user: responseOrder._embedded.user,
//       fullName: responseOrder.fullName,
//       phoneNumber: responseOrder.phoneNumber,
//       note: responseOrder.note,
//       cartItems: cartItems,
//       payment: responsePayment.namePayment,
//    }

//    return order;
//}
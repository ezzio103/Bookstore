import { endpointBE } from "../layouts/utils/Constant";

import OrderItemModel from "../models/OrderItemModel";
import { getOrder } from "./OrderAPI";

import  request  from "./Request";
import { lay1Sach, laySach } from "./SachAPI";

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
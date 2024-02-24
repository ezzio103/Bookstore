import OrderModel from "./OrderModel";
import BookModel from "./SachModel";

class OrderItemModel {
   id: number;
   quantity: number;
   book: BookModel;
   idUser?: number;
   order: OrderModel;
//    review?: boolean;

   constructor(id:number,quantity: number, book: BookModel, order: OrderModel) {
    this.id=id;
      this.quantity = quantity;
      this.book = book;
      this.order=order;
   }
}

export default OrderItemModel;
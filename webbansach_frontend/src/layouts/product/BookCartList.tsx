import React, { useEffect, useState } from "react";
// import BookCa
import OrderItemModel from '../../models/OrderItemModel';
import BookCartProps from "./components/BookCartProps";
import { dinhDangSo } from "../utils/DinhSangSo";

interface BookCartListProps {
    bookList: OrderItemModel[];
    setTotal2 : (total:number) => void;
}

const BookCartList: React.FC<BookCartListProps> = ({bookList,setTotal2} : BookCartListProps) => {
	// const [bookList2,setBookList] = useState<OrderItemModel[]>(bookList);
    

	return (
		<div>
           

           {bookList.map((item) => {
                                               

              return <BookCartProps key={item.book.maSach} item={item} setTotal2={setTotal2} />;
               })}
         



        </div>
			
	);
};

export default BookCartList;

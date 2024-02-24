import React, { useEffect, useState } from "react";
import BookCartList from "../product/BookCartList";
import useScrollToTop from "../../hooks/ScrollToTop";
import OrderItemModel from "../../models/OrderItemModel";
import OrderModel from "../../models/OrderModel";
import { getCartByUserId, getOrderByIdOrder } from "../../api/OrderAPI";
import { getOrderItemAllByIdOrder } from "../../api/OrderItemAPI";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { get1User } from "../../api/UserAPI";
import { dinhDangSo } from "../utils/DinhSangSo";

interface CartPageProps {}
interface JwtPayload {
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
    id : number;
}
const CartPage: React.FC<CartPageProps> = (props) => {
	useScrollToTop(); // Mỗi lần vào component này thì sẽ ở trên cùng
    const [bookList,setBookList] = useState<OrderItemModel[]>([]);
    const [order,setOrder] = useState<OrderModel>();
    const [total, setTotal] = useState<number>(0);
    
    const [quantity, setQuantity] = useState<number>(0);
    const navigate = useNavigate();
    const setTotal2 = (newTotalAmount: number) => {
        setTotal(total + newTotalAmount);
    };

    useEffect( ()=>{
        
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/dang-nhap");
            return;
        } else {
            // Giải mã token
            const decodedToken = jwtDecode(token) as JwtPayload;
            // console.log(decodedToken.id);
            
            const fetchData = async () => {
                try {
                    const orderData = await getCartByUserId(decodedToken.id);
                    setOrder(orderData);

                    const orderItemsData = await getOrderItemAllByIdOrder(orderData.idOrder);
                    setBookList(orderItemsData);
                    setQuantity(orderItemsData.length)
                    
                    // tinh total
                    const newTotal = orderItemsData.reduce((acc, item) => {
                        const itemPrice = item.book.giaBan ?? 0; 
                        
                        return acc + itemPrice * item.quantity;
                    }, 0);

                    setTotal(newTotal);
                    
                    
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();}
    },[])
	return (<div>
         <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">
                    <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-0">
                            <div className="row g-0">
                                <div className="col-lg-8">
                                    <div className="p-5">
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                            <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                            <h6 className="mb-0 text-muted">{quantity} items</h6>
                                        </div>
                                        <hr className="my-4"/>
                                        <BookCartList bookList={bookList} setTotal2={setTotal2}/>
                                        

                                        <hr className="my-4"/>

                                        <div className="pt-5">
                                            <h6 className="mb-0">
                                                <Link
                                                to={"/"}
                                                className='position-absolute'
                                                style={{textDecoration : "none" 
                                            }}
                                                ><i
                                                className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</Link>
                                                </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 bg-grey">
                                    <div className="p-5">
                                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                        <hr className="my-4"/>

                                        <div className="card-body">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>{dinhDangSo(total)+"đ"}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>{order?.feeDelivery && dinhDangSo( order?.feeDelivery)+"đ"}</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                 
                </div>
                <span><strong>{(order?.feeDelivery) ? dinhDangSo(total + order?.feeDelivery)+"đ" : dinhDangSo(total )+"đ" }</strong></span>
              </li>
            </ul>

            <button type="button" className="btn btn-primary btn-lg btn-block">
              Go to checkout
            </button>
          </div>

                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
            
        </div>
        
    </div>
        
    )
    
    
};

export default CartPage;

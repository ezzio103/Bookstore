import React from "react";
function Banner() {
    return (
        <div className="p-2 mb-2 bg-light ">
                <div className="container-fluid py-5  d-flex 
                justify-content-center align-items-center  " >
                    <div>
                        <h3 className="display-5 fw-bold banner-text-custom">
                             Đọc sách chính là hộ chiếu <br/> cho vô số cuộc phiêu lưu
                        </h3>
                        <p className="">Mary Pope Osborne</p>
                        <button className="btn btn-primary btn-lg text-white float-end">Khám phá sách </button>                        
                    </div>
                </div>
        </div>
    );
}
export default Banner;
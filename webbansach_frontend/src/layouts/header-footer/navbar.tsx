import React, { ChangeEvent, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import  Button  from "@mui/material";
import { getRoleByToken, isToken, logout } from "../utils/JWTService";
interface NavbarProps {
  tuKhoaTimKiem: string;
  setTuKhoaTimKiem: (tuKhoa: string) => void;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
  const navigate = useNavigate();
  const [tuKhoaTamThoi,setTuKhoaTamThoi] = useState('');
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setTuKhoaTamThoi(e.target.value);
  }
  const handleSearch = ()=>{
    setTuKhoaTimKiem(tuKhoaTamThoi);

  }
    return(
        <nav className="navbar navbar-expand-lg navbar-light navbar-bg-custom" >
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">Bookstore</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Trang chủ</NavLink>
              </li>
              
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Thể loại sách
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><NavLink className="dropdown-item" to="/1">Thể loại 1</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/2">Thể loại 2</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/3">Thể loại 3</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Quy định bán hàng
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                  <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                  <li><a className="dropdown-item" href="#">Quy định 3</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Liên hệ</a>
              </li>
            </ul>
          </div>
  
          {/* Tìm kiếm */}
          <div className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} value={tuKhoaTamThoi} />
          <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
            <Search/>
          </button>
          </div>

          
          {/* Biểu tượng giỏ hàng */}
          {/* <ul className="navbar-nav me-1">
            <li className="nav-item">
              <a className="nav-link" href="#">
              <NavLink className="nav-link" aria-current="page" to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </NavLink>
                
              </a>
            </li>
          </ul> */}
            {/* checkToken */}
          {!isToken() && (
            
						<div className="me-1">
							<Link to={"/dang-nhap"}>
              
              <button className="btn btn-outline-success" type="button" >
            Login
          </button>
							</Link>
							<Link to={"/dangKy"}>
              <button className="btn btn-outline-success" type="button" >
            SignUp 
          </button>
							</Link>
						</div>
					)}
  
          {isToken() && (
						<>
               <ul className="navbar-nav me-1">
            <li className="nav-item">
              <a className="nav-link" href="#">
              <NavLink className="nav-link" aria-current="page" to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </NavLink>
                
              </a>
            </li>
          </ul>
              <div className="nav-item dropdown">
                
              </div>
							{/* <!-- Notifications --> */}
							<div className='nav-item dropdown'>
								
                <NavLink className="nav-link dropdown-toggle" 
                to="#" 
                id="navbarDropdownMenuLink2" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                <i className='fas fa-bell'></i>
									<span className='badge rounded-pill badge-notification bg-danger'>
										1
									</span>
                </NavLink>
								<ul
									className='dropdown-menu dropdown-menu-end'
									aria-labelledby='navbarDropdownMenuLink2'
								>
									<li>
										<a className='dropdown-item' href="#">
											Some news
										</a>
									</li>
									<li>
										<a className='dropdown-item' href="#">
											Another news
										</a>
									</li>
									<li>
										<a className='dropdown-item' href="#">
											Something else here
										</a>
									</li>
								</ul>

							</div>
							{/* <!-- Avatar --> */}
							<div className='dropdown'>
							<a
									className='dropdown-toggle d-flex align-items-center hidden-arrow nav-link'
									href='#'
									id='navbarDropdownMenuAvatar'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									tT
								</a>
								
								<ul
									className='dropdown-menu dropdown-menu-end'
									aria-labelledby='navbarDropdownMenuAvatar'
								>
									<li>
										<Link to={"/"} className='dropdown-item'>
											Thông tin cá nhân
										</Link>
									</li>
									<li>
										<Link
											className='dropdown-item'
											to='/'
										>
											Sách yêu thích của tôi
										</Link>
									</li>
									{getRoleByToken() === "ADMIN" && (
										<li>
											<Link
												className='dropdown-item'
												to='/'
											>
												Quản lý
											</Link>
										</li>
									)}
									<li>
										<a
											className='dropdown-item'
											style={{ cursor: "pointer" }}
											onClick={() => {
												
												logout(navigate);
												
											}}
										>
											Logout
										</a>
									</li>
								</ul>
							</div>
						</>
					)}
        </div>
      </nav>
    );
}

export default Navbar;
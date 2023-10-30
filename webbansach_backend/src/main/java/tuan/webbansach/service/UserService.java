package tuan.webbansach.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import tuan.webbansach.entity.NguoiDung;

public interface UserService extends UserDetailsService {
    public NguoiDung findByUsername(String tenDangNhap);

}
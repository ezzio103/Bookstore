package tuan.webbansach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tuan.webbansach.entity.NguoiDung;
import tuan.webbansach.sercurity.JwtResponse;
import tuan.webbansach.sercurity.LoginRequest;
import tuan.webbansach.service.JwtService;
import tuan.webbansach.service.TaiKhoanService;
import tuan.webbansach.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tai-khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanService taiKhoanService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;
    @PostMapping("/dang-ky")
    public ResponseEntity<?> dangKyNguoiDung (@Validated @RequestBody NguoiDung nguoiDung){

        ResponseEntity<?> response = taiKhoanService.dangKyNguoiDung(nguoiDung);
        return response;
    }
    @GetMapping("/kich-hoat")
    public ResponseEntity<?> dangKyNguoiDung ( @RequestParam String email, @RequestParam String maKichHoat){

        ResponseEntity<?> response = taiKhoanService.kichHoatTaiKHoan(email,maKichHoat);
        return response;
    }
    @PostMapping("/dang-nhap")
    public ResponseEntity<?> dangNhap(@RequestBody LoginRequest loginRequest){
        // Xác thực người dùng bằng tên đăng nhập và mật khẩu
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            // Nếu xác thực thành công, tạo token JWT
            if(authentication.isAuthenticated()){
                final String jwt = jwtService.generateToken(loginRequest.getUsername());
                return ResponseEntity.ok(new JwtResponse(jwt));
            }
        }catch (AuthenticationException e){
            // Xác thực không thành công, trả về lỗi hoặc thông báo
            return ResponseEntity.badRequest().body("Tên đăng nhập hặc mật khẩu không chính xác.");
        }
        return ResponseEntity.badRequest().body("Xác thực không thành công.");
    }
}

package tuan.webbansach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tuan.webbansach.entity.NguoiDung;
import tuan.webbansach.service.TaiKhoanService;

@RestController
@RequestMapping("/tai-khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanService taiKhoanService;
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
}

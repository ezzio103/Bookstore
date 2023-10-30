package tuan.webbansach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tuan.webbansach.entity.NguoiDung;
import tuan.webbansach.service.TaiKhoanService;

@RestController
@RequestMapping("/tai-khoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanService taiKhoanService;
    @PostMapping("/dang-ky")
    public ResponseEntity<?> dangKyNguoiDung (@Validated @RequestParam NguoiDung nguoiDung){

        ResponseEntity<?> response = taiKhoanService.dangKyNguoiDung(nguoiDung);
        return response;
    }
}

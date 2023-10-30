package tuan.webbansach.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tuan.webbansach.dao.NguoiDungRepository;
import tuan.webbansach.entity.NguoiDung;
import tuan.webbansach.entity.ThongBao;

@Service
public class TaiKhoanService {
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    public ResponseEntity<?> dangKyNguoiDung(NguoiDung nguoiDung){
        if(nguoiDungRepository.existsByTenDangNhap(nguoiDung.getTenDangNhap())){
            return ResponseEntity.badRequest().body(new ThongBao("Ten dang nhap da ton tai!"));
        }
        if(nguoiDungRepository.existsByEmail(nguoiDung.getEmail())){
            return ResponseEntity.badRequest().body(new ThongBao("Email da ton tai!"));
        }
        NguoiDung nguoiDungDaDangKy = nguoiDungRepository.save(nguoiDung);
        return ResponseEntity.ok("Dang ky thanh cong!");
    }
}

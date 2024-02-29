package tuan.webbansach.service.Cart;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tuan.webbansach.dao.ChiTietDonHangRepository;
import tuan.webbansach.dao.DonHangRepository;
import tuan.webbansach.dao.SachRepository;
import tuan.webbansach.entity.ChiTietDonHang;
import tuan.webbansach.entity.DonHang;
import tuan.webbansach.entity.Sach;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService{
    @Autowired
    private SachRepository sachRepository;
    @Autowired
    private DonHangRepository donHangRepository;
    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;
    @Override
    public ResponseEntity<?> save(ChiTietDonHang chiTietDonHang) {
        System.out.println(" da vao Cart service impl 2");
        Sach sach = sachRepository.findByMaSach(chiTietDonHang.getSach().getMaSach());
        chiTietDonHang.setSach(sach);
        DonHang donHang = donHangRepository.findByMaDonHang(chiTietDonHang.getDonHang().getMaDonHang());
        chiTietDonHang.setDonHang(donHang);
        chiTietDonHangRepository.save(chiTietDonHang);
        return ResponseEntity.ok("Đăng ký thành công");
    }
}

package tuan.webbansach.service.Cart;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import tuan.webbansach.entity.ChiTietDonHang;

public interface CartService {
    public ResponseEntity<?> save(ChiTietDonHang chiTietDonHang);
}

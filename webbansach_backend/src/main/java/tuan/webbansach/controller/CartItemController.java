package tuan.webbansach.controller;


import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tuan.webbansach.entity.ChiTietDonHang;
import tuan.webbansach.service.Cart.CartService;
import tuan.webbansach.service.Cart.CartServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cart-item")
public class CartItemController {

    @Autowired
    private CartServiceImpl cartService;
    @PostMapping("/add-item")
    public ResponseEntity<?> add(@Validated @RequestBody ChiTietDonHang chiTietDonHang) {
        try{
            System.out.println("da vao cart controller 1 ");
            return cartService.save(chiTietDonHang);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }


}


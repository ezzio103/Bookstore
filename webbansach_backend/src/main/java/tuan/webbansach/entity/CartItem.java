package tuan.webbansach.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cart")
    private int idCart;
    @Column (name = "quantity")
    private int quantity;
    @ManyToOne()
    @JoinColumn(name = "id_book", nullable = false)
    private Sach sach;
    @ManyToOne()
    @JoinColumn(name = "id_user", nullable = false)
    private NguoiDung nguoiDung;

    @Override
    public String toString() {
        return "CartItem{" +
                "idCart=" + idCart +
                ", quantity=" + quantity +
                ", book=" + sach.getMaSach() +
                '}';
    }
}


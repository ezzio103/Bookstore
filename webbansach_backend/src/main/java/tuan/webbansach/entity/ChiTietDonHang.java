package tuan.webbansach.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "chi_tiet_don_hang")
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chi_tiet_don_hang")
    private long chiTietDonHang;
    @Column(name = "so_luong")
    private int soLuong;
    @Column(name = "gia_ban")
    private double giaBan;
    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.PERSIST,
    CascadeType.DETACH,CascadeType.MERGE})
    @JoinColumn(name = "ma_sach",nullable = false)
    private Sach sach;
    @ManyToOne(cascade = {
            CascadeType.REFRESH,CascadeType.PERSIST,
            CascadeType.DETACH,CascadeType.MERGE})
    @JoinColumn(name = "ma_don_hang",nullable = false)
    private DonHang donHang;

}

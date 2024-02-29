package tuan.webbansach.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;
@Entity
@Data

@Table(name = "don_hang")
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_don_hang")
    private int maDonHang;
    @Column(name = "ngay_tao")
    private Date ngayTao;
    @Column(name = "dia_chi_mua_hang",length = 512)
    private String diaChiMuaHang;
    @Column(name = "dia_chi_nhan_hang",length = 512)
    private String diaChiNhanHang;
    @Column(name = "tong_tien_san_pham")
    private double tongTienSanPham;
    @Column(name = "chi_phi_giao_hang")
    private double chiPhiGiaoHang;
    @Column(name = "chi_phi_thanh_toan")
    private double chiPhiThanhToan;
    @Column(name = "tong_tien")
    private double tongTien;
    @Column(name = "status")
    private String status; // Trạng thái của đơn hàng
    @OneToMany(mappedBy = "donHang", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<ChiTietDonHang> danhSachChiTietDonHang;
    @ManyToOne(cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_nguoi_dung", nullable = false)
    private NguoiDung nguoiDung;

    @ManyToOne(cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_hinh_thuc_thanh_toan")
    private HinhThucThanhToan hinhThucThanhToan;

    @ManyToOne(cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_hinh_thuc_giao_hang")
    private HinhThucGiaoHang hinhThucGiaoHang;

    public int getMaDonHang() {
        return maDonHang;
    }

    public void setMaDonHang(int maDonHang) {
        this.maDonHang = maDonHang;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public String getDiaChiMuaHang() {
        return diaChiMuaHang;
    }

    public void setDiaChiMuaHang(String diaChiMuaHang) {
        this.diaChiMuaHang = diaChiMuaHang;
    }

    public String getDiaChiNhanHang() {
        return diaChiNhanHang;
    }

    public void setDiaChiNhanHang(String diaChiNhanHang) {
        this.diaChiNhanHang = diaChiNhanHang;
    }

    public double getTongTienSanPham() {
        return tongTienSanPham;
    }

    public void setTongTienSanPham(double tongTienSanPham) {
        this.tongTienSanPham = tongTienSanPham;
    }

    public double getChiPhiGiaoHang() {
        return chiPhiGiaoHang;
    }

    public void setChiPhiGiaoHang(double chiPhiGiaoHang) {
        this.chiPhiGiaoHang = chiPhiGiaoHang;
    }

    public double getChiPhiThanhToan() {
        return chiPhiThanhToan;
    }

    public void setChiPhiThanhToan(double chiPhiThanhToan) {
        this.chiPhiThanhToan = chiPhiThanhToan;
    }

    public double getTongTien() {
        return tongTien;
    }

    public void setTongTien(double tongTien) {
        this.tongTien = tongTien;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<ChiTietDonHang> getDanhSachChiTietDonHang() {
        return danhSachChiTietDonHang;
    }

    public void setDanhSachChiTietDonHang(List<ChiTietDonHang> danhSachChiTietDonHang) {
        this.danhSachChiTietDonHang = danhSachChiTietDonHang;
    }

    public NguoiDung getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(NguoiDung nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public HinhThucThanhToan getHinhThucThanhToan() {
        return hinhThucThanhToan;
    }

    public void setHinhThucThanhToan(HinhThucThanhToan hinhThucThanhToan) {
        this.hinhThucThanhToan = hinhThucThanhToan;
    }

    public HinhThucGiaoHang getHinhThucGiaoHang() {
        return hinhThucGiaoHang;
    }

    public void setHinhThucGiaoHang(HinhThucGiaoHang hinhThucGiaoHang) {
        this.hinhThucGiaoHang = hinhThucGiaoHang;
    }
}


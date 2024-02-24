package tuan.webbansach.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import tuan.webbansach.entity.ChiTietDonHang;
import tuan.webbansach.entity.DonHang;

import java.util.List;

@RepositoryRestResource(path = "chi-tiet-don-hang")
public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang,Long> {
    //tim chi tiet don hang theo don hang
    List<ChiTietDonHang> findChiTietDonHangByDonHang_MaDonHang(int maDonHang);
}

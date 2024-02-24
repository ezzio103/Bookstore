package tuan.webbansach.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import tuan.webbansach.entity.DonHang;

import java.util.List;

@RepositoryRestResource(path = "don-hang")
public interface DonHangRepository extends JpaRepository<DonHang,Integer> {
    // Tìm đơn hàng theo trạng thái và id người dùng
    List<DonHang> findByStatusAndNguoiDung_MaNguoiDung(@RequestParam("status") String status, @RequestParam("maNguoiDung") int maNguoiDung);
}
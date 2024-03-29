package tuan.webbansach.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import tuan.webbansach.entity.NguoiDung;

@RepositoryRestResource(path = "nguoi-dung")
public interface NguoiDungRepository extends JpaRepository<NguoiDung,Integer> {
    public boolean existsByTenDangNhap(String tenDangNhap);
    public boolean existsByEmail(String email);

   public NguoiDung findByTenDangNhap(String tenDangNhap);
    public NguoiDung findByEmail(String email);
}
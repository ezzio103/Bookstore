package tuan.webbansach.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import tuan.webbansach.entity.DonHang;

@RepositoryRestResource(path = "don-hang")
public interface DonHangRepository extends JpaRepository<DonHang,Integer> {
}
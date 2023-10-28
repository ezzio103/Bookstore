package tuan.webbansach.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import tuan.webbansach.entity.HinhAnh;

@RepositoryRestResource(path = "hinh-anh")
public interface HinhAnhRepository extends JpaRepository<HinhAnh,Integer> {
}
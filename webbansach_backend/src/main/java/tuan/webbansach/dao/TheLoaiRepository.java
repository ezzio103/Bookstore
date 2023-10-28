package tuan.webbansach.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import tuan.webbansach.entity.TheLoai;

@RepositoryRestResource(path = "the-loai")
public interface TheLoaiRepository extends JpaRepository<TheLoai,Integer> {
}
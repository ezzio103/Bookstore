package tuan.webbansach.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.swing.text.Caret;
import java.sql.Blob;
@Entity
@Data
@Table(name = "hinh_anh")
public class HinhAnh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_anh")
    private int maHinhAnh;
    @Column(name = "ten_hinh_anh")
    private String tenHinhAnh;
    @Column(name = "la_icon")
    private boolean laIcon; //isIcon
    @Column(name = "duong_dan")
    private String duongDan;
    @Column(name = "du_lieu_anh", columnDefinition = "LONGTEXT")
    @Lob
    private String duLieuAnh;
    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.PERSIST,
            CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "ma_sach", nullable = false )
    private Sach sach;
}

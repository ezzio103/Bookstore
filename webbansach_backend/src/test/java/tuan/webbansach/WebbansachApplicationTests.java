package tuan.webbansach;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import tuan.webbansach.entity.TheLoai;

@SpringBootTest
class WebbansachApplicationTests {

	@Test
	void contextLoads() {
		TheLoai theLoai = new TheLoai();
		theLoai.setMaTheLoai(1);
		theLoai.setTenTheLoai("sgk");

	}

}

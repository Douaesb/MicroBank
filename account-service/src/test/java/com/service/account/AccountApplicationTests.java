package com.service.account;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
		"eureka.client.enabled=false",
		"spring.cloud.config.enabled=false"
})
class AccountApplicationTests {

	@Test
	void contextLoads() {
	}

}

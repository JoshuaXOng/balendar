package balendar.app.routes;

import java.util.HashMap;

import com.google.gson.Gson;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import balendar.app.database.models.User;
import balendar.app.routes.dtos.AuthTokenDTO;
import balendar.app.routes.dtos.POSTAuthTokenDTO;
import balendar.app.security.JWTUtils;
import balendar.app.security.UserDetailsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v0/auth-tokens/")
public class AuthController {
	UserDetailsService userDetailsService;

	public AuthController(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<AuthTokenDTO> createAuthenticationToken(@RequestBody POSTAuthTokenDTO credentials) {
		User user = userDetailsService.loadUserByUsername(credentials.username);
		String authToken = JWTUtils.generateToken(user);

		Gson gson = new Gson();

		return ResponseEntity.ok(gson.fromJson(gson.toJson(new HashMap<String, String>() {{
			put("authToken", authToken);
		}}), AuthTokenDTO.class));
	}
}

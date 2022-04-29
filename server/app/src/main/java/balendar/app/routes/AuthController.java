package balendar.app.routes;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import balendar.app.database.models.User;
import balendar.app.routes.dtos.AuthTokenDTO;
import balendar.app.routes.dtos.POSTAuthTokenDTO;
import balendar.app.routes.exceptions.BadRequestException;
import balendar.app.security.JWTUtils;
import balendar.app.security.UserDetailsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v0/auth-tokens/")
public class AuthController {
	UserDetailsService userDetailsService;
	BCryptPasswordEncoder passwordEncoder;

	public AuthController(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
		this.userDetailsService = userDetailsService;
		this.passwordEncoder = passwordEncoder;
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<AuthTokenDTO> createAuthenticationToken(@RequestBody POSTAuthTokenDTO credentials) {
		User user = userDetailsService.loadUserByUsername(credentials.username);
		if (user == null)
			throw new BadRequestException("Username does not match any users");

		if (!this.passwordEncoder.matches(credentials.password, user.getPassword()))
			throw new BadRequestException("Password does not match the username");

		String authToken = JWTUtils.generateToken(user);
		return ResponseEntity.ok(new AuthTokenDTO(authToken));
	}

	@RequestMapping(method = RequestMethod.POST, value = "/verifications/")
	public ResponseEntity<?> verifyToken(@RequestBody POSTAuthTokenDTO credentials) {
		return ResponseEntity.ok("");
	}
}

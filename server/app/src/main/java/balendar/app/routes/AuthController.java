package balendar.app.routes;

import org.springframework.http.ResponseEntity;
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

	public AuthController(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<AuthTokenDTO> createAuthenticationToken(@RequestBody POSTAuthTokenDTO credentials) {
		User user = userDetailsService.loadUserByUsername(credentials.username);
		if (user == null)
			throw new BadRequestException("Username does not match any users");

		String authToken = JWTUtils.generateToken(user);
		return ResponseEntity.ok(new AuthTokenDTO(authToken));
	}

	@RequestMapping(method = RequestMethod.POST, value = "/verifications/")
	public ResponseEntity<?> verifyToken(@RequestBody POSTAuthTokenDTO credentials) {
		return ResponseEntity.ok("");
	}
}

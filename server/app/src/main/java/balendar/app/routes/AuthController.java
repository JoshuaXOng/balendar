package balendar.app.routes;

import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import balendar.app.database.models.User;
import balendar.app.routes.dtos.AuthTokenDTO;
import balendar.app.routes.dtos.CreateTokenValidationDTO;
import balendar.app.routes.dtos.POSTAuthTokenDTO;
import balendar.app.routes.exceptions.BadRequestException;
import balendar.app.routes.exceptions.UnauthorizedException;
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
		boolean isUsingToken = credentials.authToken != null;
		
		User user = userDetailsService.loadUserByUsername(credentials.username);
		if (!isUsingToken && user == null)
			throw new BadRequestException("Username does not match any users");

		if (!isUsingToken && !this.passwordEncoder.matches(credentials.password, user.getPassword()))
			throw new BadRequestException("Password does not match the username");

		String authToken = isUsingToken ? JWTUtils.generateLinkedAuthToken(credentials.authToken) : JWTUtils.generateAuthToken(user);
		if (isUsingToken && authToken == null) 
			throw new UnauthorizedException("Token has expired");
		
		return ResponseEntity.ok(new AuthTokenDTO(authToken));
	}

	@RequestMapping(method = RequestMethod.POST, value = "/validations/")
	public ResponseEntity<AuthTokenDTO> verifyToken(@RequestBody CreateTokenValidationDTO validationPayload) {
		String authToken = validationPayload.authToken;
		if (authToken == null)
			throw new BadRequestException("Auth token is required.");

		DecodedJWT decodedJwt = JWTUtils.getDecodedJwt(authToken);
		if (decodedJwt == null)
			throw new BadRequestException("Auth token is invalid.");

		return ResponseEntity.ok(new AuthTokenDTO(authToken));
	}
}

package balendar.app.security;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import balendar.app.database.models.User;
import io.github.cdimascio.dotenv.Dotenv;

public class JWTUtils {
  static public String generateToken(User user) {
		return JWT.create()
			.withSubject(user.id)
			.withClaim("username", user.getUsername())
			.withIssuedAt(new Date())
			.withExpiresAt(new Date(new Date().getTime() + 1000 * (60 * 60)))
			.sign(Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET_KEY")));
	}

	static public DecodedJWT getDecodedJwt(String authHeaderValue) {
    if (authHeaderValue == null) return null;

    String[] splitAhv = authHeaderValue.split(" ");
    if (splitAhv.length != 2) return null;
    if (!splitAhv[0].equals("Bearer")) return null;

    try {
      return JWT.require(Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET_KEY")))
        .build().verify(splitAhv[1]);
    } catch (Exception exception) { return null; }
  }
}
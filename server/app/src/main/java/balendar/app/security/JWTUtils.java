package balendar.app.security;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import balendar.app.database.models.User;
import io.github.cdimascio.dotenv.Dotenv;

public class JWTUtils {
  static public String generateAuthToken(User user) {
		return JWT.create()
			.withSubject(user.id)
			.withClaim("username", user.getUsername())
			.withIssuedAt(new Date())
			.withExpiresAt(new Date(new Date().getTime() + 1000 * (60 * 60)))
			.sign(Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET_KEY")));
	}

  static public String generateLinkedAuthToken(String jwt) {
    if (JWTUtils.getDecodedJwt(jwt) == null)
      return null;

		return JWT.create()
			.withSubject(JWTUtils.getDecodedJwt(jwt).getSubject())
			.withClaim("username", JWTUtils.getDecodedJwt(jwt).getClaim("username").toString())
			.withIssuedAt(new Date())
			.withExpiresAt(new Date(new Date().getTime() + 1000 * (60 * 60)))
			.sign(Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET_KEY")));
	}

	static public DecodedJWT getDecodedJwtFromHeaderValue(String authHeaderValue) {
    if (authHeaderValue == null) return null;

    String[] splitAhv = authHeaderValue.split(" ");
    if (splitAhv.length != 2) return null;
    if (!splitAhv[0].equals("Bearer")) return null;

    return JWTUtils.getDecodedJwt(splitAhv[1]);
  }

	static private DecodedJWT getDecodedJwt(String jwt) {
    try {
      return JWT.require(Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET_KEY")))
        .build().verify(jwt);
    } catch (Exception exception) { return null; }
  }
}
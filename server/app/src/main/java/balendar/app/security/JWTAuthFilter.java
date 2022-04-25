package balendar.app.security;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import balendar.app.database.models.User;
import balendar.app.database.repositories.UserRepo;

import java.io.IOException;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {
  UserRepo userRepo;

  public JWTAuthFilter(UserRepo userRepo) {
    this.userRepo = userRepo;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
    DecodedJWT decodedJwt = JWTUtils.getDecodedJwt(request.getHeader("Authorization"));

    if (decodedJwt != null) {
      User user = this.userRepo.findOneByUsername(decodedJwt.getClaim("username").asString());

      if (user != null) SecurityContextHolder.getContext().setAuthentication(
        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities())
      );
    }

    chain.doFilter(request, response);
  }
}
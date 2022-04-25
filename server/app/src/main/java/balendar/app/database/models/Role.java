package balendar.app.database.models;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {
  public static final String ADMIN = "ADMIN";

  public String authority;

  @Override
  public String getAuthority() {
    return this.authority;
  }
}

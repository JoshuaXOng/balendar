package balendar.app.database.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

@Document
public class User implements UserDetails {
  public @Id String id;  

  boolean enabled = true;

  @Indexed(unique = true)
  String username;
  String password;
  
  public Set<Role> authorities = new HashSet<>();

  @DBRef
  public List<CalendarNote> notes = new ArrayList<>();

  public User() {}

  public User(String username, String password) {
    this.username = username;
    this.password = password;
  }

  @Override
  public String getUsername() {
    return this.username;
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public Set<Role> getAuthorities() {
    return this.authorities;
  }

  @Override
  public boolean isEnabled() {
    return this.enabled;
  }

  @Override
  public boolean isAccountNonExpired() {
    return this.enabled;
  }

  @Override
  public boolean isAccountNonLocked() {
    return this.enabled;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return this.enabled;
  }
}

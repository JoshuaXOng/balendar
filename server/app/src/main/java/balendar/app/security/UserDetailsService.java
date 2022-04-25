package balendar.app.security;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import balendar.app.database.models.User;
import balendar.app.database.repositories.UserRepo;

public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
  UserRepo userRepo;

  public UserDetailsService(UserRepo userRepo) {
    this.userRepo = userRepo;
  }

	public User loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepo.findOneByUsername(username);
  }
}

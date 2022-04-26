package balendar.app.routes;

import java.util.List;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import balendar.app.database.models.User;
import balendar.app.database.repositories.UserRepo;
import balendar.app.routes.dtos.CreateUserDTO;
import balendar.app.routes.exceptions.BadRequestException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v0/users/")
public class UserController {
  MongoOperations mongoOperations;
  UserRepo userRepo;

  BCryptPasswordEncoder passwordEncoder;

  public UserController(MongoOperations mongoOperations, UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
    this.mongoOperations = mongoOperations;
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<List<User>> createUser() {
    List<User> users = this.userRepo.findAll();
    return ResponseEntity.ok(users);
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<User> createUser(@RequestBody CreateUserDTO createPayload) {
    User existingUser = this.userRepo.findOneByUsername(createPayload.username);
    if (existingUser != null) throw new BadRequestException("Username already exists.");

    User newUser = new User(createPayload.username, this.passwordEncoder.encode(createPayload.password));
    return ResponseEntity.ok(userRepo.save(newUser));
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<?> deleteAllUsers() {
    return ResponseEntity.ok(this.mongoOperations.findAllAndRemove(Query.query(Criteria.where(null)), User.class));
  }
}

package balendar.app.routes;

import java.util.HashMap;

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

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<?> createUser(@RequestBody CreateUserDTO createPayload) {
    User existingUser = this.userRepo.findOneByUsername(createPayload.username);
    if (existingUser != null)
      return ResponseEntity.badRequest().body(new HashMap<String, Object>() {{
        put("msg", "Username already exists.");
      }});

    User newUser = new User(createPayload.username, this.passwordEncoder.encode(createPayload.password));
    return ResponseEntity.ok(userRepo.save(newUser));
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<?> deleteAllUsers() {
    return ResponseEntity.ok(this.mongoOperations.findAllAndRemove(Query.query(Criteria.where(null)), User.class));
  }
}

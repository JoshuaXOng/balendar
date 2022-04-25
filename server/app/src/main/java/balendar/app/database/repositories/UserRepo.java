package balendar.app.database.repositories;

import balendar.app.database.models.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
  User findOneById(String id);
  User findOneByUsername(String username);
}

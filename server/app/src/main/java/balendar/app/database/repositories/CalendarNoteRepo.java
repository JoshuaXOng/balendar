package balendar.app.database.repositories;

import balendar.app.database.models.CalendarNote;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CalendarNoteRepo extends MongoRepository<CalendarNote, String> {
  CalendarNote findOneById(String id);

  List<CalendarNote> findAll();
}

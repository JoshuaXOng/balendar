package balendar.app.database.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import balendar.app.database.models.CalendarNote;

import java.util.List;

public interface CalendarNoteRepo extends MongoRepository<CalendarNote, String> {
  CalendarNote findOneById(String id);
  List<CalendarNote> findAll();
}

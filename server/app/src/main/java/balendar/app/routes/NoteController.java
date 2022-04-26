package balendar.app.routes;

import balendar.app.database.models.CalendarNote;
import balendar.app.database.models.User;
import balendar.app.database.repositories.CalendarNoteRepo;
import balendar.app.database.repositories.UserRepo;
import balendar.app.routes.dtos.CalendarNoteDTO;
import balendar.app.routes.dtos.CreateNoteDataDTO;
import balendar.app.routes.dtos.UpdateNoteDataDTO;
import balendar.app.routes.exceptions.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/v0/notes/")
public class NoteController {
  MongoOperations mongoOperations;
  UserRepo userRepository;
  CalendarNoteRepo noteRepository;

  public NoteController(
      MongoOperations mongoOps, UserRepo userRepository, CalendarNoteRepo noteRepository, ObjectMapper mapper) {
    this.mongoOperations = mongoOps;
    this.userRepository = userRepository;
    this.noteRepository = noteRepository;
  }

  @RequestMapping(method = RequestMethod.GET, value = "/{id}/")
  public ResponseEntity<CalendarNoteDTO> getNote(@PathVariable String id) {
    CalendarNote note = this.noteRepository.findOneById(id);
    if (note == null) throw new NotFoundException("Note cannot be found.");
    
    this.verifyNoteIsOwnedByUser(id);

    return ResponseEntity.ok(new CalendarNoteDTO(note));
  }

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<List<CalendarNoteDTO>> getNotes() {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return ResponseEntity.ok(
      user.notes.stream().map(n -> new CalendarNoteDTO(n)).collect(Collectors.toList())
    );
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<CalendarNoteDTO> createNote(@RequestBody CreateNoteDataDTO createNoteData) {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    
    if (createNoteData.headerText.isBlank() || (createNoteData.begDatetime == null && createNoteData.endDatetime == null))
      throw new BadRequestException("Header text is blank OR there is not date.");

    CalendarNote insertedNote = this.mongoOperations.insert(createNoteData.toCalendarNote());
  
    user.notes.add(insertedNote);
    this.userRepository.save(user);

    return ResponseEntity.ok(new CalendarNoteDTO(insertedNote));
  }

  @RequestMapping(method = RequestMethod.PUT, value = "/{id}/")
  public ResponseEntity<CalendarNoteDTO> updateNote(@PathVariable String id, @RequestBody UpdateNoteDataDTO updateNoteData) {
    CalendarNote note = this.noteRepository.findOneById(id);
    if (note == null) throw new NotFoundException("Note cannot be found.");

    this.verifyNoteIsOwnedByUser(id);

    note.headerText = updateNoteData.headerText;
    note.bodyText = updateNoteData.bodyText;
    note.begDatetime = updateNoteData.begDatetime;

    CalendarNote savedNote = this.mongoOperations.save(note);
    return ResponseEntity.ok(new CalendarNoteDTO(savedNote));
  }

  @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/")
  public ResponseEntity<CalendarNoteDTO> deleteNote(@PathVariable String id) {
    CalendarNote note = this.noteRepository.findOneById(id);
    if (note == null) throw new NotFoundException("Note cannot be found.");

    this.verifyNoteIsOwnedByUser(id);

    Query predicate = Query.query(Criteria.where("_id").is(id));
    CalendarNote removedNote = this.mongoOperations.findAndRemove(predicate, CalendarNote.class);

    return ResponseEntity.ok(new CalendarNoteDTO(removedNote));
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<List<CalendarNoteDTO>> deleteNotes() {
    Query predicate = Query.query(Criteria.where(null));
    List<CalendarNote> removedNotes =
        this.mongoOperations.findAllAndRemove(predicate, CalendarNote.class);

    return ResponseEntity.ok(removedNotes.stream().map(rn -> new CalendarNoteDTO(rn)).collect(Collectors.toList()));
  }

  private void verifyNoteIsOwnedByUser(String noteId) {
    User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    
    Boolean doesUserOwnNote = user.notes.stream().filter(un -> un.id == noteId).collect(Collectors.toList()).size() == 1;
    if (!doesUserOwnNote) throw new ForbiddenException("You do not own this note.");
  }
}

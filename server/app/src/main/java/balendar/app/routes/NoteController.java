package balendar.app.routes;

import balendar.app.database.models.CalendarNote;
import balendar.app.database.repositories.CalendarNoteRepo;
import balendar.app.routes.dtos.CalendarNoteDTO;
import balendar.app.routes.dtos.CreateNoteDataDTO;
import balendar.app.routes.dtos.UpdateNoteDataDTO;
import balendar.app.routes.exceptions.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
  CalendarNoteRepo noteRepository;

  @Qualifier("no-null")
  ObjectMapper noNullMapper;

  Gson gson = new Gson();

  public NoteController(
      MongoOperations mongoOps, CalendarNoteRepo noteRepository, ObjectMapper mapper) {
    this.mongoOperations = mongoOps;
    this.noteRepository = noteRepository;

    this.noNullMapper = mapper;
  }

  @RequestMapping(method = RequestMethod.GET, value = "/{id}/")
  public CalendarNoteDTO getNote(@PathVariable String id) {
    CalendarNote note = this.noteRepository.findOneById(id);
    if (note == null) throw new ResourceNotFoundException();

    return new CalendarNoteDTO(note);
  }

  @RequestMapping(method = RequestMethod.GET)
  public List<CalendarNoteDTO> getNotes() {
    List<CalendarNote> notes = this.noteRepository.findAll();

    return notes.stream().map(n -> new CalendarNoteDTO(n)).collect(Collectors.toList());
  }

  @RequestMapping(method = RequestMethod.POST)
  public CalendarNoteDTO createNote(@RequestBody CreateNoteDataDTO createNoteData) {
    if (createNoteData.headerText.isBlank()
        || (createNoteData.begDatetime == null && createNoteData.endDatetime == null))
      throw new ClientFaultException();

    CalendarNote insertedNote = this.mongoOperations.insert(createNoteData.toCalendarNote());
    return new CalendarNoteDTO(insertedNote);
  }

  @RequestMapping(method = RequestMethod.PUT, value = "/{id}/")
  public CalendarNoteDTO updateNote(
      @PathVariable String id, @RequestBody UpdateNoteDataDTO updateNoteData) {
    CalendarNote note = this.noteRepository.findOneById(id);
    if (note == null) throw new ResourceNotFoundException();

    note.headerText = updateNoteData.headerText;
    note.bodyText = updateNoteData.bodyText;
    note.begDatetime = updateNoteData.begDatetime;

    CalendarNote savedNote = this.mongoOperations.save(note);
    return new CalendarNoteDTO(savedNote);
  }

  @RequestMapping(method = RequestMethod.DELETE, value = "/{id}/")
  public CalendarNoteDTO deleteNote(@PathVariable String id) {
    Query predicate = Query.query(Criteria.where("_id").is(id));
    CalendarNote removedNote = this.mongoOperations.findAndRemove(predicate, CalendarNote.class);

    return new CalendarNoteDTO(removedNote);
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public List<CalendarNoteDTO> deleteNotes() {
    Query predicate = Query.query(Criteria.where(null));
    List<CalendarNote> removedNotes =
        this.mongoOperations.findAllAndRemove(predicate, CalendarNote.class);

    return removedNotes.stream().map(rn -> new CalendarNoteDTO(rn)).collect(Collectors.toList());
  }
}

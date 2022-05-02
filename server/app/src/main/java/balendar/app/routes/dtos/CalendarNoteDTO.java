package balendar.app.routes.dtos;

import balendar.app.database.models.CalendarNote;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class CalendarNoteDTO {
  public String id;

  public String primaryColor;

  public String headerText;
  public String bodyText;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date begDatetime;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date endDatetime;

  public CalendarNoteDTO() {}

  public CalendarNoteDTO(CalendarNote calendarNote) {
    this.id = calendarNote.id;
    this.primaryColor = calendarNote.primaryColor;
    this.headerText = calendarNote.headerText;
    this.bodyText = calendarNote.bodyText;
    this.begDatetime = calendarNote.begDatetime;
    this.endDatetime = calendarNote.endDatetime;
  }
}

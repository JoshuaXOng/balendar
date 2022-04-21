package balendar.app.routes.dtos;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import balendar.app.database.models.CalendarNote;

public class CreateNoteDataDTO {
  public String headerText;
  public String bodyText;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date begDatetime;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date endDatetime;

  public CreateNoteDataDTO(
    @JsonProperty("headerText") String headerText, @JsonProperty("bodyText") String bodyText, 
    @JsonProperty("begDatetime") Date begDatetime, @JsonProperty("endDatetime") Date endDatetime
  ) {
    this.headerText = headerText;
    this.bodyText = bodyText;
    this.begDatetime = begDatetime;
    this.endDatetime = endDatetime;
  }

  public CalendarNoteDTO toCalendarNoteDto() {
    return new CalendarNoteDTO(this.toCalendarNote());
  }

  public CalendarNote toCalendarNote() {
    if (begDatetime != null && begDatetime != null) 
      return new CalendarNote(headerText, bodyText, begDatetime, endDatetime);
    else
      return new CalendarNote(headerText, bodyText, begDatetime != null ? begDatetime : endDatetime);
  }
}

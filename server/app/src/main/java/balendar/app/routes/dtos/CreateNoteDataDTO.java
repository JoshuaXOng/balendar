package balendar.app.routes.dtos;

import balendar.app.database.models.CalendarNote;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public class CreateNoteDataDTO {
  public String primaryColor;

  public String headerText;
  public String bodyText;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date begDatetime;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date endDatetime;

  public CreateNoteDataDTO() {}

  public CreateNoteDataDTO(
      @JsonProperty("primaryColor") String primaryColor,
      @JsonProperty("headerText") String headerText,
      @JsonProperty("bodyText") String bodyText,
      @JsonProperty("begDatetime") Date begDatetime,
      @JsonProperty("endDatetime") Date endDatetime) {
    this.primaryColor = primaryColor;
    this.headerText = headerText;
    this.bodyText = bodyText;
    this.begDatetime = begDatetime;
    this.endDatetime = endDatetime;
  }

  public CalendarNoteDTO toCalendarNoteDto() {
    return new CalendarNoteDTO(this.toCalendarNote());
  }

  public CalendarNote toCalendarNote() {
    if (this.begDatetime == null && this.endDatetime == null)
      return null;

    if (this.begDatetime != null && this.endDatetime != null)
      return new CalendarNote(this.primaryColor, this.headerText, this.bodyText, this.begDatetime, this.endDatetime);

    if (this.begDatetime == null && this.endDatetime != null)
      return new CalendarNote(this.primaryColor, this.headerText, this.bodyText, this.endDatetime, this.endDatetime);
    
    return new CalendarNote(this.primaryColor, this.headerText, this.bodyText, this.begDatetime, this.begDatetime);
  }
}

package balendar.app.database.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CalendarNote {
  public @Id String id;

  public String primaryColor;
  
  public String headerText;
  public String bodyText;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date begDatetime;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date endDatetime;
  
  public CalendarNote() {}

  public CalendarNote(String id, String primaryColor, String headerText, String bodyText, Date begDatetime, Date endDatetime) {
    this.id = id;
    this.primaryColor = primaryColor;
    this.headerText = headerText;
    this.bodyText = bodyText;
    this.begDatetime = begDatetime;
    this.endDatetime = endDatetime;
  }

  public CalendarNote(String primaryColor, String headerText, String bodyText, Date begDatetime, Date endDatetime) {
    this.primaryColor = primaryColor;
    this.headerText = headerText;
    this.bodyText = bodyText;
    this.begDatetime = begDatetime;
    this.endDatetime = endDatetime;
  }
}

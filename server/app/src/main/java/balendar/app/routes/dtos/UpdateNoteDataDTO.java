package balendar.app.routes.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public class UpdateNoteDataDTO {
  public String primaryColor;

  public String headerText;
  public String bodyText;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date begDatetime;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  public Date endDatetime;

  public UpdateNoteDataDTO() {}
  
  public UpdateNoteDataDTO(
      @JsonProperty("headerText") String headerText,
      @JsonProperty("primaryColor") String primaryColor,
      @JsonProperty("bodyText") String bodyText,
      @JsonProperty("begDatetime") Date begDatetime,
      @JsonProperty("endDatetime") Date endDatetime) {
    this.primaryColor = primaryColor;
    this.headerText = headerText;
    this.bodyText = bodyText;
    this.begDatetime = begDatetime;
    this.endDatetime = endDatetime;
  }
}

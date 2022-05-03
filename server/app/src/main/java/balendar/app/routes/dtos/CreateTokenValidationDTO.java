package balendar.app.routes.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateTokenValidationDTO {
  public String authToken;

  public CreateTokenValidationDTO() {}

  public CreateTokenValidationDTO(
      @JsonProperty("authToken") String authToken) {
    this.authToken = authToken;
  }
}

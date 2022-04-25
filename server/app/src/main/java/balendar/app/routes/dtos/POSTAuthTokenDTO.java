package balendar.app.routes.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class POSTAuthTokenDTO {
  public String username;
  public String password;

  public POSTAuthTokenDTO(
      @JsonProperty("username") String username,
      @JsonProperty("password") String password) {
    this.username = username;
    this.password = password;
  }
}

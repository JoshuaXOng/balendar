package balendar.app.routes.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class POSTAuthTokenDTO {
  public String username;
  public String password;
  public String authToken;

  public POSTAuthTokenDTO() {}
  
  public POSTAuthTokenDTO(
      @JsonProperty("username") String username,
      @JsonProperty("password") String password,
      @JsonProperty("authToken") String authToken) {
    this.username = username;
    this.password = password;
    this.authToken = authToken;
  }
}

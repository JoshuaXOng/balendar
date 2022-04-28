package balendar.app.routes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = { "/", "/login", "/calendar" })
public class StaticController {
  @RequestMapping(method = RequestMethod.GET)
  public String index() {
    return "index.html";
  }
}

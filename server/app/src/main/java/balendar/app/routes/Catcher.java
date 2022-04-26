package balendar.app.routes;

import java.util.HashMap;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import balendar.app.routes.exceptions.NotFoundException;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class Catcher extends ResponseEntityExceptionHandler {
   @ExceptionHandler(NotFoundException.class)
   protected ResponseEntity<Object> handleEntityNotFound(NotFoundException exception) {
      return new ResponseEntity<Object>(new HashMap<String, String>() {{ put("msg", exception.getMessage()); }}, HttpStatus.NOT_FOUND);
   }
}

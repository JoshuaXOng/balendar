package balendar.utilities;

import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ObjectUtils {
  public <T> T fromMap(Map<String, Object> map, Class<T> class_) {
    ObjectMapper mapper = new ObjectMapper();
    T object = mapper.convertValue(map, class_);
    return object;
  }
}

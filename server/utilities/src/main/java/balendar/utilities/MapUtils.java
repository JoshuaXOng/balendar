package balendar.utilities;

import java.util.Map;
import java.util.Objects;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MapUtils {
  public static Map<String, Object> fromObject(Object object) {
    ObjectMapper mapper = new ObjectMapper();
    Map<String, Object> map = mapper.convertValue(object, new TypeReference<Map<String, Object>>() {});
    return map;
  }
  public static Map<String, Object> fromObjectWoNulls(Object object) {
    Map<String, Object> map = MapUtils.fromObject(object);
    map.values().removeIf(Objects::isNull);
    return map;
  }
}

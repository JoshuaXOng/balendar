package balendar.app.database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import io.github.cdimascio.dotenv.Dotenv;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseBeans {
  @Bean
  public Dotenv loadedDotenv() {
    return Dotenv.load();
  }

  @Bean
  public Log getDatabaseLogger() {
    return LogFactory.getLog(getClass());
  }

  @Bean
  public MongoClient getMongoClient(Dotenv loadedDotenv, Log databaseLogger) {
    String connectionString = loadedDotenv.get("MONGODB_CONNECTION_STRING");
    if (connectionString == null)
      throw new Error("Connection string cannot be `null`.");
    
    return MongoClients.create(connectionString);
  }
}

/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package balendar.app;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

@SpringBootTest
@AutoConfigureMockMvc
class NoteControllerTest {
  MockMvc server;

  public NoteControllerTest(MockMvc server) {
    this.server = server;
  }

  @Test
  public void testRemoveAllNotes() throws Exception {
    MockHttpServletRequestBuilder removeAllNotesRequest = delete("/api/v0/notes/");
    this.server.perform(removeAllNotesRequest).andDo(print()).andExpect(status().isOk());
  }

  @Test
  public void testAddNote() throws Exception {
    MockHttpServletRequestBuilder addNoteRequest1 =
        post("/api/v0/notes/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                """
				{
					\"headerText\": \"Header-1\",
					\"bodyText\": \"Body-1\",
					\"begDatetime\": \"2022-04-20\",
					\"endDatetime\": \"2022-04-20\"
				}
			""");
    this.server.perform(addNoteRequest1).andDo(print()).andExpect(status().isOk());

    MockHttpServletRequestBuilder addNoteRequest2 =
        post("/api/v0/notes/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                """
				{
					\"headerText\": \"Header-2\",
					\"bodyText\": \"Body-2\",
					\"endDatetime\": \"2022-04-20\"
				}
			""");
    this.server.perform(addNoteRequest2).andDo(print()).andExpect(status().isOk());
  }

  @Test
  public void testGetAllNotes() throws Exception {
    MockHttpServletRequestBuilder getAllNotesRequest = get("/api/v0/notes/");
    this.server.perform(getAllNotesRequest).andDo(print()).andExpect(status().isOk());
  }
}

package balendar.app.routes.dtos.old;
// package balendar.app.routes.dtos;

// import java.time.Month;
// import java.time.Year;
// import java.util.ArrayList;
// import java.util.stream.Collectors;

// import balendar.app.database.models.CalendarMonth;

// public class CalendarMonthDTO {
//     public String id;
//     public Year currentYear;
//     public Month currentMonth;
//     public ArrayList<CalendarDayDTO> calendarDays;

//     public CalendarMonthDTO(CalendarMonth calendarMonth) {
//         this.id = calendarMonth.id;
//         this.currentYear = calendarMonth.currentYear;
//         this.currentMonth = calendarMonth.currentMonth;
//         this.calendarDays = (ArrayList<CalendarDayDTO>) calendarMonth.calendarDays.stream()
//             .map(cd -> new CalendarDayDTO(cd))
//             .collect(Collectors.toList());
//     }
// }

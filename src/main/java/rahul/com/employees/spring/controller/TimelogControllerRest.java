package rahul.com.employees.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rahul.com.employees.spring.dao.TimelogRepository;
import rahul.com.employees.spring.model.Employee;
import rahul.com.employees.spring.model.Salary;
import rahul.com.employees.spring.model.Timelog;
import rahul.com.employees.spring.model.Title;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Time;
import java.util.Optional;

@RestController
public class TimelogControllerRest {
    @Autowired
    private TimelogRepository timelogRepository;


    @GetMapping("/timelogs/{empNo}")
    ResponseEntity<?> getTimelogs(@PathVariable int empNo) {
        Optional<Timelog> timelogs = timelogRepository.findById(empNo);
        return timelogs.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/timelog/{empNo}")
    ResponseEntity<Timelog> updateTimelog(@Valid @RequestBody Timelog timelog)  {
        // Optional<Timelog> timelopg = timelogRepository.findByEmpNoAndIsCurrent(timelog.getEmpNo(), "yes");
        Timelog result = timelogRepository.save(timelog);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/timelogs")
    ResponseEntity<Timelog> createTimelog(@Valid @RequestBody Timelog timelog) throws URISyntaxException {
        Timelog result = timelogRepository.save(timelog);
        return ResponseEntity.created(new URI("/timelog" + result.getEmpNo())).body(result);
    }
}

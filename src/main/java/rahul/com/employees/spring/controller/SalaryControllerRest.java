package rahul.com.employees.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rahul.com.employees.spring.dao.SalaryRepository;
import rahul.com.employees.spring.model.Employee;
import rahul.com.employees.spring.model.Salary;
import rahul.com.employees.spring.model.Title;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
public class SalaryControllerRest {

    @Autowired
    private SalaryRepository salaryRepository;

    @GetMapping("/salary/{empNo}")
    ResponseEntity<?> getEmployee(@PathVariable int empNo){
        Optional<Salary> salary = salaryRepository.findByEmpNoAndToDate(empNo, "9999-01-01");
        return salary.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/salaries")
    ResponseEntity<Salary> createTitle(@Valid @RequestBody Salary salary) throws URISyntaxException {
        Salary result = salaryRepository.save(salary);
        return ResponseEntity.created(new URI("/salaries" + result.getEmpNo())).body(result);
    }
}

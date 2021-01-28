package rahul.com.employees.spring.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rahul.com.employees.spring.dao.EmployeeRepository;
import rahul.com.employees.spring.model.Employee;


import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@RestController
public class EmployeeControllerRest {

    @Autowired
    private EmployeeRepository employeeRepository;

    /*@GetMapping("/employee")
    public Employee getEmployee(@RequestParam(value = "empNo") int empNo, @RequestParam(value = "password") String password) {
        return employeeService.getEmployee(empNo, password);
    }*/

    @GetMapping("/employee")
    Collection<Employee> employees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/employees/{empNo}")
    ResponseEntity<?> getEnployee(@PathVariable int empNo){
        Optional<Employee> employee = employeeRepository.findById(empNo);
        return employee.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/employees/{empNo}")
    ResponseEntity<Employee> updateEmployee(@Valid @RequestBody Employee employee)  {
        Employee result = employeeRepository.save(employee);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/employees")
    ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) throws URISyntaxException {
        Employee result = employeeRepository.save(employee);
        return ResponseEntity.created(new URI("/employee" + result.getEmpNo())).body(result);
    }

    @DeleteMapping("/employees/{empNo}")
    ResponseEntity<Employee> deleteEmployee(@PathVariable int empNo) {
        employeeRepository.deleteById(empNo);
        return ResponseEntity.ok().build();
    }
}

package rahul.com.employees.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rahul.com.employees.spring.dao.TitleRepository;
import rahul.com.employees.spring.model.Employee;
import rahul.com.employees.spring.model.Title;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
public class TitleControllerRest {
    @Autowired
    private TitleRepository titleRepository;

    @GetMapping("/title")
    Collection<Title> title() {
        return titleRepository.findAll();
    }

    @GetMapping("/title/{empNo}")
    ResponseEntity<?> getTitle(@PathVariable int empNo){
        Optional<Title> title = titleRepository.findById(empNo);
        return title.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/titles")
    ResponseEntity<Title> createTitle(@Valid @RequestBody Title title) throws URISyntaxException {
        Title result = titleRepository.save(title);
        return ResponseEntity.created(new URI("/title" + result.getEmpNo())).body(result);
    }
}

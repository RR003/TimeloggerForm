package rahul.com.employees.spring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import rahul.com.employees.spring.model.Salary;
import rahul.com.employees.spring.model.Timelog;

import java.util.List;
import java.util.Optional;

public interface TimelogRepository extends JpaRepository<Timelog, Integer> {

}

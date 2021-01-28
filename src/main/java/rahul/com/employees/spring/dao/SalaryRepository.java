package rahul.com.employees.spring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import rahul.com.employees.spring.model.Salary;


import java.util.List;
import java.util.Optional;

public interface SalaryRepository extends JpaRepository<Salary, Integer> {
    Optional<Salary> findByEmpNoAndToDate(int empNo, String toDate);
}

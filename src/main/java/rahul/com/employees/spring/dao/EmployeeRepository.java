package rahul.com.employees.spring.dao;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import rahul.com.employees.spring.model.Employee;

import javax.transaction.Transactional;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}

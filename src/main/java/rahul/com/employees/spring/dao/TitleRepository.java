package rahul.com.employees.spring.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import rahul.com.employees.spring.model.Title;

public interface TitleRepository extends JpaRepository<Title, Integer> {

}

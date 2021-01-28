package rahul.com.employees.spring.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "salaries")
public class Salary {

    @Id
    @Column(name = "emp_no")
    private int empNo;

    @Column(name = "salary")
    private String salary;

    @Column(name = "from_date")
    private String fromDate;

    @Column(name = "to_date")
    private String toDate;


    public int getEmpNo() {
        return empNo;
    }

    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }




}

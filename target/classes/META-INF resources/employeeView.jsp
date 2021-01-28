<%@ page import="rahul.com.employees.spring.model.Employee" %>

<!DOCTYPE html>
<html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>


<h2>HTML Table</h2>
<%
    Employee employee = (Employee)request.getAttribute("employee");
%>

<table>
  <tr>
    <th>EmpNo</th>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Salary</th>
    <th>Address</th>
  </tr>

  <tr>

    <td><%=employee.getEmpNo()%></td>
    <td><%=employee.getfirstName()%></td>
    <td><%=employee.getlastName()%></td>
    <td><%=employee.getGender()%></td>
    <td><%=employee.getHireDate()%></td>
  </tr>

</table>

</body>
</html>
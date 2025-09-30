package com.projects.employee.controller;


import com.projects.employee.entity.Employee;
import com.projects.employee.entity.LoginResponse;
import com.projects.employee.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/register")
    public Employee postEmployee(@RequestBody Employee emp){
        System.out.println("Received employee for registration: " + emp);
        return employeeService.postEmployee(emp);
    }


    @PostMapping("/login")
    public LoginResponse loginEmployee(@RequestBody Employee emp){
        return employeeService.verify(emp);
    }

    @GetMapping("/dashboard")
    public List<Employee> getAllEmployee(){
        return employeeService.getDetails();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUserDetails(@PathVariable long id){
        System.out.println("🗑️ DELETE called for ID: " + id); // LOG CHECK
        employeeService.deleteDetails(id);
        return ResponseEntity.noContent().build();
    }

}

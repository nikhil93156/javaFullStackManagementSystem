package com.projects.employee.service;

import com.projects.employee.entity.Employee;
import com.projects.employee.entity.LoginResponse;
import com.projects.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder= new BCryptPasswordEncoder(12);

    public Employee postEmployee(Employee emp){
        emp.setPassword(encoder.encode(emp.getPassword()));
        return employeeRepository.save(emp);
    }
    public List<Employee> getDetails(){
        return employeeRepository.findAll();
    }

    public void deleteDetails(Long id){
        employeeRepository.deleteById(id);
    }

    public LoginResponse verify(Employee employee) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(employee.getUsername(), employee.getPassword())
        );

        if (authentication.isAuthenticated()) {
            Employee dbEmployee = employeeRepository.findByUsername(employee.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            String token = jwtService.generateToken(dbEmployee.getUsername());
            return new LoginResponse(token, dbEmployee.getId());
        }

        return null; // Or throw an exception
    }


}

package com.projects.employee.service;

import com.projects.employee.entity.Employee;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class MyEmployeePrincipal implements UserDetails {

    private Employee employee;

    public MyEmployeePrincipal (Employee employee){
        this.employee=employee;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String authority = "ROLE_" + employee.getRole(); // Add prefix
        System.out.println("Assigned authority: " + authority);
        return List.of(new SimpleGrantedAuthority(authority));
    }


    @Override
    public String getPassword() {
        return employee.getPassword();
    }

    @Override
    public String getUsername() {
        return employee.getUsername();
    }
}

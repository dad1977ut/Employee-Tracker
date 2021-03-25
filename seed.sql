use employeeTrackerdb;
insert into department(name)
values ("testing");
insert into role(title,salary,department_id)
values ("tester",1000,1);
insert into employee(first_name,last_name,role_id,manager_id)
values("bob","smith",1,null);
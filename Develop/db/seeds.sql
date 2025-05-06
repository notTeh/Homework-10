-- Insert departments
INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales'),
  ('Marketing');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 120000, 1),
  ('Lead Engineer', 150000, 1),
  ('Accountant', 125000, 2),
  ('Finance Manager', 160000, 2),
  ('Lawyer', 190000, 3),
  ('Legal Team Lead', 250000, 3),
  ('Sales Representative', 85000, 4),
  ('Sales Manager', 100000, 4),
  ('Marketing Specialist', 70000, 5),
  ('Marketing Director', 150000, 5);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 2, NULL),
  ('Mike', 'Chan', 1, 1),
  ('Ashley', 'Rodriguez', 4, NULL),
  ('Kevin', 'Tupik', 3, 3),
  ('Kunal', 'Singh', 6, NULL),
  ('Malia', 'Brown', 5, 5),
  ('Sarah', 'Lourd', 8, NULL),
  ('Tom', 'Allen', 7, 7),
  ('Jennifer', 'Davis', 10, NULL),
  ('James', 'Wilson', 9, 9);
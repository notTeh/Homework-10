const pool = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // View all departments
  async viewAllDepartments() {
    try {
      const query = 'SELECT id, name FROM department ORDER BY id';
      const result = await this.connection.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error viewing departments:', err);
      throw err;
    }
  }

  // View all roles
  async viewAllRoles() {
    try {
      const query = `
        SELECT r.id, r.title, d.name AS department, r.salary
        FROM role r
        LEFT JOIN department d ON r.department_id = d.id
        ORDER BY r.id
      `;
      const result = await this.connection.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error viewing roles:', err);
      throw err;
    }
  }

  // View all employees
  async viewAllEmployees() {
    try {
      const query = `
        SELECT 
          e.id,
          e.first_name,
          e.last_name,
          r.title,
          d.name AS department,
          r.salary,
          CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY e.id
      `;
      const result = await this.connection.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error viewing employees:', err);
      throw err;
    }
  }

  // Add a department
  async addDepartment(name) {
    try {
      const query = 'INSERT INTO department (name) VALUES ($1) RETURNING id, name';
      const result = await this.connection.query(query, [name]);
      return result.rows[0];
    } catch (err) {
      console.error('Error adding department:', err);
      throw err;
    }
  }

  // Add a role
  async addRole(title, salary, departmentId) {
    try {
      const query = `
        INSERT INTO role (title, salary, department_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, salary, department_id
      `;
      const result = await this.connection.query(query, [title, salary, departmentId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error adding role:', err);
      throw err;
    }
  }

  // Add an employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, role_id, manager_id
      `;
      const result = await this.connection.query(query, [firstName, lastName, roleId, managerId || null]);
      return result.rows[0];
    } catch (err) {
      console.error('Error adding employee:', err);
      throw err;
    }
  }

  // Update employee role
  async updateEmployeeRole(employeeId, roleId) {
    try {
      const query = `
        UPDATE employee
        SET role_id = $2
        WHERE id = $1
        RETURNING id, first_name, last_name, role_id
      `;
      const result = await this.connection.query(query, [employeeId, roleId]);
      return result.rows[0];
    } catch (err) {
      console.error('Error updating employee role:', err);
      throw err;
    }
  }

  // Get departments for prompt choices
  async getDepartmentChoices() {
    try {
      const query = 'SELECT id AS value, name FROM department ORDER BY name';
      const result = await this.connection.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error getting department choices:', err);
      throw err;
    }
  }

  // Get roles for prompt choices
  async getRoleChoices() {
    try {
      const query = 'SELECT id AS value, title AS name FROM role ORDER BY title';
      const result = await this.connection.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error getting role choices:', err);
      throw err;
    }
  }

  // Get employees for prompt choices
  async getEmployeeChoices() {
    try {
      const query = `
        SELECT 
          id AS value, 
          CONCAT(first_name, ' ', last_name) AS name 
        FROM employee 
        ORDER BY last_name, first_name
      `;
      const result = await this.connection.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error getting employee choices:', err);
      throw err;
    }
  }

  // Get manager choices (includes "None")
  async getManagerChoices() {
    try {
      const employees = await this.getEmployeeChoices();
      employees.unshift({ value: null, name: 'None' });
      return employees;
    } catch (err) {
      console.error('Error getting manager choices:', err);
      throw err;
    }
  }
}

module.exports = new DB(pool);
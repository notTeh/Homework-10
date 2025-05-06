const inquirer = require('inquirer');
const db = require('./queries');

class Prompts {
  // Main menu prompt
  async mainMenu() {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'View all departments', value: 'viewDepartments' },
        { name: 'View all roles', value: 'viewRoles' },
        { name: 'View all employees', value: 'viewEmployees' },
        { name: 'Add a department', value: 'addDepartment' },
        { name: 'Add a role', value: 'addRole' },
        { name: 'Add an employee', value: 'addEmployee' },
        { name: 'Update an employee role', value: 'updateEmployeeRole' },
        { name: 'Exit', value: 'exit' }
      ]
    });
    return action;
  }

  // Prompt to add a department
  async addDepartmentPrompt() {
    const department = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
      validate: input => input ? true : 'Department name cannot be empty.'
    });
    return department;
  }

  // Prompt to add a role
  async addRolePrompt() {
    // Get departments for choices
    const departments = await db.getDepartmentChoices();
    
    const role = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
        validate: input => input ? true : 'Role name cannot be empty.'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the role?',
        validate: input => {
          if (!input || isNaN(input)) {
            return 'Please enter a valid number.';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which department does this role belong to?',
        choices: departments
      }
    ]);
    
    return role;
  }

  // Prompt to add an employee
  async addEmployeePrompt() {
    // Get roles and managers for choices
    const roles = await db.getRoleChoices();
    const managers = await db.getManagerChoices();
    
    const employee = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?",
        validate: input => input ? true : 'First name cannot be empty.'
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?",
        validate: input => input ? true : 'Last name cannot be empty.'
      },
      {
        type: 'list',
        name: 'role_id',
        message: "What is the employee's role?",
        choices: roles
      },
      {
        type: 'list',
        name: 'manager_id',
        message: "Who is the employee's manager?",
        choices: managers
      }
    ]);
    
    return employee;
  }

  // Prompt to update an employee's role
  async updateEmployeeRolePrompt() {
    // Get employees and roles for choices
    const employees = await db.getEmployeeChoices();
    const roles = await db.getRoleChoices();
    
    const update = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Which employee do you want to update?',
        choices: employees
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'What is their new role?',
        choices: roles
      }
    ]);
    
    return update;
  }
}

module.exports = new Prompts();
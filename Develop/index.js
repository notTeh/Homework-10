// Import dependencies
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./lib/queries');
const prompts = require('./lib/prompts');

// Main application function
async function init() {
  console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║               EMPLOYEE MANAGER               ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
  `);
  
  let exitApp = false;
  
  while (!exitApp) {
    try {
      // Display main menu and get user choice
      const action = await prompts.mainMenu();
      
      // Process user choice
      switch (action) {
        case 'viewDepartments':
          const departments = await db.viewAllDepartments();
          console.log('\n');
          console.table('DEPARTMENTS', departments);
          break;
          
        case 'viewRoles':
          const roles = await db.viewAllRoles();
          console.log('\n');
          console.table('ROLES', roles);
          break;
          
        case 'viewEmployees':
          const employees = await db.viewAllEmployees();
          console.log('\n');
          console.table('EMPLOYEES', employees);
          break;
          
        case 'addDepartment':
          const newDepartment = await prompts.addDepartmentPrompt();
          const addedDepartment = await db.addDepartment(newDepartment.name);
          console.log(`\nAdded ${addedDepartment.name} department to the database\n`);
          break;
          
        case 'addRole':
          const newRole = await prompts.addRolePrompt();
          const addedRole = await db.addRole(newRole.title, newRole.salary, newRole.department_id);
          console.log(`\nAdded ${addedRole.title} role to the database\n`);
          break;
          
        case 'addEmployee':
          const newEmployee = await prompts.addEmployeePrompt();
          const addedEmployee = await db.addEmployee(
            newEmployee.first_name, 
            newEmployee.last_name, 
            newEmployee.role_id, 
            newEmployee.manager_id
          );
          console.log(`\nAdded ${addedEmployee.first_name} ${addedEmployee.last_name} to the database\n`);
          break;
          
        case 'updateEmployeeRole':
          const employeeUpdate = await prompts.updateEmployeeRolePrompt();
          const updatedEmployee = await db.updateEmployeeRole(
            employeeUpdate.employee_id, 
            employeeUpdate.role_id
          );
          console.log(`\nUpdated ${updatedEmployee.first_name} ${updatedEmployee.last_name}'s role\n`);
          break;
          
        case 'exit':
          console.log('\nGoodbye!');
          exitApp = true;
          process.exit(0);
          break;
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  }
}

// Start application
init();
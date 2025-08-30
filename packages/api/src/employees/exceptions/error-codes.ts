export const EMPLOYEE_ERROR_CODES = {
  EMPLOYEE_EMAIL_ALREADY_EXISTS: `employee_email_already_exists`,
  EMPLOYEE_NOT_FOUND: `employee_not_found`,
  EMPLOYEE_HIERARCHY_NODE_NOT_FOUND: `employee_hierarchy_node_not_found`,
  EMPLOYEE_NOT_ACTIVE: `employee_not_active`,
  EMPLOYEE_CANNOT_BE_A_MANAGER_OF_ITSELF: `employee_cannot_be_a_manager_of_itself`,
} as const;

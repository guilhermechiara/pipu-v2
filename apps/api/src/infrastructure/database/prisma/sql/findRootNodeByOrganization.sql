SELECT
    id,
    organization_id as "organizationId",
    employee_id as "employeeId",
    path,
    type,
    created_at as "createdAt",
    updated_at as "updatedAt"
FROM
    employee_hierarchy_nodes
WHERE
    nlevel(path::ltree) = 1
AND organization_id = $1
AND type = $2
LIMIT 1;


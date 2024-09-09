const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles || req.roles.length === 0) {
            console.log('No roles found in request.');
            return res.sendStatus(401);
        }

        const rolesArray = [...allowedRoles];
        console.log('Allowed Roles:', rolesArray);
        console.log('User Roles:', req.roles);
        
        const hasRole = req.roles.some(role => rolesArray.includes(role));
        console.log('Role Check Result:', hasRole);

        if (!hasRole) {
            console.log('User does not have the required roles.');
            return res.sendStatus(403); // 403 Forbidden
        }

        next();
    };
};

module.exports = verifyRoles;

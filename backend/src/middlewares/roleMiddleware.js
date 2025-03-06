const ensureAdminOrSelf = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.id === req.params.id)) {
        next(); // User is an admin or is the user themselves, proceed to the next middleware/controller
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
};

const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next(); // User is an admin, proceed to the next middleware/controller
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
}

const ensureManager = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Manager')) {
        next(); // User is an admin, proceed to the next middleware/controller
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
}

const ensureManagerDiscordUpdate = (req, res, next) => {
    // Check if the user is a Manager
    if (req.user && req.user.role === 'Manager') {
        // Only allow updating Discord username
        const allowedFields = ['usernameDiscord'];
        const requestedUpdates = Object.keys(req.body);
        
        const isValidUpdate = requestedUpdates.every(field => 
            allowedFields.includes(field)
        );

        if (!isValidUpdate) {
            return res.status(403).json({ error: 'Managers can only update Discord username' });
        }
    }
    next();
};

const ensureManagerOrAdminView = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Manager')) {
        next();
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
};

const ensureAdminDelete = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ 
            error: 'Only admins can delete users',
            details: {
                currentUserRole: req.user?.role,
                isAuthenticated: !!req.user
            }
        });
    }
};

module.exports = {
    ensureAdminOrSelf,
    ensureAdmin,
    ensureManagerOrAdminView,
    ensureManagerDiscordUpdate,
    ensureAdminDelete
};
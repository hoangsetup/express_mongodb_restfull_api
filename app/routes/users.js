// app/routes/users.js
module.exports = function(router) {
    'use strict';
    // This will handle the url calls for /users/:user_id
    router.route('/:userid')
        .get(function(req, res, next) {
            // Return user
            // 200
        })
        .put(function(req, res, next) {
            // Update user
        })
        .patch(function(req, res, next) {
            // Patch
        })
        .delete(function(req, res, next) {
            // Delete user
            // 204 empty content
        });

    // This will handle the url calls for /users
    router.route('/')
        .get(function(req, res, next) {
            // Logic for GET /users routes
            // 200
            res.status(200).json({
                message: 'success'
            });
        })
        .post(function(req, res, next) {
            // Add new user
            // 201
        });
};
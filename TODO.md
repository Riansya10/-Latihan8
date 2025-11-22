# TODO: Implement JWT Authentication for Postman Testing

## Steps to Complete

- [ ] Install required dependencies: jsonwebtoken and bcryptjs
- [ ] Create middlewares/auth.middleware.js for JWT verification
- [ ] Update models/user.model.js to hash passwords on create/update
- [ ] Update controllers/user.controller.js: register to hash password, login to verify and return JWT
- [ ] Update routes/products.routes.js to apply auth middleware to all routes
- [ ] Test the API with Postman: register user, login to get token, access protected products routes

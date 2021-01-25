const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
  login: [
    passport.authenticate('local'),
    (req, res) => {
      return res.status(200).json(req.user);
    }
  ],
  signUp: [
    body('username', 'A valid email is required').isEmail().trim().escape(),
    body('password', 'A password of at least 5 caracters is required').isLength({ min: 5 }).escape(),
    body('repeatPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
    body('firstName', 'A first name is required').isLength({ min: 1 }).trim().escape(),
    body('lastName', 'A last name is required').isLength({ min: 1 }).trim().escape(),
    body('membership').toBoolean(),
    body('admin').toBoolean(),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const prisma = new PrismaClient()
      const { username, password, firstName, lastName, membership, admin } = req.body;
      try {
        const user = await prisma.user.findFirst({ where: { username: req.body.username }, rejectOnNotFound: false });
        if (user) {
          return res.status(201).json({ ...user, emailTaken: true });
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: { username, password: hash, firstName, lastName, membership, admin },
        });
        return res.status(201).json(newUser);
      } catch (err) {
        return next(err);
      } finally {
        await prisma.$disconnect();
      }
    },
  ],
  listUsers: async (req, res, next) => {
    const prisma = new PrismaClient()
    try {
      const users = await prisma.user.findMany();
      return res.status(201).json(users);
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
};

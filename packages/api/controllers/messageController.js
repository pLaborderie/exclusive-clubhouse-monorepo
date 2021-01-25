const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { isAuthenticated } = require('../middlewares/auth');

module.exports = {
  createMessage: [
    isAuthenticated,
    body('title', 'A valid title is required').isLength({ min: 1 }).trim().escape(),
    body('content', 'A content is required').isLength({ min: 1 }).trim().escape(),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const prisma = new PrismaClient()
      const { title, content } = req.body;
      try {
        const newMessage = await prisma.message.create({
          data: { title, content, authorId: req.user.id },
        });
        return res.status(201).json(newMessage);
      } catch (err) {
        return next(err);
      } finally {
        await prisma.$disconnect();
      }
    },
  ],
  getMessages: async (req, res, next) => {
    const prisma = new PrismaClient()
    try {
      const messages = await prisma.message.findMany();
      return res.status(200).json(messages);
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
};

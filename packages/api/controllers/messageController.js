const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

module.exports = {
  getMessages: async (req, res, next) => {
    const prisma = new PrismaClient()
    try {
      if (req.user && req.user.membership) {
        const messages = await prisma.message.findMany({ include: { author: true } });
        return res.status(200).json(messages);
      }
      const messages = await prisma.message.findMany({ select: {
        id: true, title: true, content: true
      }});
      return res.status(200).json(messages);
    } catch (err) {
      return next(err);
    } finally {
      await prisma.$disconnect();
    }
  },
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
  deleteMessage: [
    isAdmin,
    async (req, res, next) => {
      const { id } = req.params;
      const prisma = new PrismaClient()
      try {
        const deleted = await prisma.message.delete({ where: { id: parseInt(id, 10) } });
        return res.status(200).json(deleted);
      } catch (err) {
        return next(err);
      } finally {
        await prisma.$disconnect();
      }
    },
  ],
};

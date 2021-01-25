const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(async (username, password, done) => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findFirst({ where: { username: username } });
    if (!user) {
      return done(null, false, { msg: 'Wrong username' });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      return done(null, user);
    }
    return done(null, false, { msg: 'Wrong password' });
  } catch (err) {
    return done(err);
  } finally {
    await prisma.$disconnect();
  }
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return done(null, user);
  } catch (err) {
    return done(err);
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = passport;

import jwt from "jsonwebtoken";
import { findUserInOrganisationById } from "../../model/organisation.js";
const { JWT_SECRET } = process.env;


export function isLoggedIn(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Authentication failed, input token");
    error.statusCode = 401;
    return next(error);
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Invalid token");
      error.statusCode = 403;
      return next(error);
    }
    req.user = user;
    next();
  });
}
export const checkMembership = async (req, res, next) => {
  const { orgId } = req.params;
  const { userId } = req.user;

  try {
    const userInOrg = await findUserInOrganisationById(userId, orgId);
    if (!userInOrg) {
      const error = new Error("You must be a member of this organization ");
      error.statusCode = 403;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};
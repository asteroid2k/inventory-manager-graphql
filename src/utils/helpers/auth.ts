import argon2 from "argon2";
import bcrypt from "bcryptjs";
import config from "src/config";
import jwt from "jsonwebtoken";
import { accessKeyType } from "src/types";

/**
 * Provides helper methods for authentication
 */

/**
 * generates password hash and salt
 * @param {string} password - plain password string
 * @returns {Promise<object|error>} - resolves with object containing hashed password and salt or rejects with error
 */
const hashPassword = async (
  password: string
): Promise<{ hash: string; salt: string }> => {
  const salt = await bcrypt.genSalt();
  const hash = await argon2.hash(password + salt);
  return { hash, salt };
};

/**
 * Compares password with hashed password
 * @param {string} plainPassword  - plain password input
 * @param {string} salt - password salt
 * @param {string} hashedPassword - hashed password
 * @returns {boolean} - whether password matches with hash
 */
const comparePassword = async (
  plainPassword: string,
  salt: string,
  hashedPassword: string
): Promise<boolean> => {
  return argon2.verify(hashedPassword, plainPassword + salt);
};

/**
 * Generate jwt token from user object
 * @param data - object containing user data
 * @param secretKey - application key
 * @param options - extra jwt options
 * @returns {string} - jwt token
 */
const generateJwt = (
  data: Record<string, unknown>,
  secretKey: accessKeyType,
  options?: jwt.SignOptions | undefined
) => {
  const key = config[secretKey];
  delete data.password;
  delete data.salt;
  return jwt.sign(data, key, { ...options });
};

/**
 * Checks validity of a token
 * @param token - jwt token
 * @param secretKey - application key
 * @returns {object|null} - resolves to decode jwt data or null
 */
const verifyJwt = async (token: string, secretKey: accessKeyType) => {
  try {
    const key = config[secretKey];
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
};

export { verifyJwt, comparePassword, generateJwt, hashPassword };

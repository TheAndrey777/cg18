import express from "express";
import { IUser } from "../../interfaces/IUser";
import { IFile } from "../../interfaces/IFile";

declare global {
  namespace Express {
    interface User extends IUser {}
    interface Request {
      files?: IFile[] | null;
      file?: IFile | null;
    }
  }
}
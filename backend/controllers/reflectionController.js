// import { ReflectionModel } from "../models/Reflection.js";
import { validateReflection } from "../models/ZodSchemas/Reflection.js";
import { partialValidateUser } from "../models/ZodSchemas/User.js";

export class ReflectionController {
  constructor({ ReflectionModel }) {
    this.ReflectionModel = ReflectionModel;
  }

  create = async (req, res) => {
    try {
      const validatedReflection = validateReflection(req.body);

      if (!validatedReflection.success)
        return res.status(400).json({
          ok: false,
          message: validatedReflection.error.message,
        });

      const reflection = await this.ReflectionModel.create({
        data: validatedReflection.data,
      });

      res.status(201).json({
        ok: true,
        message: "Reflection created successfully",
        data: reflection,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: "Error creating reflection" });
    }
  };

  getLast20 = async (req, res) => {
    try {
      const reflections = await this.ReflectionModel.getLast20();

      res.status(200).json({
        ok: true,
        data: reflections,
      });
    } catch {
      res.status(500).json({ ok: false, message: "Error getting reflections" });
    }
  };

  getPageWithLimit = async (req, res) => {
    try {
      const reflections = await this.ReflectionModel.getPageWithLimit({
        page: req.params.page,
        limit: req.params.limit ?? 7,
      });

      const isLastPage = reflections.length < req.params.limit;

      const info = {
        page: req.params.page,
        results: reflections.length,
        total: await this.ReflectionModel.count(),
        isLastPage,
      };

      res.status(200).json({
        ok: true,
        data: reflections,
        info,
      });
    } catch {
      res.status(500).json({ ok: false, message: "Error getting reflections" });
    }
  };

  like = async (req, res) => {
    try {
      const validatedUser = partialValidateUser(req.body);

      if (!validatedUser.success)
        return res.status(400).json({
          ok: false,
          message: validatedUser.error.message,
        });

      const reflection = await this.ReflectionModel.like({
        reflectionId: req.params.reflectionId,
        username: validatedUser.data.username,
      });

      res.status(200).json({
        ok: true,
        message: "Reflection liked successfully",
        data: reflection,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: "Error liking reflection" });
    }
  };

  dislike = async (req, res) => {
    try {
      const validatedUser = partialValidateUser(req.body);

      if (!validatedUser.success)
        return res.status(400).json({
          ok: false,
          message: validatedUser.error.message,
        });

      const reflection = await this.ReflectionModel.dislike({
        reflectionId: req.params.reflectionId,
        username: validatedUser.data.username,
      });

      res.status(200).json({
        ok: true,
        message: "Reflection disliked successfully",
        data: reflection,
      });
    } catch (error) {
      res
        .status(500)
        .json({ ok: false, message: "Error disliking reflection" });
    }
  };
}

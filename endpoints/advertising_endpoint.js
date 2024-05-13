const router = require("express").Router();
const Adv = require("../models/advertising_model");
const StatusCode = require("../helper/status_code_helper");
const { param, body, validationResult } = require("express-validator");

router.post(
  "/advCreate",
  [
    body("pic_1").notEmpty().withMessage("pic_1 is required").trim().escape(),
    body("pic_2").notEmpty().withMessage("pic_2 is required").trim().escape(),
    body("pic_3").notEmpty().withMessage("pic_3 is required").trim().escape(),
    body("pic_4").notEmpty().withMessage("pic_4 is required").trim().escape(),
    body("text")
      .notEmpty()
      .withMessage("text is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Name cannot contain special characters");
        }
        // Return true to indicate validation passed
        return true;
      }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
        // return res.json(new StatusCode.INVALID_ARGUMENT(errors));
      }
      const { pic_1, pic_2, pic_3, pic_4, text } = req.body;
      const result = await Adv.advCreate(pic_1, pic_2, pic_3, pic_4, text);
      res.json({ pic_1, pic_2, pic_3, pic_4, text });
    } catch (error) {
      res.status(error);
    }
  }
);

router.get(
  "/advList/:page",
  [param("page").notEmpty().isInt().toInt()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
      }
      const page = req.params.page;
      const result = await Adv.advList(page);
      res.json(result);
    } catch (error) {
      res.status(error);
    }
  }
);

router.put(
  "/advUpdate/:id",
  [
    body("pic_1").notEmpty().withMessage("pic_1 is required").trim().escape(),
    body("pic_2").notEmpty().withMessage("pic_2 is required").trim().escape(),
    body("pic_3").notEmpty().withMessage("pic_3 is required").trim().escape(),
    body("pic_4").notEmpty().withMessage("pic_4 is required").trim().escape(),
    body("text")
      .notEmpty()
      .withMessage("text is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Name cannot contain special characters");
        }
        // Return true to indicate validation passed
        return true;
      }),
    param("id").notEmpty().isInt().toInt(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
      }
      const { pic_1, pic_2, pic_3, pic_4, text } = req.body;
      const id = req.params.id;
      const result = await Adv.advUpdate(pic_1, pic_2, pic_3, pic_4, text, id);
      res.json(result);
    } catch (error) {
      res.status(error);
    }
  }
);

router.delete(
  "/advDelete/:id",
  [param("id").notEmpty().isInt().toInt()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
      }
      const id = req.params.id;
      const result = await Adv.advDelete(id);
      res.json(result);
    } catch (error) {
      res.status(error);
    }
  }
);

module.exports = router;

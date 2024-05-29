const router = require("express").Router();
const Products = require("../models/product_model");
const { param, body, validationResult } = require("express-validator");
const StatusCode = require("../helper/status_code_helper");
const { fileUpload, fileDelete } = require("../helper/file_upload_helper");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/productCreate",
  [
    body("pic_1").notEmpty().withMessage("pic_1 is required"),
    body("pic_2").notEmpty().withMessage("pic_2 is required"),
    body("pic_3").notEmpty().withMessage("pic_3 is required"),
    body("pic_4").notEmpty().withMessage("pic_4 is required"),
    body("item")
      .notEmpty()
      .withMessage("item is required")
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
    body("model")
      .notEmpty()
      .withMessage("model is required")
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
    body("cpu")
      .notEmpty()
      .withMessage("cpu is required")
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
    body("ram")
      .notEmpty()
      .withMessage("ram is required")
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
    body("storage")
      .notEmpty()
      .withMessage("storage is required")
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
    body("graphics")
      .notEmpty()
      .withMessage("graphics is required")
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
    body("battery")
      .notEmpty()
      .withMessage("battery is required")
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
    body("screen_size")
      .notEmpty()
      .withMessage("screen_size is required")
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
    body("color")
      .notEmpty()
      .withMessage("Color is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
        }
        // Return true to indicate validation passed
        return true;
      }),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
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
      }
      const {
        pic_1,
        pic_2,
        pic_3,
        pic_4,
        item,
        model,
        cpu,
        ram,
        storage,
        graphics,
        battery,
        screen_size,
        color,
        price,
      } = req.body;
      const uploadedFiles = await Promise.all([
        fileUpload(pic_1),
        fileUpload(pic_2),
        fileUpload(pic_3),
        fileUpload(pic_4),
      ]);
      // Check if all uploads were successful
      const allUploadedSuccessfully = uploadedFiles.every(
        (file) => file.code === "200"
      );
      console.log(allUploadedSuccessfully);
      if (allUploadedSuccessfully) {
        const result = await Products.productCreate(
          uploadedFiles[0].data,
          uploadedFiles[1].data,
          uploadedFiles[2].data,
          uploadedFiles[3].data,
          item,
          model,
          cpu,
          ram,
          storage,
          graphics,
          battery,
          screen_size,
          color,
          price
        );
        res.json(result);
      }
      res.json(uploadedFiles);
    } catch (error) {
      res.status(error);
    }
  }
);

router.get(
  "/productList/:page",
  [param("page").notEmpty().isInt().toInt()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
      }
      const page = req.params.page;
      const result = await Products.productList(page);
      res.json(result);
    } catch (error) {
      res.status(error);
    }
  }
);

router.put(
  "/productUpdate/:id",
  [
    body("pic_1").notEmpty().withMessage("pic_1 is required").trim().escape(),
    body("pic_2").notEmpty().withMessage("pic_2 is required").trim().escape(),
    body("pic_3").notEmpty().withMessage("pic_3 is required").trim().escape(),
    body("pic_4").notEmpty().withMessage("pic_4 is required").trim().escape(),
    body("item").notEmpty().withMessage("item is required").trim().escape(),
    body("model").notEmpty().withMessage("model is required").trim().escape(),
    body("cpu").notEmpty().withMessage("cpu is required").trim().escape(),
    body("ram").notEmpty().withMessage("ram is required").trim().escape(),
    body("item")
      .notEmpty()
      .withMessage("item is required")
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
    body("model")
      .notEmpty()
      .withMessage("model is required")
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
    body("cpu")
      .notEmpty()
      .withMessage("cpu is required")
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
    body("ram")
      .notEmpty()
      .withMessage("ram is required")
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
    body("storage")
      .notEmpty()
      .withMessage("storage is required")
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
    body("graphics")
      .notEmpty()
      .withMessage("graphics is required")
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
    body("battery")
      .notEmpty()
      .withMessage("battery is required")
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
    body("screen_size")
      .notEmpty()
      .withMessage("screen_size is required")
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
    body("color")
      .notEmpty()
      .withMessage("Color is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
        }
        // Return true to indicate validation passed
        return true;
      }),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
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
      const {
        pic_1,
        pic_2,
        pic_3,
        pic_4,
        item,
        model,
        cpu,
        ram,
        storage,
        graphics,
        battery,
        screen_size,
        color,
        price,
      } = req.body;
      const { id } = req.params;
      const result = await Products.productUpdate(
        pic_1,
        pic_2,
        pic_3,
        pic_4,
        item,
        model,
        cpu,
        ram,
        storage,
        graphics,
        battery,
        screen_size,
        color,
        price,
        id
      );
      res.json(result);
    } catch (error) {
      res.status(error);
    }
  }
);

router.get(
  "/productIdSearch/:id",
  [param("id").notEmpty().isInt().toInt()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
      }
      const { id } = req.params;
      const result = await Products.productIdSearch(id);
      res.json(result);
    } catch (error) {
      res.status(error);
    }
  }
);

// productItemSearch
router.post(
  "/productItemSearch/:page",
  [
    body("item")
      .notEmpty()
      .withMessage("Item is required")
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
    param("page").notEmpty().isInt().toInt(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
      }
      const { item } = req.body;
      const { page } = req.params;
      console.log({ item, page });
      const result = await Products.productItemSearch(item, page);
      res.json(result);
    } catch (error) {
      res.status(error);
    }
  }
);

//productCreatePic
router.post(
  "/productCreatePic",
  upload.fields([
    { name: "pic_1" },
    { name: "pic_2" },
    { name: "pic_3" },
    { name: "pic_4" },
  ]),
  [
    // Custom validator for pic_1
    body("pic_1").custom((value, { req }) => {
      if (!req.files || !req.files.pic_1) {
        throw new Error("File pic_1 is required");
      }
      if (!req.files.pic_1[0].mimetype.startsWith("image")) {
        throw new Error("Uploaded file pic_1 must be an image");
      }
      return true;
    }),
    body("pic_2").custom((value, { req }) => {
      if (!req.files || !req.files.pic_2) {
        throw new Error("File pic_2 is required");
      }
      if (!req.files.pic_2[0].mimetype.startsWith("image")) {
        throw new Error("Uploaded file pic_2 must be an image");
      }
      return true;
    }),
    body("pic_3").custom((value, { req }) => {
      if (!req.files || !req.files.pic_2) {
        throw new Error("File pic_3 is required");
      }
      if (!req.files.pic_2[0].mimetype.startsWith("image")) {
        throw new Error("Uploaded file pic_3 must be an image");
      }
      return true;
    }),
    body("pic_4").custom((value, { req }) => {
      if (!req.files || !req.files.pic_2) {
        throw new Error("File pic_4 is required");
      }
      if (!req.files.pic_2[0].mimetype.startsWith("image")) {
        throw new Error("Uploaded file pic_4 must be an image");
      }
      return true;
    }),
    body("item")
      .notEmpty()
      .withMessage("item is required")
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
    body("model")
      .notEmpty()
      .withMessage("model is required")
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
    body("cpu")
      .notEmpty()
      .withMessage("cpu is required")
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
    body("ram")
      .notEmpty()
      .withMessage("ram is required")
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
    body("storage")
      .notEmpty()
      .withMessage("storage is required")
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
    body("graphics")
      .notEmpty()
      .withMessage("graphics is required")
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
    body("battery")
      .notEmpty()
      .withMessage("battery is required")
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
    body("screen_size")
      .notEmpty()
      .withMessage("screen_size is required")
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
    body("color")
      .notEmpty()
      .withMessage("Color is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
        }
        // Return true to indicate validation passed
        return true;
      }),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
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
      }
      const {
        item,
        model,
        cpu,
        ram,
        storage,
        graphics,
        battery,
        screen_size,
        color,
        price,
      } = req.body;
      const { pic_1, pic_2, pic_3, pic_4 } = req.files;
      console.log({
        item,
        model,
        cpu,
        ram,
        storage,
        graphics,
        battery,
        screen_size,
        color,
        price,
      });
      console.log({ pic_1, pic_2, pic_3, pic_4 });
      // Upload each file and get the URLs
      const uploadedFiles = await Promise.all([
        fileUpload(pic_1[0], item, model),
        fileUpload(pic_2[0], item, model),
        fileUpload(pic_3[0], item, model),
        fileUpload(pic_4[0], item, model),
      ]);
      // Check if all uploads were successful
      console.log("uploadedFiles", uploadedFiles);
      const allUploadedSuccessfully = uploadedFiles.every(
        (file) => file.code === "200"
      );
      console.log(allUploadedSuccessfully);
      if (allUploadedSuccessfully) {
        const result = await Products.productCreate(
          uploadedFiles[0].data,
          uploadedFiles[1].data,
          uploadedFiles[2].data,
          uploadedFiles[3].data,
          item,
          model,
          cpu,
          ram,
          storage,
          graphics,
          battery,
          screen_size,
          color,
          price
        );
        console.log(result);
        res.json(result);
      }
      res.json(uploadedFiles);
    } catch (error) {
      res.status(error);
    }
  }
);

//productUpdatePic
router.put(
  "/productUpdatePic/:id",
  upload.fields([
    { name: "pic_1" },
    { name: "pic_2" },
    { name: "pic_3" },
    { name: "pic_4" },
  ]),
  [
    // Custom validator for pic_1
    body("pic_1").custom((value, { req }) => {
      if (!req.file.pic_1 && !req.body.pic_1) {
        throw new Error(
          " pic_1 Either image file or image URL must be provided"
        );
      }
      if (req.file && !req.file.mimetype.startsWith("image")) {
        throw new Error("Uploaded file must be an image");
      }
      // if (
      //   req.body.image &&
      //   !/^http?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(req.body.image)
      // ) {
      //   throw new Error("Invalid image URL");
      // }
      return true;
    }),
    body("pic_2").custom((value, { req }) => {
      if (!req.file && !req.body.pic_2) {
        throw new Error(
          "pic_1 Either image file or image URL must be provided"
        );
      }
      if (req.file && !req.file.mimetype.startsWith("image")) {
        throw new Error("Uploaded file must be an image");
      }
      return true;
    }),
    body("pic_3").custom((value, { req }) => {
      if (!req.file && !req.body.pic_3) {
        throw new Error(
          "pic_1 Either image file or image URL must be provided"
        );
      }
      if (req.file && !req.file.mimetype.startsWith("image")) {
        throw new Error("Uploaded file must be an image");
      }
      return true;
    }),
    body("pic_4").custom((value, { req }) => {
      if (!req.file && !req.body.pic_4) {
        throw new Error(
          "pic_1 Either image file or image URL must be provided"
        );
      }
      if (req.file && !req.file.mimetype.startsWith("image")) {
        throw new Error("Uploaded file must be an image");
      }
      return true;
    }),
    body("item")
      .notEmpty()
      .withMessage("item is required")
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
    body("model")
      .notEmpty()
      .withMessage("model is required")
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
    body("cpu")
      .notEmpty()
      .withMessage("cpu is required")
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
    body("ram")
      .notEmpty()
      .withMessage("ram is required")
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
    body("storage")
      .notEmpty()
      .withMessage("storage is required")
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
    body("graphics")
      .notEmpty()
      .withMessage("graphics is required")
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
    body("battery")
      .notEmpty()
      .withMessage("battery is required")
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
    body("screen_size")
      .notEmpty()
      .withMessage("screen_size is required")
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
    body("color")
      .notEmpty()
      .withMessage("Color is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
        }
        // Return true to indicate validation passed
        return true;
      }),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .trim()
      .escape()
      .custom((value) => {
        // Check if the name contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(value)) {
          throw new Error("Color cannot contain special characters");
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

      const {
        pic_1: pic_1_url,
        pic_2: pic_2_url,
        pic_3: pic_3_url,
        pic_3: pic_4_url,
        item,
        model,
        cpu,
        ram,
        storage,
        graphics,
        battery,
        screen_size,
        color,
        price,
      } = req.body;
      const id = req.params.id;
      let pic_1;
      let pic_2;
      let pic_3;
      let pic_4;

      if (req.file) {
        pic_1 = req.file.pic_1;
        pic_2 = req.file.pic_2;
        pic_3 = req.file.pic_3;
        pic_4 = req.file.pic_4;
        console.log({
          item,
          model,
          cpu,
          ram,
          storage,
          graphics,
          battery,
          screen_size,
          color,
          price,
          id,
        });
        console.log({ pic_1, pic_2, pic_3, pic_4 });
      } else if ((pic_1_url, pic_2_url, pic_3_url, pic_4_url)) {
        pic_1 = pic_1_url;
        pic_2 = pic_2_url;
        pic_3 = pic_3_url;
        pic_4 = pic_4_url;
        console.log({
          item,
          model,
          cpu,
          ram,
          storage,
          graphics,
          battery,
          screen_size,
          color,
          price,
          id,
        });
        console.log({ pic_1, pic_2, pic_3, pic_4 });
      }

      // Upload each file and get the URLs
      // const uploadedFiles = await Promise.all([
      //   fileUpload(pic_1[0], item, model),
      //   fileUpload(pic_2[0], item, model),
      //   fileUpload(pic_3[0], item, model),
      //   fileUpload(pic_4[0], item, model),
      // ]);
      // // Check if all uploads were successful
      // const allUploadedSuccessfully = uploadedFiles.every(
      //   (file) => file.code === "200"
      // );
      // console.log(allUploadedSuccessfully);
      // if (allUploadedSuccessfully) {
      //   const result = await Products.productUpdate(
      //     uploadedFiles[0].data,
      //     uploadedFiles[1].data,
      //     uploadedFiles[2].data,
      //     uploadedFiles[3].data,
      //     item,
      //     model,
      //     cpu,
      //     ram,
      //     storage,
      //     graphics,
      //     battery,
      //     screen_size,
      //     color,
      //     price,
      //     id
      //   );
      //   res.json(result);
      // }
      // res.json(uploadedFiles);
    } catch (error) {
      res.status(error);
    }
  }
);

// productPicDelete
router.delete(
  "/productPicDelete/:id",
  [param("id").notEmpty().isInt().toInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
    }
    const id = req.params.id;

    console.log(id);

    const data = await Products.productIdSearch(id);
    console.log(data);
    if (data.code === "200") {
      console.log("Delete");
      console.log(data.data.pic_1);
      const deleteFiles = await Promise.all([
        fileDelete(data.data.pic_1),
        fileDelete(data.data.pic_2),
        fileDelete(data.data.pic_3),
        fileDelete(data.data.pic_4),
      ]);
      console.log(deleteFiles);
      const allDeletedSuccessfully = deleteFiles.every(
        (file) => file.code === "200"
      );
      console.log(allDeletedSuccessfully);
      if (allDeletedSuccessfully) {
        const deleteResult = await Products.productDelete(id);
        res.json(deleteResult);
      }
    } else {
      res.json(data);
    }

    // console.log(deleteResult);
    try {
    } catch (error) {
      res.status(error);
    }
  }
);

module.exports = router;

// router.delete(
//   "/productDelete/:id",
//   param("id").notEmpty().isInt().toInt(),
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.json(new StatusCode.INVALID_ARGUMENT(errors.errors[0].msg));
//       }

//       const { id } = req.params;
//       console.log(id);
//       const result = await Products.productDelete(id);
//       console.log(result);
//       res.json(result);
//     } catch (error) {
//       res.status(error);
//     }
//   }
// );

// body("pic_1").custom((value, { req }) => {
//   if (!req.files || !req.files.pic_1) {
//     throw new Error("File pic_1 is required");
//   }
//   if (!req.files.pic_1[0].mimetype.startsWith("image")) {
//     throw new Error("Uploaded file pic_1 must be an image");
//   }
//   return true;
// })

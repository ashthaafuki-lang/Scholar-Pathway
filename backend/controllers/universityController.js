import University from "../models/University.js";

// CREATE University
export const createUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);

    res.status(201).json({
      success: true,
      message: "University created successfully",
      data: university,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// READ All Universities
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();

    res.status(200).json({
      success: true,
      count: universities.length,
      data: universities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ University By ID
export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      data: university,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE University
export const updateUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University updated successfully",
      data: university,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE University
export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

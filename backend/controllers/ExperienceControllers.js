//Experience Route Controllers

import Experience from "../models/Experience.js";


//get all the experiences available
export const getExperiences = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const experiences = await Experience.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ _id: 1 }); // Sort by _id in ascending order for consistent pagination

    const total = await Experience.countDocuments(query);

    res.json({
      experiences,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching experiences", error: error.message });
  }
}


//get details about a single experience
export const getExperienceDetails = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json(experience);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching experience", error: error.message });
  }
}
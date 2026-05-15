import Response from "../models/Response.js";

export const getRecommendations = async (req, res) => {
    try {
        const userId = req.user.id
        const response = await Response.findOne({ userId }).sort({ createdAt: -1 });
        if(!response) return res.status(404).json({message:"No responses found for this user"});

        return res.status(200).json({message:"Recommendations fetched successfully", response});
    } catch (error) {
        console.error("Error fetching recommendations:", error);
    }
}
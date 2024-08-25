import prisma from "../db/db.config.js";

export class storyController {
  static async getStories(req, res) {
    try {
      const stories = await prisma.story.findMany({
        select: {
          id: true,
          title: true,
          author: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });
      return res.status(200).json(stories);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

  static async getStory(req, res) {
    try {
      const { sid } = req.params;
      const findStory = await prisma.story.findUnique({
        where: { id: parseInt(sid) },
        include: {
          author: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
          startNode: true,
        },
      });
      if (!findStory) {
        return res.status(404).json({ errors: "Story not found" });
      }
      return res.status(200).json(findStory);
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}

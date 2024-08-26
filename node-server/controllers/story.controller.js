import prisma from "../db/db.config.js";

export class storyController {
  static async createStory(req, res) {
    try {
      const { title, authorId, startNodeId } = req.body;
      const findAuthor = await prisma.user.findUnique({
        where: { id: parseInt(authorId) },
      });
      if (!findAuthor) {
        return res.status(404).json({ errors: "Author not found" });
      }
      const newStory = await prisma.story.create({
        data: {
          title,
          authorId: {
            connect: { id: parseInt(authorId) },
          },
          startNodeId: {
            connect: { id: parseInt(startNodeId) },
          },
        },
      });
      return res
        .status(201)
        .json({ message: "Story created successfully", story: newStory });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

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
        where: { published: true },
      });
      return res.status(200).json({ stories });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

  static async getStory(req, res) {
    try {
      const { sid } = req.params;
      const findStory = await prisma.story.findUnique({
        where: { id: parseInt(sid), published: true },
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
      return res.status(200).json({ story: findStory });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}

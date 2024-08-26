import prisma from "../db/db.config.js";

export class nodeController {
  static async createNode(req, res) {
    try {
      const { content } = req.body;
      const findStory = await prisma.story.findUnique({
        where: { id: parseInt(storyId) },
      });
      if (!findStory) {
        return res.status(404).json({ errors: "Story not found" });
      }
      const newNode = await prisma.node.create({
        data: {
          content,
        },
      });
      return res.status(201).json({ message: "Node created", node: newNode });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

  static async getNode(req, res) {
    try {
      const { nid } = req.params;
      const findNode = await prisma.node.findUnique({
        where: { id: parseInt(nid) },
        include: {
          choices: true,
        },
      });
      if (!findNode) {
        return res.status(404).json({ errors: "Node not found" });
      }
      return res.status(200).json({ node: findNode });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}

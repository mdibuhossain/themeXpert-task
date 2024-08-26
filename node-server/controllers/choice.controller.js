import prisma from "../db/db.config.js";

export class choiceController {
  static async createChoice(req, res) {
    try {
      const { title, nodeId, content } = req.body;
      const findNode = await prisma.node.findUnique({
        where: { id: parseInt(nodeId) },
      });
      if (!findNode) {
        return res.status(404).json({ errors: "Node not found" });
      }
      const newChoice = await prisma.choice.create({
        data: {
          title,
          nodeId: parseInt(nodeId),
          nextNode: {
            create: {
              content,
            },
          },
        },
        include: {
          nextNode: true,
        },
      });
      return res
        .status(201)
        .json({ message: "Choice created", choice: newChoice });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

  static async getChoice(rqe, res) {
    try {
      const { cid } = req.params;
      const findChoice = await prisma.choice.findUnique({
        where: { id: parseInt(cid) },
        include: {
          nextNode: {
            include: {
              choices: true,
            },
          },
        },
      });
      if (!findChoice) {
        return res.status(404).json({ errors: "Choice not found" });
      }
      return res.status(200).json({ choice: findChoice });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }
}

// import { Router, Request, Response } from "express";
// import Role from "../models/RoleModel";
// import { authenticateToken } from "../middleware/authMiddleware";

// const router = Router();

// // Create Role
// router.post("/", authenticateToken, async (req: Request, res: Response) => {
//     const { roleName, description } = req.body;

//     if (!roleName) {
//         res.status(400).json({ message: "Role name is required" });
//         return;
//     }

//     try {
//         const role = await Role.create({ roleName, description });
//         res.status(201).json({ message: "Role created successfully", role });
//     } catch (error) {
//         console.error("Error creating role:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // Read All Roles
// router.get("/", authenticateToken, async (_req: Request, res: Response) => {
//     try {
//         const roles = await Role.findAll();
//         res.json(roles);
//     } catch (error) {
//         console.error("Error fetching roles:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // Update Role
// router.put("/:id", authenticateToken, async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { roleName, description } = req.body;

//     try {
//         const role = await Role.findByPk(id);
//         if (!role) {
//             res.status(404).json({ message: "Role not found" });
//             return;
//         }

//         await role.update({ roleName, description });
//         res.json({ message: "Role updated successfully" });
//     } catch (error) {
//         console.error("Error updating role:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // Delete Role
// router.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const role = await Role.findByPk(id);
//         if (!role) {
//             res.status(404).json({ message: "Role not found" });
//             return;
//         }

//         await role.destroy();
//         res.json({ message: "Role deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting role:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// export default router;

// import express, { Request, Response } from 'express';
// import User from '../models/user';

// const router = express.Router();
// router.get('/:email', async (req: Request, res: Response) => {
//   const { email } = req.params;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userDetails = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     };

//     return res.status(200).json(userDetails);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// export default router;

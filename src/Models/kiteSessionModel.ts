import mongoose from "mongoose";


const kiteSessionSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
});

export default mongoose.model("KiteSession", kiteSessionSchema);
// import mongoose from "mongoose";

// const kiteSessionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//       index: true,
//     },

//     apiKey: {
//       type: String,
//       required: true,
//     },

//     accessToken: {
//       type: String,
//       required: true,
//     },

//     loginTime: {
//       type: Date,
//       required: true,
//     },

//     expiresAt: {
//       type: Date,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("KiteSession", kiteSessionSchema);
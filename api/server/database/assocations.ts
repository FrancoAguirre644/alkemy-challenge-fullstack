import Operation from "../models/operationModel";
import User from "../models/userModel";

User.hasMany(Operation);
Operation.belongsTo(User);
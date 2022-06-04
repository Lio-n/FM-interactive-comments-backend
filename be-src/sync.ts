import "dotenv/config";
import { sequelize } from "./config";
import "./models";

sequelize.sync({ force: true }).then((res) => console.log(res));

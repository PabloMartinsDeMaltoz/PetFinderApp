import { sequelize } from "./index";

(async () => {
  await sequelize.sync({ force: true });
})();

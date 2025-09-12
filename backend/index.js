require("dotenv").config();
let app = require("./src/app");
require("./src/config/db");   // ✅ load DB connection once

const PORT = process.env.server_port || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
});

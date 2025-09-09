let app = require("./src/app");

app.listen(process.env.server_port, "0.0.0.0", () => {
    console.log(`✅ Server running at http://0.0.0.0:${process.env.server_port}`);
  });
  
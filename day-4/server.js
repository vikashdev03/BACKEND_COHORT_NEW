/* server.js--- Ye file ka  kaam  server ko start karna hai  */

const app = require("./src/app"); /* app ko import kar liya jo exports kiya tha  */

app.listen(3000, () => {
  console.log("server is running on port 3000");
}); /* server start kar diya  */

 
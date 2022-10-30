const expres = require("express");

const app = expres();
app.use(expres.json());


app.listen(process.env.POST || "3000", () => {
    console.log("app is running on port 3000");
})
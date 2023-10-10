import AutoGen from "swagger-autogen";

const doc = {
    info: {
        title: "My API",
        description: "Description",
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const routerUrl = ["./src/router.ts"];

AutoGen()("./src/docs/swagger.json", routerUrl, doc)
    .then(console.log)
    .catch(console.error);

import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", "node_modules/**", "screenshots/**", "data/**"] }];

export default config;

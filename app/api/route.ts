/* export async function GET(request: Request) {
    return new Response("Hello World");
} */

import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function GET(request: Request) {
    const directory = path.resolve("./public", "backend");

    try {
        const response = exec(
            `./.next/server/collection.worker.js`,
            function (err, stdout, stderr) {
                process.stdout.write(stdout);
                process.stderr.write(stderr);
            }
        );
        response.stdin?.end("node.js");
    } catch (error) {
        console.log(error);
    }

    return new Response("Hello World");
}

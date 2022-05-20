import { sign } from "jsonwebtoken";

class GenerateTokenProvider {

    async execute(userId: string) {
        const token = sign({}, "503e4f72-75c4-4020-88d2-63117c59a566", {
            subject: userId,
            expiresIn: "20s"
        })

        return token;

    }

}

export { GenerateTokenProvider }


import { client } from "../../prisma/client"

import { GenerateTokenProvider } from "../../Provider/GenerateTokenProvider";


class RefreshTokenUserUseCase {
    async execute(refresh_token: string) {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token
            }
        })

        if (!refreshToken) {
            throw new Error("RefreshToken Invalid")
        }

        const generateToken = new GenerateTokenProvider();
        const token = await generateToken.execute(refreshToken.userId);

        return { token }
    }
}

export { RefreshTokenUserUseCase }
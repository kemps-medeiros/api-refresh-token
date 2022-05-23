import dayjs from "dayjs";
import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../Provider/GenerateRefreshToken";

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

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        const generateToken = new GenerateTokenProvider();
        const token = await generateToken.execute(refreshToken.userId);

        if (refreshTokenExpired) {
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId,
                }

            })

            const generateRefreshTokenProvider = new GenerateRefreshToken();
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);

            return { token, refreshToken: newRefreshToken }
        }



        return { token }
    }
}

export { RefreshTokenUserUseCase }
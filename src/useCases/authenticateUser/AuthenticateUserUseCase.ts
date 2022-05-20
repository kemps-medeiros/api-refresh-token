import { compare } from "bcryptjs";


import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../Provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../Provider/GenerateTokenProvider";

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({ username, password }: IRequest) {
        //verificar se usuario existe
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (!userAlreadyExists) {
            throw new Error("User or password incorrect!");
        }

        //verifica se a senha está correta
        const passwordMatch = await compare(password, userAlreadyExists.password);

        if (!passwordMatch) {
            throw new Error("User or password incorrect!");
        }

        //gerar o token do usuario
       

        const generateToken = new GenerateTokenProvider();
        const token = await generateToken.execute(userAlreadyExists.id)


        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id); 

        return { token, refreshToken }
    }
}

//para criar a chave Key - o "segredo", foi utilizado o site 
//uuid generator 


export { AuthenticateUserUseCase }
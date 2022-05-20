-- CreateTable
CREATE TABLE "refressh_token" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "refressh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refressh_token_userId_key" ON "refressh_token"("userId");

-- AddForeignKey
ALTER TABLE "refressh_token" ADD CONSTRAINT "refressh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

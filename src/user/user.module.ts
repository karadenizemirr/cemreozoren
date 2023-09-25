import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userProviders } from "src/database/providers/user.providers";

@Module({
    controllers: [UserController],
    providers: [UserService, ...userProviders],
    exports: [],
})
export class UserModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./db/data-source";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostTypesModule } from './post-types/post-types.module';
import { UserRolesModule } from './user-roles/user-roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    PostsModule,
    PostTypesModule,
    UserRolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

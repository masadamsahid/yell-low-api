import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class userRoles1673227492408 implements MigrationInterface {
  private tableName = 'user_roles'
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'string',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ],
      })
    );
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable(this.tableName);
  }
  
}

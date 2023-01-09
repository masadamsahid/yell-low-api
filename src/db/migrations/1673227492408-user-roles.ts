import { MigrationInterface, QueryRunner, Table, } from "typeorm"

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
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP'
          }
        ],
      })
    );
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable(this.tableName);
  }
  
}

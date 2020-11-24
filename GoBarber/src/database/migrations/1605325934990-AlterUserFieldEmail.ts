import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterUserFieldEmail1605325934990
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'email');
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'email');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'email',
        type: 'timestamp with time zone',
      }),
    );
  }
}

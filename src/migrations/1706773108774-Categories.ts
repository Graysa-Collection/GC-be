import { MigrationInterface, QueryRunner } from 'typeorm';

export class Categories1706773108774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE categories (
        id serial PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE categories');
  }
}

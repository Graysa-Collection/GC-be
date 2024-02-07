import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1707336737464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (
        id serial PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(500) NOT NULL,
        role VARCHAR(10) NOT NULL
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}

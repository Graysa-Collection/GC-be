import { MigrationInterface, QueryRunner } from 'typeorm';

export class ParentCategory1707231339739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE parent_categories (
        id serial PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )`,
    );
    await queryRunner.query(
      'ALTER TABLE categories ADD parent_category_id INT NOT NULL',
    );
    await queryRunner.query(
      `ALTER TABLE categories
      ADD CONSTRAINT fk_parent_category
        FOREIGN KEY (parent_category_id)
          REFERENCES parent_categories(id)`,
    );
    await queryRunner.query(
      "INSERT INTO parent_categories (name) VALUES ('CLOTHING')",
    );
    await queryRunner.query(
      "INSERT INTO parent_categories (name) VALUES ('BEAUTY AND SKIN CARE')",
    );
    await queryRunner.query(
      "INSERT INTO parent_categories (name) VALUES ('BOOKS AND MEDIA')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE categories DROP CONSTRAINT fk_parent_category',
    );
    await queryRunner.query(
      'ALTER TABLE categories DROP COLUMN parent_category_id',
    );
    await queryRunner.query('DROP TABLE parent_categories');
  }
}

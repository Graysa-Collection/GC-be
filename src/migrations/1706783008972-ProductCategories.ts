import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategories1706783008972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE product_categories (
        product_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY(product_id, category_id),
        CONSTRAINT fk_product_id
          FOREIGN KEY(product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,
        CONSTRAINT fk_category_id
          FOREIGN KEY(category_id)
            REFERENCES categories(id)
            ON DELETE CASCADE
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product_categories');
  }
}

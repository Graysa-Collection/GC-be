import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductImages1707126281952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE product_images (
        id serial PRIMARY KEY,
        image_url VARCHAR(300) NOT NULL,
        product_id INT,
        CONSTRAINT fk_product_id
          FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product_images');
  }
}

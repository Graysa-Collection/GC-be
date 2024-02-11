import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartItems1707643763052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE cart_items (
        id serial PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,
        CONSTRAINT fk_product
          FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE cart_items');
  }
}

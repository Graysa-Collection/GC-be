import { MigrationInterface, QueryRunner } from 'typeorm';

export class Orders1710155938055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE orders (
          id serial PRIMARY KEY,
          user_id INT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_user
            FOREIGN KEY (user_id)
              REFERENCES users(id)
              ON DELETE CASCADE
        )`,
    );
    await queryRunner.query(
      `CREATE TABLE ordered_items (
          id serial PRIMARY KEY,
          product_id INT NOT NULL,
          quantity INT NOT NULL,
          order_id INT NOT NULL,
          CONSTRAINT fk_product
            FOREIGN KEY (product_id)
              REFERENCES products(id)
              ON DELETE CASCADE,
          CONSTRAINT fk_order
            FOREIGN KEY (order_id)
              REFERENCES orders(id)
              ON DELETE CASCADE
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE ordered_items');
    await queryRunner.query('DROP TABLE orders');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewArrival1711301790126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE TABLE new_arrivals (
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
    queryRunner.query('DROP TABLE new_arrivals');
  }
}

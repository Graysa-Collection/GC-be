import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contact_us')
export class ContactUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  message: string;
}

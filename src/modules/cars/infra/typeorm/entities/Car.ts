import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from "uuid"
import { Category } from "./Category"
import { Specification } from "./Specification"

@Entity("cars")
class Car{
  
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  daily_rate: number

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  brand: string

  @Column()
  available: boolean

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumn:{
      name: "car_id",
    },
    inverseJoinColumn: {
      name: "specification_id"
    }
    
  })
  specifications: Specification[]

  @ManyToOne(() => Category, { eager: true } )
  @JoinColumn({
    name: "category_id",
  })
  category: Category

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if(!this.id){
      this.id = uuidv4()
    }
  }
}

export { Car }


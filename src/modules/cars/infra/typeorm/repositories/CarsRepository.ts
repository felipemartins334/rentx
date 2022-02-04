import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository{

  private repository: Repository<Car>

  constructor(){
    this.repository = getRepository(Car)
  }
  
  async create({
    name,
    brand,
    category,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand, 
      daily_rate,
      description,
      fine_amount,
      license_plate,
      category,
      specifications,
      id
    })
    await this.repository.save(car)
    return car
    
  }
  
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where:
      { license_plate }
    })
    return car
  }
  
  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
    ): Promise<Car[]> {
      const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })
      
      if(brand){
        carsQuery.andWhere("c.brand = :brand", { brand })
      }
      
      if(name){
        carsQuery.andWhere("c.name = :name", { name })
      }
      
      if(category_id){
        carsQuery.andWhere("c.category.id = :category_id", { category_id }) 
      }
      
      const cars = await carsQuery.getMany()

      return cars
    }
    
    async findById(id: string): Promise<Car> {
      return await this.repository.findOne({
        where: {
          id
        }
      })
    }
  }
  
  export { CarsRepository }
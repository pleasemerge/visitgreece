export type HotelFacilityDescription = {
  id: number | string,
  icon: string,
  text: string
}

export type IHotel = {
  id?: number,
  name: string,
  rating: number,
  imgSrc: string,
  province: string,
  facilities: HotelFacilityDescription[],
  price: number,
  featured?: boolean,
  about?: string,
  comments?: IComment[]
}

export type EmptyHotel<T> = {
  [P in keyof T]?: T[P]
}

export type HotelFacilities = HotelFacilityDescription[]

export class Hotel implements IHotel {
  public id?: number;
  public name: string;
  public rating: number;
  public imgSrc: string;
  public province: string;
  public facilities: HotelFacilityDescription[];
  public price: number;
  public featured?: boolean;
  public about?: string;
  public comments?: IComment[];

  constructor ( props: IHotel ) {
    this.id = props.id
    this.name = props.name
    this.rating = props.rating
    this.imgSrc = props.imgSrc
    this.province = props.province
    this.facilities = props.facilities
    this.price = props.price
    this.featured = props.featured
    this.about = props.about
    this.comments = props.comments
  }
}

export type Itinerary = {
  days: number,
  hotel: IHotel
}

export type ITour = {
  name: string,
  description: string,
  startDate: Date,
  endDate?: Date,
  img: string,
  imgAlt?: string,
  duration?: number,
  itinerary: Itinerary[],
  featured?: boolean
}

export class Tour implements ITour {
  public img: string
  public name: string
  public description: string
  public duration: number
  public startDate: Date
  public endDate: Date
  public itinerary: Itinerary[]
  public featured?: boolean

  constructor (props: ITour) {
    this.img = props.img
    this.itinerary = props.itinerary
    this.startDate = props.startDate
    this.endDate = new Date(this.startDate)
    this.endDate.setDate(this.endDate.getDate() + this.getDuration())
    this.description = props.description
    this.duration = this.getDuration()
    this.featured = props.featured || false
    this.name = props.name
  }

  getDuration () : number {
    return this.itinerary.reduce((acc, itinerary, _index) => {
      return acc += itinerary.days
    }, 0)
  }

  getCost () : number {
    return this.itinerary.reduce((acc, itinerary, _index) => {
      return acc += itinerary.days * itinerary.hotel.price
    }, 0)
  }
}

export interface IUser {
  name: string,
  userpic: string
}

export interface IComment {
  user: IUser,
  text: string,
  rating: number,
  date: Date
}

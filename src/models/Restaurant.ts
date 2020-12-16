import mongoose, { Document, Schema } from 'mongoose'

export type Dish = {
  dish_name: string;
  price: number;
  ingredients: string[];
  description: string;
  dish_images: string[];
}

export type RestaurantDocument = Document & {
  name: string;
  address: string;
  coords: { lat: string; long: string };
  openingHours: string;
  menu: Dish[] | string[]; // menu could be a json object array or a string array contains some dish img urls
  images: string[];
  isDeliverable: boolean;
  deliveryCost: number;
  phoneNumber: number[];
  website: string;
}

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coords: {
    type: Schema.Types.Mixed,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  menu: {
    type: Schema.Types.Mixed,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  isDeliverable: {
    type: Boolean,
    required: true,
  },
  deliveryCost: {
    type: Number,
  },
  phoneNumber: {
    type: [Number],
    required: true,
  },
  website: {
    type: String,
  },
})

export default mongoose.model<RestaurantDocument>(
  'Restaurant',
  restaurantSchema
)

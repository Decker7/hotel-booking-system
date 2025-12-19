export interface Room {
    id: number;
    name: string;
    type: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    amenities: string[];
}

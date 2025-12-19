export interface Room {
    // API fields
    id: string; // MockAPI uses string IDs usually
    roomName: string; // Renamed from name
    type: string;
    price: number;
    isAvailable: boolean;
    // Optional/Computed fields (frontend only)
    name?: string;     // Alias for roomName
    imageUrl?: string;
    amenities?: string[];
}

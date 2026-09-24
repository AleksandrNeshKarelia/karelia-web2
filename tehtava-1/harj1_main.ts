// Define UserStatus type here
export type UserStatus = "active" | "inactive" | "pending";

// Define Coordinate tuple type here
export type Coordinate = [latitude: number, longitude: number];

// Define UserProfile interface or type alias here
export interface UserProfile {
  // Add fields
  readonly id: number;
  user: string;
  email: string;
  status: UserStatus;
  location: Coordinate;
  bio?: string;
}

// Implement createUser function
export function createUser(
  id: number,
  username: string,
  email: string,
  location: Coordinate,
): UserProfile {
  // Implement here
  const userprofile: UserProfile = {
    id: id,
    user: username,
    email: email,
    status: "pending",
    location: location,
  };
  return userprofile;
}

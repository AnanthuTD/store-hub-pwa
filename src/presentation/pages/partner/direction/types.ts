interface LatLng {
  latitude: number;
  longitude: number;
}

interface Polyline {
  encodedPolyline: string;
}

interface NavigationInstruction {
  maneuver: string;
  instructions: string;
}

interface LocalizedValues {
  distance: {
    text: string;
  };
  duration?: {
    text: string;
  };
  staticDuration: {
    text: string;
  };
}

interface Step {
  distanceMeters: number;
  staticDuration: string;
  polyline: Polyline;
  startLocation: {
    latLng: LatLng;
  };
  endLocation: {
    latLng: LatLng;
  };
  navigationInstruction: NavigationInstruction;
  localizedValues: LocalizedValues;
  travelMode: string;
}

interface Leg {
  distanceMeters: number;
  duration: string;
  staticDuration: string;
  polyline: Polyline;
  startLocation: {
    latLng: LatLng;
  };
  endLocation: {
    latLng: LatLng;
  };
  steps: Step[];
  localizedValues: LocalizedValues;
}

interface Route {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
  polyline: Polyline;
  optimizedIntermediateWaypointIndex: number[];
}

export interface Direction {
  routes: Route[];
}

interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  _id: string;
  storeId: string;
}

interface DeliveryLocation {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: string;
  paymentId: string | null;
  paymentMethod: string;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  deliveryLocation: DeliveryLocation;
  deliveryPartnerId: string;
  deliveryStatus: string;
}

export interface OrderDetailsAndDirection {
  direction: Direction;
  order: Order;
}

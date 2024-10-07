// utils/locationUtils.ts
export const getRandomWaypoint = (lat: number, lng: number, radius: number) => {
  const randomDistance = Math.random() * radius;
  const randomAngle = Math.random() * 2 * Math.PI;
  const dLat = (randomDistance * Math.cos(randomAngle)) / 111320;
  const dLng =
    (randomDistance * Math.sin(randomAngle)) / (111320 * Math.cos((lat * Math.PI) / 180));

  return {
    lat: lat + dLat,
    lng: lng + dLng,
  };
};

export const getDistanceBetween = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  return google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(lat1, lng1),
    new google.maps.LatLng(lat2, lng2),
  );
};

export const formatDistance = (distance: number) => {
  if (!distance) return '';
  distance = Number(distance.toFixed(2));
  if (distance > 0 && distance <= 999) return `${distance} meters`;
  else if (distance >= 1000 && distance <= 99999) return `${(distance / 1000).toFixed(1)} KM`;
  else return 'you are here';
};

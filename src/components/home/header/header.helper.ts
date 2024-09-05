export function getFirstNameInitial(fullName: string) {
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const firstInitial = firstName[0].toUpperCase()

  return firstInitial
}

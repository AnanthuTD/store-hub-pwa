export default function checkPasswordStrength(password: string) {
  const lengthCriteria = password.length >= 8;
  const uppercaseCriteria = /[A-Z]/.test(password);
  const lowercaseCriteria = /[a-z]/.test(password);
  const numberCriteria = /[0-9]/.test(password);
  const specialCharCriteria = /[!@#$%^&*()_+{}[\]:;"'<>,.?~`\\-]/.test(password);

  return (
    lengthCriteria &&
    uppercaseCriteria &&
    lowercaseCriteria &&
    numberCriteria &&
    specialCharCriteria
  );
}

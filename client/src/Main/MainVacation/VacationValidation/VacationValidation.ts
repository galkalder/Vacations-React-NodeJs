export const isInputValid = (value: string) => {
  if (!value || value.trim() === "") {
    return false;
  }
  return true;
};

export const isDateValid = (startDate: any, endDate: any) => {
  if (
    Date.parse(endDate) <= Date.parse(startDate) ||
    Date.parse(startDate) < +new Date() ||
    startDate.trim() === "" ||
    endDate.trim() === ""
  ) {
    return false;
  }
  return true;
};

export const isAxiosValid = (error: any) => {
  if (error.response.status === 404) {
    return false;
  }
  return true;
};

export const isVacationInputValid = (
  description: string,
  price: string,
  photo: any
) => {
  if (description.trim() === "" || price.trim() === "" || photo === undefined) {
    return false;
  }
  return true;
};

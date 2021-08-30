export const isBodyInvalid = (body: any): boolean => {
  if (!body) {
    return true;
  }

  if (body instanceof Function) {
    return true;
  }

  return Object.keys(body).length === 0;
};

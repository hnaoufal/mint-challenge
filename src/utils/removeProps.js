export default props => params => {
  const tmpObject = { ...props };

  params.forEach(param => delete tmpObject[param]);

  return tmpObject;
};
